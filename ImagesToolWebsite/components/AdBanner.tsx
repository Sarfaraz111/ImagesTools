import React, { useEffect, useRef } from 'react';

const AdBanner: React.FC = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current || !adContainerRef.current) return;
    
    // Clear previous ad scripts if any, for hot-reloading scenarios
    adContainerRef.current.innerHTML = '';

    const scriptConfig = document.createElement('script');
    scriptConfig.type = 'text/javascript';
    scriptConfig.innerHTML = `
      window.atOptions = {
        'key' : '5de369e7122b0050445519393a9d4635',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    adContainerRef.current.appendChild(scriptConfig);

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = '//www.highperformanceformat.com/5de369e7122b0050445519393a9d4635/invoke.js';
    scriptInvoke.async = true;
    adContainerRef.current.appendChild(scriptInvoke);
    
    isAdLoaded.current = true;
    
  }, []);

  return (
    <div className="ad-banner-container">
      <div ref={adContainerRef}></div>
    </div>
  );
};

export default AdBanner;
