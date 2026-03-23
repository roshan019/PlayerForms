import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <h2>Cricly</h2>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-column">
            <h3>APPS</h3>
            <ul className="footer-list">
              <li>
                <a href="#">
                  <span className="icon">🤖</span> Android
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">🍎</span> iOS
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>FOLLOW US ON</h3>
            <ul className="footer-list">
              <li>
                <a href="#">
                  <span className="icon">f</span> Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">𝕏</span> Twitter
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">▶</span> Youtube
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">P</span> Pinterest
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul className="footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Notice</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 Cricly.com, Cricly Platforms Limited. All rights reserved | The Times of India | Navbharat Times</p>
      </div>
    </footer>
  );
}
