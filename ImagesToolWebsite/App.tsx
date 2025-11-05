import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolCard from './components/ToolCard';
import ImageProcessor from './components/ImageProcessor';
import IconGenerator from './components/IconGenerator';
import Article from './components/Article';
import { TOOLS } from './constants/tools';
import { Tool, ToolType } from './types';
import AdBanner from './components/AdBanner';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
    setTimeout(() => {
      document.getElementById('tool-interface')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGoHome = () => {
    setSelectedTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ToolComponent = useMemo(() => {
    if (!selectedTool) return null;

    switch (selectedTool.id) {
      case ToolType.BACKGROUND_REMOVER:
      case ToolType.WATERMARK_REMOVER:
      case ToolType.IMAGE_ENHANCER:
      case ToolType.IMAGE_TO_CARTOON:
        return <ImageProcessor tool={selectedTool} />;
      case ToolType.ICON_GENERATOR:
        return <IconGenerator tool={selectedTool} />;
      default:
        return null;
    }
  }, [selectedTool]);

  return (
    <>
      <Header onHomeClick={handleGoHome} />
      <AdBanner />
      <main>
        {!selectedTool && (
          <>
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">AI Powered Image Tools That Transform Your Photos In Seconds</h1>
                    <p className="hero-subtitle">Experience the future of photo editing with our suite of intelligent, one-click tools.</p>
                    <a href="#tools" className="btn btn-primary" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Explore Tools</a>
                </div>
            </section>

            <section id="tools" className="tools-grid">
              <div className="container">
                {TOOLS.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onSelect={() => handleSelectTool(tool)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
        
        {selectedTool && (
          <section id="tool-interface" className="tool-interface-section">
             <div className="container">
              <button
                onClick={handleGoHome}
                className="back-button"
              >
                &larr; Back to All Tools
              </button>
              <div className="tool-content-wrapper">
                {ToolComponent}
                <Article article={selectedTool.article} />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default App;
