import React, { useState, useCallback } from 'react';
import { generateIcon } from '../services/geminiService';
import Loader from './Loader';
import { Tool } from '../types';

interface IconGeneratorProps {
  tool: Tool;
}

const OFFER_LINK = 'https://www.effectivegatecpm.com/pqcqtg5ef?key=04011f8ad192d9447d763d021eeb2cab';

const IconGenerator: React.FC<IconGeneratorProps> = ({ tool }: { tool: Tool }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIcon = useCallback(async () => {
    // Open offer link in a new tab
    window.open(OFFER_LINK, '_blank');

    if (!prompt.trim()) {
      setError('Please enter a description for the icon.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedIcon(null);
    try {
      const resultBase64 = await generateIcon(prompt);
      setGeneratedIcon(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h2>{tool.title}</h2>
        <p>{tool.description}</p>
      </div>

      <div className="tool-controls">
        <input
          type="text"
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
          placeholder="e.g., A minimalist rocket ship logo"
          className="text-input"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateIcon}
          disabled={!prompt || isLoading}
          className="btn btn-primary"
        >
          Generate Icon
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="tool-output">
        <div className="image-display-wrapper">
          <div className="image-display-box">
            {isLoading && <Loader message="Generating your icon..." />}
            {!isLoading && generatedIcon && (
              <img src={generatedIcon} alt="Generated Icon" />
            )}
            {!isLoading && !generatedIcon && (
              <p style={{color: 'var(--text-light)'}}>Your generated icon will appear here.</p>
            )}
          </div>
        </div>
      </div>

      {generatedIcon && !isLoading && (
        <div className="download-section">
          <a
            href={generatedIcon}
            download={`icon-${prompt.replace(/\s+/g, '-')}.png`}
            className="btn btn-success"
          >
            Download Icon
          </a>
        </div>
      )}
    </div>
  );
};

export default IconGenerator;
