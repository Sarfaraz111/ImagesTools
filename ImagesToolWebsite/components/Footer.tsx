import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
        <div className="container">
            <p>&copy; Smart Imagika {new Date().getFullYear()}</p>
            <div className="footer-links">
                <a href="/privacy.html">Privacy Policy</a>
                <a href="/terms.html">Terms</a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
