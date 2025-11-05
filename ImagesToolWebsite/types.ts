import React from 'react';

export enum ToolType {
  BACKGROUND_REMOVER = 'BACKGROUND_REMOVER',
  WATERMARK_REMOVER = 'WATERMARK_REMOVER',
  IMAGE_ENHANCER = 'IMAGE_ENHANCER',
  ICON_GENERATOR = 'ICON_GENERATOR',
  IMAGE_TO_CARTOON = 'IMAGE_TO_CARTOON',
}

export interface Tool {
  id: ToolType;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  article: {
    title: string;
    content: string[];
    keywords: string[];
  };
}
