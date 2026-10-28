import React from 'react';
import '../CSS/Hero.css';
import tof from '../assets/tof.png'; 

export default function Hero() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'CV_Fadwa_Aabidin.pdf';
    link.click();
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">

        {/* Colonne Gauche : Texte & Typographie Navy */}
        <div className="hero-text-col">
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            Available for New Projects
          </div>

          <h1 className="hero-heading">
            Engineering <span className="hero-serif-accent">Impactful</span> Digital Systems.
          </h1>

          <p className="hero-bio">
            Combining rigorous software engineering with refined editorial vision.
            Building resilient architectures, intuitive web platforms, and elegant
            user experiences.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-cv" onClick={handleDownloadCV}>
              <span>Download CV</span>
              <svg
                width="18"
                height="18"
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
            </button>

            <a href="#projects" className="btn-secondary-outline">
              View Work
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">05+</span>
              <span className="stat-title">Years Experience</span>
            </div>
            <div className="stat-sep"></div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-title">Delivered Works</span>
            </div>
            <div className="stat-sep"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-title">Production Quality</span>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Portrait encadré dans le disque Warm White avec anneaux orbitaux */}
        <div className="hero-image-col">
          <div className="visual-stage">
            
            {/* Anneaux orbitaux concentriques animés (pointillés bordeaux) */}
            <svg
              className="orbit-rings-svg"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grand anneau extérieur en pointillés */}
              <circle
                className="orbit-ring ring-outer"
                cx="300"
                cy="300"
                r="285"
              />
              {/* Anneau intermédiaire en pointillés fins */}
              <circle
                className="orbit-ring ring-middle"
                cx="300"
                cy="300"
                r="250"
              />
              {/* Arc accentué bordeaux plus soutenu */}
              <path
                className="orbit-accent-arc"
                d="M 545 340 A 250 250 0 0 1 480 470"
              />
            </svg>

            {/* Disque d'arrière-plan Warm White (#F8F3EC) */}
            <div className="portrait-circle-backdrop"></div>

            {/* Photo portrait transparente */}
            <div className="portrait-img-wrapper">
              <img
                src={tof}
                alt="Fadwa Aabidin"
                className="portrait-photo"
              />
            </div>

            {/* Badge "Open to work" bordeaux exactement comme sur votre image */}
            <div className="badge-open-to-work">
              Open to work
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
