
import React, { useEffect, useRef, useState } from "react";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiPhp,
  SiLaravel,
  SiMysql,
} from "react-icons/si";
import { FaCss3Alt, FaEllipsisH } from "react-icons/fa";
import "../CSS/About.css";

const extraSkills = [
  // { name: "Git", icon: <SiGit /> },
  // { name: "Figma", icon: <SiFigma /> },
];

const skills = [
  { name: "HTML", icon: <SiHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "React", icon: <SiReact /> },
  { name: "PHP", icon: <SiPhp /> },
  { name: "Laravel", icon: <SiLaravel /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "Autres", icon: <FaEllipsisH />, isMore: true },
];

const strengths = [
  {
    title: "Résolution de problèmes",
    text: "Trouver des solutions adaptées.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 1-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0 1 12 3Z" />
      </svg>
    ),
  },
  {
    title: "Esprit d'équipe",
    text: "Collaborer et partager les idées.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.6-2.8 2.8-4.5 5.5-4.5s4.9 1.7 5.5 4.5" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M15.5 14.6c2.5.2 4.3 1.7 5 4.1" />
      </svg>
    ),
  },
  {
    title: "Apprentissage continu",
    text: "Progresser et découvrir de nouvelles technologies.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 5v4" />
        <path d="M12 13a4 4 0 1 1 4-4" />
        <path d="M12 13a4 4 0 1 0-4 4c0 1.5.8 2.7 2 3.4V21h4v-.6c1.2-.7 2-1.9 2-3.4a4 4 0 1 0-4-4Z" />
      </svg>
    ),
  },
];

/* ---------- Apparition progressive au défilement ---------- */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const Reveal = ({ children, className = "", delay = 0 }) => {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`about-reveal${visible ? " is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------- Colonne 1 : carte terminal $ whoami ---------- */
const WhoamiCard = () => (
  <div
    className="about-terminal-card"
    aria-label="Profil développeuse affiché comme un terminal"
  >
    <div className="about-terminal-head">
      <span className="about-dot about-dot--red" />
      <span className="about-dot about-dot--amber" />
      <span className="about-dot about-dot--green" />
      <span className="about-terminal-file">fadwa@portfolio: ~</span>
    </div>

    <div className="about-terminal-content">
      <p className="t-prompt">$ whoami</p>
      <p className="t-empty">&nbsp;</p>
      <p className="t-name">Fadwa Aabidin</p>
      <p className="t-role">Développeuse Web Full Stack</p>
      <p className="t-empty">&nbsp;</p>
      <p className="t-loc">📍 Tiznit, Maroc</p>
      <p className="t-empty">&nbsp;</p>
      <p className="t-text">
        Je suis développeuse web et j'aime
      </p>
      <p className="t-text">
        transformer des idées en solutions
      </p>
      <p className="t-text">
        digitales utiles et concrètes.
      </p>
      <p className="t-empty">&nbsp;</p>
      <p className="t-text">
        J'aime travailler avec les technologies
      </p>
      <p className="t-text">
        modernes, résoudre des problèmes et
      </p>
      <p className="t-text">
        continuer à apprendre chaque jour.
      </p>
      <p className="t-empty">&nbsp;</p>
      <p className="t-prompt">
        &gt;_
        <span className="about-cursor" aria-hidden="true" />
      </p>
    </div>
  </div>
);

/* ---------- Colonne 3 : grille de compétences ---------- */
const SkillsGrid = () => {
  const [showMore, setShowMore] = useState(false);
  const hasExtras = extraSkills.length > 0;

  return (
    <>
      <div className="about-skills-grid">
        {skills.map((skill) => {
          const isMore = skill.isMore && !hasExtras;

          return (
            <button
              key={skill.name}
              type="button"
              className={`about-skill${
                isMore ? " about-skill--static" : ""
              }`}
              onClick={
                skill.isMore && hasExtras
                  ? () => setShowMore((v) => !v)
                  : undefined
              }
              aria-expanded={
                skill.isMore && hasExtras ? showMore : undefined
              }
            >
              <span className="about-skill-icon">{skill.icon}</span>
              <span className="about-skill-name">{skill.name}</span>
            </button>
          );
        })}
      </div>

      {hasExtras && showMore && (
        <div className="about-skills-extra">
          {extraSkills.map((skill) => (
            <span key={skill.name} className="about-skill-extra-chip">
              <span className="about-skill-icon about-skill-icon--sm">
                {skill.icon}
              </span>
              {skill.name}
            </span>
          ))}
        </div>
      )}

      <p className="about-handwritten">Toujours apprendre… ♡</p>
    </>
  );
};

/* ---------- Section À propos ---------- */
export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-title"
    >
      <div className="about-columns">
        {/* Colonne 1 — profil terminal */}
        <Reveal className="about-col about-col--terminal" delay={0}>
          <WhoamiCard />
        </Reveal>

        {/* Colonne 2 — présentation */}
        <Reveal className="about-col about-col--main" delay={120}>
          <p className="about-tag">
            <span className="about-tag-arrow">↳</span> À propos de moi{" "}
            <span className="about-tag-arrow">/-&gt;</span>
          </p>

          <h2 id="about-title" className="about-title">
            Passionnée par la{" "}
            <span className="about-accent">technologie</span> et le{" "}
            <span className="about-accent">design</span>
          </h2>

          <p className="about-text">
            Je suis récemment diplômée en Développement Web Full Stack et
            passionnée par la création d'applications web modernes et
            intuitives.
          </p>

          <p className="about-text">
            Pour moi, un bon site web ne se limite pas au code : il doit
            également offrir une expérience utilisateur agréable, une
            interface cohérente et une navigation fluide.
          </p>

          <p className="about-text">
            J'accorde une attention particulière au design UI/UX, à la
            qualité du développement et à la résolution de problèmes
            concrets. Je continue à développer mes compétences à travers
            la pratique et la réalisation de projets.
          </p>

          <ul className="about-strengths">
            {strengths.map((s) => (
              <li key={s.title} className="about-strength">
                <span className="about-strength-icon">{s.icon}</span>
                <div>
                  <h3 className="about-strength-title">{s.title}</h3>
                  <p className="about-strength-text">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Colonne 3 — compétences */}
        <Reveal className="about-col about-col--skills" delay={240}>
          <p className="about-tag">
            <span className="about-tag-arrow">↳</span> Mes compétences{" "}
            <span className="about-tag-arrow">/-&gt;</span>
          </p>

          <h2 className="about-title about-title--sm">
            Technologies que j'utilise
          </h2>

          <SkillsGrid />
        </Reveal>
      </div>
    </section>
  );
}
