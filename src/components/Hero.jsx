
import React from "react";
import "../CSS/Hero.css";
import {
  FaGithub,
  FaLinkedinIn,
  FaReact,
  FaPhp,
  FaDatabase,
} from "react-icons/fa";
import { SiLaravel, SiJavascript } from "react-icons/si";
import { MdOutlineArrowOutward } from "react-icons/md";

const technologies = [
  { name: "React", icon: <FaReact />, className: "react" },
  { name: "Laravel", icon: <SiLaravel />, className: "laravel" },
  { name: "JavaScript", icon: <SiJavascript />, className: "javascript" },
  { name: "PHP", icon: <FaPhp />, className: "php" },
  { name: "MySQL", icon: <FaDatabase />, className: "mysql" },
];

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-background-shape hero-shape-one" />
      <div className="hero-background-shape hero-shape-two" />

      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <div className="hero-availability">
            <span className="availability-dot" />
            <span>Développeuse Web Full Stack</span>
          </div>

          <p className="hero-eyebrow">
            BIENVENUE DANS MON UNIVERS DIGITAL
          </p>

          <h1>
            Je transforme les idées en
            <span className="hero-highlight"> expériences web</span>
            <span className="hero-title-bottom"> modernes.</span>
          </h1>

          <p className="hero-description">
            Développeuse Web Full Stack récemment diplômée, je conçois
            des applications web modernes, fonctionnelles et intuitives.
            Mon objectif : transformer chaque idée en une expérience
            digitale utile et soignée.
          </p>

          <div className="hero-buttons">
            <a href="#projets" className="hero-btn hero-btn-primary">
              Découvrir mes projets
              <MdOutlineArrowOutward />
            </a>

            <a href="#contact" className="hero-btn hero-btn-secondary">
              Me contacter
            </a>
          </div>

          <div className="hero-socials">
            <span className="hero-social-label">Retrouvez-moi sur</span>

            <a
              href="https://github.com/FadwaAb"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hero-social-link"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/fadwa-aabidin-621074390"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hero-social-link"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT — CODE EDITOR */}
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-code-card">
            <div className="code-window-header">
              <div className="code-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="code-window-filename">
                developer.js
              </span>

              <span className="code-window-symbol">{"</>"}</span>
            </div>

            <div className="code-window-body">
              <div className="code-line">
                <span className="line-number">01</span>
                <span>
                  <span className="code-purple">const</span>{" "}
                  <span className="code-blue">developer</span>{" "}
                  <span className="code-light">= {"{"}</span>
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">02</span>
                <span>
                  &nbsp;&nbsp;name:{" "}
                  <span className="code-green">'Fadwa Aabidin'</span>,
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">03</span>
                <span>
                  &nbsp;&nbsp;role:{" "}
                  <span className="code-green">
                    'Full Stack Developer'
                  </span>,
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">04</span>
                <span>
                  &nbsp;&nbsp;frontend: [
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">05</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-orange">'React'</span>,
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">06</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-orange">'JavaScript'</span>
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">07</span>
                <span>&nbsp;&nbsp;],</span>
              </div>

              <div className="code-line">
                <span className="line-number">08</span>
                <span>
                  &nbsp;&nbsp;backend: [
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">09</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-orange">'PHP'</span>,
                  {" "}
                  <span className="code-orange">'Laravel'</span>
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">10</span>
                <span>&nbsp;&nbsp;],</span>
              </div>

              <div className="code-line">
                <span className="line-number">11</span>
                <span>
                  &nbsp;&nbsp;database:{" "}
                  <span className="code-green">'MySQL'</span>,
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">12</span>
                <span>
                  &nbsp;&nbsp;mindset:{" "}
                  <span className="code-green">'Always learning'</span>
                </span>
              </div>

              <div className="code-line">
                <span className="line-number">13</span>
                <span className="code-light">{"};"}</span>
              </div>

              <div className="code-line code-last-line">
                <span className="line-number">14</span>
                <span>
                  <span className="code-purple">export default</span>{" "}
                  <span className="code-blue">developer</span>;
                  <span className="code-cursor">|</span>
                </span>
              </div>
            </div>

            <div className="code-window-footer">
              <span>
                <span className="footer-status-dot" />
                Ready to build
              </span>
              <span>JavaScript · UTF-8</span>
            </div>
          </div>

          {/* FLOATING CARD */}
          <div className="hero-floating-card floating-card-top">
            <span className="floating-card-icon">✦</span>
            <div>
              <strong>Clean Code</strong>
              <span>Simple. Structuré. Évolutif.</span>
            </div>
          </div>

          <div className="hero-floating-card floating-card-bottom">
            <span className="floating-card-brackets">{"{ }"}</span>
            <div>
              <strong>Full Stack</strong>
              <span>Frontend + Backend</span>
            </div>
          </div>
        </div>
      </div>

      {/* TECHNOLOGIES */}
      <div className="hero-tech-section">
        <p className="hero-tech-label">TECHNOLOGIES QUE J'UTILISE</p>

        <div className="hero-tech-list">
          {technologies.map((tech) => (
            <div
              className={`hero-tech-item ${tech.className}`}
              key={tech.name}
            >
              <span className="tech-icon">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#apropos" className="hero-scroll">
        <span className="scroll-line" />
        <span>Défiler pour découvrir</span>
      </a>
    </section>
  );
}
