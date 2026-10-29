import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import "../CSS/Footer.css";

/*
  Links reused from the existing project:
  - section ids "accueil", "projets", "contact" and the two profile URLs
    come from the previous Footer / Projects / Contact code.
  - "a-propos" and "competences" are NOT confirmed: set them to the real
    ids of your About and Skills sections if they differ.
*/
const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/FadwaAb",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fadwa-aabidin-621074390",
    Icon: FaLinkedinIn,
  },
];

export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade-up reveal when the footer enters the viewport
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
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer
      ref={ref}
      className={visible ? "site-footer is-visible" : "site-footer"}
    >
      {/* closing statement */}
      <div className="footer__top">
        <h2 className="footer__title ft-reveal" style={{ "--d": 0 }}>
          Une idée en tête ? Construisons-la ensemble.
        </h2>
        <p className="footer__subtitle ft-reveal" style={{ "--d": 1 }}>
          Disponible pour de nouvelles opportunités et des projets créatifs.
        </p>
        <a className="footer__cta ft-reveal" style={{ "--d": 2 }} href="#contact">
          Parlons de votre projet
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {/* identity · navigation · social */}
      <div className="footer__main ft-reveal" style={{ "--d": 3 }}>
        <div className="footer__brand">
          <a className="footer__mark" href="#accueil" aria-label="Fadwa Aabidin, retour à l’accueil">
            AF
          </a>
          <div>
            <p className="footer__name">Fadwa Aabidin</p>
            <p className="footer__role">Développeuse Web Full Stack</p>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Navigation du pied de page">
          <ul>
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social" aria-label="Réseaux sociaux">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (s’ouvre dans un nouvel onglet)`}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* bottom bar */}
      <div className="footer__bottom ft-reveal" style={{ "--d": 4 }}>
        <p className="footer__copy">
          © {new Date().getFullYear()} Fadwa Aabidin. Tous droits réservés.
        </p>

        <p className="footer__status">
          <span className="footer__dot" aria-hidden="true" />
          Toujours en train d’apprendre.
        </p>

        <p className="footer__made">Made with passion &amp; a little bit of code.</p>

        <button type="button" className="footer__top-btn" onClick={backToTop} aria-label="Retour en haut de la page">
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}