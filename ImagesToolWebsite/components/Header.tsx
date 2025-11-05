import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onHomeClick();
  };

  return (
    <header className="main-header">
        <div className="container">
            <a href="/" className="logo" onClick={handleNavClick}>
                <svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: '#3b82f6'}} />
                            <stop offset="100%" style={{stopColor: '#8b5cf6'}} />
                        </linearGradient>
                    </defs>
                    <text x="0" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="800" fill="url(#logo-gradient)">Smart Imagika</text>
                </svg>
            </a>
            <nav className="main-nav">
                <a href="/" onClick={handleNavClick}>Home</a>
                <a href="/" onClick={handleNavClick}>Tools</a>
                <a href="/about.html">About</a>
                <a href="/contact.html">Contact</a>
                <a href="https://www.effectivegatecpm.com/pqcqtg5ef?key=04011f8ad192d9447d763d021eeb2cab" target="_blank" rel="noopener noreferrer" className="btn btn-special">🔥 Exclusive Deals</a>
            </nav>
        </div>
    </header>
  );
};

export default Header;
