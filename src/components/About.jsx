import { useEffect, useRef, useState } from "react";
import "../CSS/About.css";

// "hl" marks the two words that get the serif-italic treatment
const HEADING = [
  { w: "Derrière" },
  { w: "chaque" },
  { w: "ligne" },
  { w: "de" },
  { w: "code," },
  { w: "une" },
  { w: "idée", hl: true },
  { w: "prend" },
  { w: "vie.", hl: true },
];

export default function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the entrance animations when the section enters the viewport
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="apropos"
      className={visible ? "about is-visible" : "about"}
      aria-labelledby="about-title"
    >
      <div className="about__light" aria-hidden="true" />

      <div className="about__inner">
        {/* single floating glass element with one thin animated line */}
        <div className="about__glass" aria-hidden="true">
          <span className="about__disc" />
          <svg className="about__arc" viewBox="0 0 100 100">
            <circle className="about__arc-track" cx="50" cy="50" r="48" />
            <circle
              className="about__arc-run"
              cx="50"
              cy="50"
              r="48"
              pathLength="100"
            />
          </svg>
        </div>

        <span className="about__label about__reveal" style={{ "--d": "0ms" }}>
          À PROPOS
        </span>

        <h2 id="about-title" className="about__title">
          {HEADING.map(({ w, hl }, i) => (
            <span key={w}>
              <span
                className={hl ? "about__word about__word--hl" : "about__word"}
              >
                <span
                  className="about__word-in"
                  style={{ "--i": i }}
                >
                  {w}
                </span>
              </span>{" "}
            </span>
          ))}
        </h2>

        <div className="about__body">
          <p className="about__text about__reveal" style={{ "--d": "800ms" }}>
            <span className="about__em">Diplômée en Développement Web Full Stack,</span>{" "}
            j’aime transformer des idées en expériences web modernes,
            intuitives et responsives. Je m’intéresse autant à la conception
            des interfaces qu’au développement des fonctionnalités, avec une
            attention particulière portée aux détails, à la qualité du code et
            à l’expérience utilisateur.
          </p>

          <p className="about__closing about__reveal" style={{ "--d": "950ms" }}>
            Curiosité, créativité et évolution continue.
          </p>
        </div>
      </div>
    </section>
  );
}