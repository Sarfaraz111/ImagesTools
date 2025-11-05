import React, { useState, useCallback } from 'react';
import { processImage } from '../services/geminiService';
import { fileToBase64 } from '../utils';
import Loader from './Loader';
import { Tool, ToolType } from '../types';
import WatermarkSelector from './WatermarkSelector';
import ImageCompareSlider from './ImageCompareSlider';

interface ImageProcessorProps {
  tool: Tool;
}

const PROMPTS: Record<string, string> = {
  BACKGROUND_REMOVER: 'Remove the background from this image, leaving only the main subject. Make the background transparent.',
  WATERMARK_REMOVER: 'I have provided an image and a mask. Inpaint the area of the image that corresponds to the white section of the mask. Fill this area seamlessly based on the surrounding content.',
  IMAGE_ENHANCER: 'Enhance the quality of this image. Improve sharpness, clarity, and color balance. Make it look professional.',
  IMAGE_TO_CARTOON: 'Convert this photo into a cartoon. Apply a stylized, artistic cartoon effect, emphasizing outlines and simplifying colors, similar to a classic animated movie.',
};

const OFFER_LINK = 'https://www.effectivegatecpm.com/pqcqtg5ef?key=04011f8ad192d9447d763d021eeb2cab';

const createMask = (
  originalWidth: number,
  originalHeight: number,
  selection: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return reject(new Error("Could not get canvas context."));
    }
    // Black background (area to keep)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // White rectangle (area to edit/inpaint)
    ctx.fillStyle = 'white';
    ctx.fillRect(selection.x, selection.y, selection.width, selection.height);
    
    // Resolve with base64 data, without the 'data:image/png;base64,' prefix
    resolve(canvas.toDataURL('image/png').split(',')[1]);
  });
};

const ImageProcessor: React.FC<ImageProcessorProps> = ({ tool }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectionArea, setSelectionArea] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setProcessedImage(null);
      setError(null);
      setSelectionArea(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessImage = useCallback(async () => {
    // Open offer link in a new tab
    window.open(OFFER_LINK, '_blank');

    if (!originalImage) {
      setError('Please select an image first.');
      return;
    }
    if (tool.id === ToolType.WATERMARK_REMOVER && !selectionArea) {
      setError('Please select the watermark area on the image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedImage(null);
    try {
      const base64Image = await fileToBase64(originalImage);
      const mimeType = originalImage.type;
      let maskBase64: string | undefined = undefined;

      if (tool.id === ToolType.WATERMARK_REMOVER) {
        const img = new Image();
        img.src = originalImagePreview!;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        maskBase64 = await createMask(img.naturalWidth, img.naturalHeight, selectionArea!);
      }
      
      const prompt = PROMPTS[tool.id];
      const resultBase64 = await processImage(base64Image, mimeType, prompt, maskBase64);
      setProcessedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalImagePreview, tool.id, selectionArea]);

  const ImageDisplay: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="image-display-wrapper">
      <span className="image-display-label">{label}</span>
      <div className="image-display-box">
        <img src={src} alt={alt} />
      </div>
    </div>
  );

  const isWatermarkTool = tool.id === ToolType.WATERMARK_REMOVER;
  const isEnhancerTool = tool.id === ToolType.IMAGE_ENHANCER;

  const isProcessButtonDisabled = 
    !originalImage || 
    isLoading || 
    (isWatermarkTool && !selectionArea);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h2>{tool.title}</h2>
        <p>{tool.description}</p>
      </div>

      <div className="tool-controls">
        <label className="file-upload-label">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="upload-text">{originalImage ? 'Change Image' : 'Click to upload'}</span>
          <span className="upload-hint">PNG, JPG, WEBP (MAX. 5MB)</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleProcessImage}
          disabled={isProcessButtonDisabled}
          className="btn btn-primary"
        >
          {tool.title}
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="tool-output">
        {isLoading && <Loader message={`AI is working its magic...`} />}
        
        {!isLoading && originalImagePreview && !processedImage && (
          isWatermarkTool ? (
            <WatermarkSelector imageUrl={originalImagePreview} onAreaSelect={setSelectionArea} />
          ) : (
            <ImageDisplay src={originalImagePreview} alt="Original" label="Original" />
          )
        )}
        
        {!isLoading && originalImagePreview && processedImage && (
          isEnhancerTool ? (
            <div style={{width: '100%'}}>
              <ImageCompareSlider before={originalImagePreview} after={processedImage} />
            </div>
          ) : (
            <>
              <ImageDisplay src={originalImagePreview} alt="Original" label="Original" />
              <ImageDisplay src={processedImage} alt="Processed" label="Result" />
            </>
          )
        )}
      </div>

      {processedImage && !isLoading && (
        <div className="download-section">
          <a
            href={processedImage}
            download={`processed-${originalImage?.name || 'image.png'}`}
            className="btn btn-success"
          >
            Download Result
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
