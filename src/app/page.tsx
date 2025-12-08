import Image from 'next/image';
import './home.css';

export default function Home() {
  return (
    <main>
      <div className="noise"></div>

      <div className="shell">
        <div className="card">
          <div className="card-inner">
            <header>
              <div className="brand">
                <div className="logo-mark">
                  <Image src="/A&O Logo.png" alt="A&O Logo" width={50} height={50} />
                </div>
                <div className="brand-text">
                  <h1>A&amp;O Studio</h1>
                  <p>Design &amp; engineering studio building human-centered, AI-powered digital experiences.</p>
                </div>
              </div>

              <div className="tag">
                <div className="tag-dot"></div>
                <span>Under Construction</span>
              </div>
            </header>

            <section className="content">
              <section className="left">
                <div className="headline">
                  <div className="kicker">New website loading...</div>
                  <h2>
                    We’re crafting a
                    <span className="highlight"> fresh digital home </span>
                    for A&amp;O Studio.
                  </h2>
                  <p className="description">
                    Our full site isn’t live yet, but the studio is very much active. We’re busy designing, prototyping,
                    and building products that blend strategy, UX, and modern technology.
                  </p>
                </div>

                <div className="meta-list">
                  <div className="meta-item">
                    <div className="meta-pill">01</div>
                    <span>Brand &amp; visual identity</span>
                  </div>
                  <div className="meta-item">
                    <div className="meta-pill">02</div>
                    <span>Product &amp; UX strategy</span>
                  </div>
                  <div className="meta-item">
                    <div className="meta-pill">03</div>
                    <span>AI-assisted experiences</span>
                  </div>
                </div>

                <div className="cta-row">
                  <button className="btn-primary" type="button">
                    <span>Get in touch</span>
                    <span>→</span>
                    <span className="spark"></span>
                  </button>

                  <button className="btn-secondary" type="button">
                    <span className="btn-secondary-dot"></span>
                    <span>Request a capabilities deck</span>
                  </button>
                </div>
                <p className="small-note">
                  For now, these buttons are placeholders. Replace them with email or contact links whenever you’re ready.
                </p>
              </section>

              <section className="right">
                <div className="status-card">
                  <div className="status-badge">
                    <div className="status-badge-pill">⧉</div>
                    <span>Build status</span>
                  </div>

                  <div className="progress-row">
                    <span className="progress-label">Homepage experience</span>
                    <span className="progress-value">68% complete</span>
                  </div>

                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>

                  <div className="status-footer">
                    <div className="status-pulse">
                      <span className="pulse-dot"></span>
                      <span>Studio operating as normal</span>
                    </div>
                    <span className="status-tag">Launch v1 · 2026</span>
                  </div>
                </div>

                <div className="contact-card">
                  <strong>Connect with A&amp;O Studio</strong>
                  <div className="contact-row">
                    {/* Replace href with your real links */}
                    <a href="mailto:support@aostudio.info" className="contact-pill">
                      <span className="icon">✉️</span>
                      <span>support@aostudio.info</span>
                    </a>
                    <a href="https://www.linkedin.com/company/a-o-studio" target="_blank" rel="noreferrer" className="contact-pill">
                      <span className="icon">in</span>
                      <span>Follow on LinkedIn</span>
                    </a>
                  </div>
                  <p className="small-note">
                    Reach out for collaborations, speaking, or consulting. A simple landing page today — a full studio
                    hub tomorrow.
                  </p>
                </div>
              </section>
            </section>

            <footer>
              © <span id="year"></span> A&amp;O Studio · All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
