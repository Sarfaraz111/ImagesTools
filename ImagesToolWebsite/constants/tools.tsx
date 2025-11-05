import React from 'react';
import { Tool, ToolType } from '../types';

const BackgroundRemoverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const WatermarkRemoverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const ImageEnhancerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293c.63.63.184 1.707-.707 1.707H10.414c-.891 0-1.336-1.077-.707-1.707L11.707 3zM12 21l-1.146-1.146c-.63-.63-.184-1.707.707-1.707h1.879c.891 0 1.336 1.077.707 1.707L12 21zM12 12l2.293-2.293c.63-.63.184-1.707-.707-1.707H10.414c-.891 0-1.336 1.077-.707 1.707L11.707 12z" />
  </svg>
);

const ImageToCartoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15s1.5-2 8 0" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10h.01" />
    </svg>
);

const IconGeneratorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);


export const TOOLS: Tool[] = [
  {
    id: ToolType.BACKGROUND_REMOVER,
    title: 'Background Remover',
    description: 'Instantly remove the background from any image with a single click, leaving you with a clean, transparent background.',
    Icon: BackgroundRemoverIcon,
    article: {
      title: 'Effortless Background Removal with AI',
      content: [
        'Our AI-powered Background Remover is a game-changer for photographers, designers, and e-commerce entrepreneurs. Traditional background removal techniques are often tedious and time-consuming, requiring intricate selections and manual adjustments. With our tool, the process is fully automated. Simply upload your image, and our advanced algorithm intelligently identifies the main subject, separating it from the background with remarkable precision.',
        'The resulting image has a transparent background, perfect for creating product listings, professional headshots, or creative compositions. This technology not only saves you hours of work but also ensures consistent, high-quality results every time. It supports various image formats and handles complex details like hair and fur with ease, making it an indispensable tool for anyone looking to streamline their creative workflow and produce stunning visuals without the hassle of manual editing. Experience the future of image editing today.'
      ],
      keywords: ['background remover', 'transparent background', 'AI photo editing', 'image cutout', 'remove bg', 'photo editing tool']
    }
  },
  {
    id: ToolType.WATERMARK_REMOVER,
    title: 'Watermark Remover',
    description: 'Select and remove unwanted watermarks, logos, or text overlays from your images seamlessly with AI.',
    Icon: WatermarkRemoverIcon,
    article: {
      title: 'Seamlessly Erase Watermarks with AI',
      content: [
        'Unwanted watermarks can detract from the visual appeal of an otherwise perfect image. Our AI Watermark Remover offers a powerful solution to this common problem. This tool is designed to intelligently identify and erase watermarks, logos, and other text overlays from your photos without leaving a trace. Using sophisticated inpainting algorithms, it reconstructs the area behind the watermark, ensuring the final result looks natural and untouched.',
        'Whether you need to restore old family photos, repurpose stock images for a new project, or simply clean up your visuals, our tool provides a fast and effective method. It handles various types of watermarks, from opaque logos to semi-transparent text, with impressive accuracy. Forget the complexity of clone stamping and healing brushes in traditional software. Our one-click solution simplifies the entire process, empowering you to reclaim your images and present them in their purest form.'
      ],
      keywords: ['watermark remover', 'remove watermark from photo', 'AI image cleaning', 'photo restoration', 'object removal', 'text removal']
    }
  },
  {
    id: ToolType.IMAGE_ENHANCER,
    title: 'Image Enhancer',
    description: 'Automatically enhance image quality, improve colors, and increase resolution for crystal-clear results.',
    Icon: ImageEnhancerIcon,
    article: {
      title: 'Unlock Your Photos\' True Potential with AI',
      content: [
        'Transform your ordinary photos into stunning, high-quality images with our AI Image Enhancer. This tool analyzes your image and automatically applies a range of improvements to bring out its best features. It intelligently adjusts brightness, contrast, and color balance to create a more vibrant and lifelike picture. Furthermore, our enhancer uses advanced upscaling technology to increase image resolution, sharpening details and reducing noise without creating artifacts.',
        'This is perfect for improving low-light shots, reviving old or blurry photos, or preparing images for high-resolution printing. The process is entirely automated, taking the guesswork out of complex editing adjustments. In seconds, you can achieve professional-grade results that would typically require expert knowledge and expensive software. Whether you are a professional photographer or a casual user, our AI Image Enhancer will elevate your images, making every detail pop with clarity and brilliance.'
      ],
      keywords: ['image enhancer', 'photo quality enhancer', 'AI upscaling', 'increase image resolution', 'photo sharpener', 'color correction']
    }
  },
  {
    id: ToolType.IMAGE_TO_CARTOON,
    title: 'Image to Cartoon',
    description: 'Transform your photos into fun and stylish cartoons with a single click using advanced AI filters.',
    Icon: ImageToCartoonIcon,
    article: {
      title: 'Cartoonize Your Photos Instantly with AI',
      content: [
        'Unleash your creativity and give your photos a unique, artistic twist with our AI Image to Cartoon tool. This feature uses sophisticated neural networks to analyze your image and redraw it in a vibrant cartoon style. It intelligently simplifies details, enhances outlines, and applies a bold color palette to mimic the look of traditional animation, all while preserving the key features and essence of the original subject.',
        'Perfect for creating personalized avatars, unique social media posts, or just having fun with your pictures. The process is fully automated—simply upload a photo, and our AI does the rest. Say goodbye to complex software and tedious manual tracing. Our tool provides a quick, easy, and entertaining way to reimagine your photos and see yourself, your pets, or your favorite scenes in a whole new, animated light.'
      ],
      keywords: ['image to cartoon', 'photo to cartoon', 'AI cartoonizer', 'cartoon filter', 'photo animation', 'avatar creator']
    }
  },
  {
    id: ToolType.ICON_GENERATOR,
    title: 'Icons Generator',
    description: 'Generate unique, professional-grade icons from a simple text description using the power of AI.',
    Icon: IconGeneratorIcon,
    article: {
      title: 'Create Custom Icons from Text with AI',
      content: [
        'Finding the perfect icon for your project can be a challenge. Our AI Icon Generator revolutionizes this process by allowing you to create custom icons from simple text descriptions. Just type what you envision—for example, "a minimalist rocket ship icon"—and our AI will generate a set of unique, high-quality icons that match your description. This tool is invaluable for UI/UX designers, developers, and marketers who need custom assets on the fly.',
        'The generator produces icons in a modern, clean style, suitable for websites, applications, and presentations. You can iterate quickly, trying different prompts to refine your vision until you get the perfect result. This eliminates the need to scour icon libraries or hire a designer for small tasks. By converting your ideas directly into visual assets, our Text-to-Icon generator accelerates your design workflow and unleashes your creative potential, ensuring your projects have a distinct and polished look.'
      ],
      keywords: ['icon generator', 'text to icon', 'AI icon design', 'custom icons', 'UI/UX design tool', 'generate SVG icon']
    }
  }
];
