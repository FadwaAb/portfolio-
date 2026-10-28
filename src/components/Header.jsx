import React, { useState } from "react";
import "../CSS/Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", href: "#" },
    { label: "À propos", href: "#a-propos" },
    { label: "Compétences", href: "#competences" },
    { label: "Projets", href: "#projets" },
    { label: "Parcours", href: "#parcours" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="portfolio-header">
      <div className="header-container">
        {/* Logo Image */}
        <a href="#" className="header-logo-link" aria-label="Accueil">
          <img src={logo} alt="Logo" className="header-logo-img" />
        </a>

        {/* Navigation Desktop */}
        <nav className="header-nav">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions : Réseaux sociaux + Télécharger CV */}
        <div className="header-actions">
          {/* GitHub Icon */}
          <a
            href="https://github.com/FadwaAb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-btn"
          >
            <svg
              className="social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com/in/votre-profil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-btn"
          >
            <svg
              className="social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* Bouton Télécharger CV */}
          <a
            href="/aabidin_fadwa_CV.pdf"
            download="CV-Fadwa-Aabidin.pdf"
            className="btn-download-cv"
          >
            <svg
              className="icon-download"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="btn-text">Télécharger CV</span>
          </a>

          {/* Hamburger Mobile */}
          <button
            type="button"
            className={`burger-btn ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mobile-socials">
              <a
                href="https://github.com/votre-username"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </a>
              <a
                href="https://linkedin.com/in/votre-profil"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </li>
            <li>
              <a
                href="/aabidin_fadwa_CV.pdf"
                download="CV-Fadwa-Aabidin.pdf"
                className="mobile-btn-cv"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Télécharger le CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
