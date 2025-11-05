import React from 'react';
import { Tool } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ToolCardProps {
  tool: Tool;
  onSelect: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const { title, description, Icon } = tool;

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`card ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="icon-wrapper">
        <Icon className="icon" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ToolCard;
