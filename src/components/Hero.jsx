import React, { useEffect, useRef, useState, useCallback } from "react";
import "../CSS/Hero.css";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineArrowOutward } from "react-icons/md";

const CODE_LINES = [
  { text: "const developer = {", cls: "tk-keyword" },
  { text: "  name: 'Fadwa Aabidin',", cls: "tk-property" },
  { text: "  role: 'Developpeuse Full Stack',", cls: "tk-property" },
  { text: "  stack: ['React', 'Laravel', 'JS', 'MySQL'],", cls: "tk-string" },
  { text: "  design: 'UI / UX soigne',", cls: "tk-property" },
  { text: "  disponible: true,", cls: "tk-keyword" },
  { text: "};", cls: "tk-plain" },
  { text: "// prete a construire", cls: "tk-comment" },
];

/* Résultat affiché dans le petit terminal en bas */
const RESULT_LINES = [
  { num: "", text: "$ node developer.js", cls: "tk-string" },
  { num: "01", text: "→ Fadwa Aabidin — Développeuse Full Stack", cls: "tk-plain" },
  { num: "02", text: "✓ disponible: true — prête à construire", cls: "tk-comment" },
];

const useTypewriter = (lines, speed = 26, startDelay = 600) => {
  const [typed, setTyped] = useState([]);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const cancelledRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback(() => {
    clearTimer();
    cancelledRef.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(lines.map((l) => l.text));
      setDone(true);
      return;
    }

    setTyped([]);
    setDone(false);

    let lineIndex = 0;
    let charIndex = 0;

    const finish = () => {
      if (cancelledRef.current) return;  
      setDone(true);
    };

    const tick = () => {
      timerRef.current = null;
      if (cancelledRef.current) return;  

      if (lineIndex >= lines.length) {
        finish();
        return;
      }

      const current = lines[lineIndex].text;
      charIndex += 1;

      if (charIndex >= current.length) {
        setTyped((prev) =>
          prev.length >= lines.length ? prev : [...prev, current]
        );
        lineIndex += 1;
        charIndex = 0;
        if (lineIndex >= lines.length) {
          finish();                        
          return;                          
        }
        timerRef.current = setTimeout(tick, 110);
      } else {
        setTyped((prev) => {
          const next = [...prev];
          next[lineIndex] = current.slice(0, charIndex);
          return next;
        });
        timerRef.current = setTimeout(tick, speed);
      }
    };

    timerRef.current = setTimeout(tick, startDelay);
  }, [lines, speed, startDelay]);

  useEffect(() => {
    start();
    return () => {
      cancelledRef.current = true;  
      clearTimer();
    };
  }, [start]);

  const replay = useCallback(() => {
    start();
  }, [start]);

  return { typed, done, replay };
};

const Hero = () => {
  const { typed } = useTypewriter(CODE_LINES);

  const visibleLines = typed.slice(0, CODE_LINES.length);

  return (
    <section className="hero-section" id="home">
      <div className="hero-inner">

        {/* ================= GAUCHE : contenu ================= */}
        <div className="hero-content">
          <span className="hero-badge" data-animate style={{ "--delay": "0s" }}>
            <span className="badge-bracket">&lt;</span> DÉVELOPPEUSE WEB FULL STACK{" "}
            <span className="badge-bracket">/&gt;</span>
          </span>

          <h1 className="hero-title" data-animate style={{ "--delay": "0.12s" }}>
            Je transforme les idées en{" "}
            <span className="highlight">expériences web modernes</span>
          </h1>

          <p className="hero-description" data-animate style={{ "--delay": "0.24s" }}>
            Je conçois et développe des applications web modernes, responsives et
            intuitives, en combinant développement Full Stack, design soigné et
            expérience utilisateur.
          </p>

          <div className="hero-actions" data-animate style={{ "--delay": "0.36s" }}>
            <a href="#projects" className="btn btn-primary">
              Découvrir mes projets
              <MdOutlineArrowOutward className="btn-arrow" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Me contacter
            </a>
          </div>

          <div className="hero-socials" data-animate style={{ "--delay": "0.48s" }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub /> GitHub
            </a>
            <span className="social-dot" aria-hidden="true">•</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn /> LinkedIn
            </a>
            <span className="social-dot" aria-hidden="true">•</span>
            <a href="mailto:email@example.com" aria-label="Email">
              <MdOutlineEmail /> Email
            </a>
          </div>
        </div>

        {/* ================= DROITE : terminal de code ================= */}
        <div className="hero-visual" data-animate style={{ "--delay": "0.3s" }}>
          <div className="grid-bg" aria-hidden="true" />
          <div className="glow" aria-hidden="true" />
          <div className="circle-dashed" aria-hidden="true" />

          {/* Fenêtre de code style VS Code */}
          <div className="code-window">
            <div className="code-titlebar">
              <div className="dots" aria-hidden="true">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="code-tab">
                <span className="tab-dot" /> developer.js
              </span>
              <span className="code-lang">ES6+</span>
            </div>

            <div className="code-body" aria-label="Extrait de code animé">
              {visibleLines.map((line, i) => (
                <div className="code-line" key={i}>
                  <span className="line-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Garde-fou : jamais de crash même si l'état déborde */}
                  <span className={CODE_LINES[i]?.cls ?? "tk-plain"}>
                    {line || "\u00A0"}
                  </span>
                </div>
              ))}
              <span
                className="cursor"
                aria-hidden="true"
                style={{ visibility: typed.length >= CODE_LINES.length ? "hidden" : "visible" }}
              />
            </div>
          </div>

          {/* Petit terminal de résultat en bas */}
          <div className="result-terminal" aria-label="Résultat de l'exécution">
            <div className="result-titlebar">
              <span className="result-dot" aria-hidden="true" />
              Terminal — sortie
            </div>
            <div className="result-body">
              {RESULT_LINES.map((line, i) => (
                <div className="code-line" key={i}>
                  {line.num && (
                    <span className="line-number">{line.num}</span>
                  )}
                  <span className={line.cls}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Symbole décoratif */}
          <span className="code-symbol" aria-hidden="true">&lt;/&gt;</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;