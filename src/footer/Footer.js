import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.pixsector.com/cache/200e7bcc/av16efeffeed4418c90c1.png" alt="Instagram" title="Instagram" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.pixsector.com/cache/c2d6c2a1/av580aef89b415365fb9c.png" alt="Facebook" title="Facebook" />
          </a>
        </div>

        <div className="contact-info">
          <h2>Elérhetőségeink</h2>
          <p>Kovacssz@kkszki.hu</p>
          <p>Siked@kkszki.hu</p>
          <p>Janosim@kkszki.hu</p>
        </div>

        
      </div>
    </div>
  );
}

export default Footer;
