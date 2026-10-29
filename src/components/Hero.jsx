import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight, FiCode, FiDownload } from "react-icons/fi";
import "../CSS/Hero.css";
import photo from "../assets/top.jpg";

// Same path as in Header.jsx — the PDF must be inside /public
const CV_FILE = "/Aabidin-Fadwa-CV.pdf";
const CV_NAME = "Aabidin-Fadwa-CV.pdf";

// Each line = list of [token type, text]
const CODE_LINES = [
  [["k", "const"], ["t", " "], ["v", "developer"], ["t", " = {"]],
  [["t", "  "], ["p", "name"], ["t", ": "], ["s", '"Fadwa Aabidin"'], ["t", ","]],
  [["t", "  "], ["p", "role"], ["t", ": "], ["s", '"Full Stack Developer"'], ["t", ","]],
  [
    ["t", "  "],
    ["p", "stack"],
    ["t", ": ["],
    ["s", '"React"'],
    ["t", ", "],
    ["s", '"Laravel"'],
    ["t", ", "],
    ["s", '"MySQL"'],
    ["t", "],"],
  ],
  [["t", "  "], ["p", "passion"], ["t", ": "], ["s", '"Building for the web"']],
  [["t", "};"]],
];

const delay = (ms) => ({ "--d": `${ms}ms` });

export default function Hero() {
  return (
    <section className="hero" id="accueil" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__inner">
        {/* ---------- Text ---------- */}
        <div className="hero__content">
          <span className="hero__badge hero__reveal" style={delay(0)}>
            <span className="hero__badge-dot" aria-hidden="true" />
            DÉVELOPPEUSE WEB FULL STACK
          </span>

          <h1 id="hero-title" className="hero__title hero__reveal" style={delay(100)}>
            Je transforme les idées en{" "}
            <span className="hero__accent">expériences web modernes.</span>
          </h1>

          <p className="hero__text hero__reveal" style={delay(200)}>
            Développeuse Web Full Stack diplômée, je conçois et développe des
            applications web modernes, responsives et intuitives avec React.js,
            Laravel et MySQL.
          </p>

          <div className="hero__actions hero__reveal" style={delay(300)}>
            <a className="hero__btn hero__btn--primary" href="#projets">
              <span>Découvrir mes projets</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
            <a className="hero__btn hero__btn--ghost" href="#contact">
              Me contacter
            </a>
          </div>

          <div className="hero__secondary hero__reveal" style={delay(400)}>
            <a
              className="hero__social"
              href="https://github.com/FadwaAb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              className="hero__social"
              href="https://www.linkedin.com/in/fadwa-aabidin-621074390"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <span className="hero__divider" aria-hidden="true" />
            <a className="hero__cv" href={CV_FILE} download={CV_NAME}>
              <FiDownload aria-hidden="true" />
              <span>Télécharger mon CV</span>
            </a>
          </div>
        </div>

        {/* ---------- Photo composition ---------- */}
        <div className="hero__visual">
          <div className="hero__stage">
            <div className="hero__frame">
              <img src={photo} alt="Portrait de Fadwa Aabidin" />
            </div>

            {/* thin animated bordeaux line around the photo */}
            <svg
              className="hero__orbit"
              viewBox="0 0 400 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="hero__orbit-track"
                d="M2 200 A198 198 0 0 1 398 200 L398 466 Q398 498 366 498 L34 498 Q2 498 2 466 Z"
                pathLength="100"
              />
              <path
                className="hero__orbit-run"
                d="M2 200 A198 198 0 0 1 398 200 L398 466 Q398 498 366 498 L34 498 Q2 498 2 466 Z"
                pathLength="100"
              />
              <path
                className="hero__orbit-run hero__orbit-run--2"
                d="M2 200 A198 198 0 0 1 398 200 L398 466 Q398 498 366 498 L34 498 Q2 498 2 466 Z"
                pathLength="100"
              />
            </svg>

            {/* subtle floating decorations */}
            <span className="hero__ring" aria-hidden="true" />
            <span className="hero__dot" aria-hidden="true" />
            <span className="hero__chip" aria-hidden="true">
              <FiCode />
            </span>

            {/* floating code window */}
            <figure className="hero__code" aria-label="Extrait de code developer.js">
              <figcaption className="hero__code-bar">
                <span className="hero__code-lights" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="hero__code-title">developer.js</span>
              </figcaption>
              <pre className="hero__code-body">
                <code>
                  {CODE_LINES.map((line, i) => (
                    <span className="hero__code-line" key={i}>
                      <span className="hero__code-num" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>
                        {line.map(([type, text], j) => (
                          <span className={`tok tok--${type}`} key={j}>
                            {text}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}