import { useEffect, useRef, useState } from "react";
import { FaCss3Alt, FaGithub, FaHtml5 } from "react-icons/fa";
import {
  FiColumns,
  FiDatabase,
  FiGlobe,
  FiMousePointer,
  FiRefreshCw,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import {
  SiFigma,
  SiGit,
  SiJavascript,
  SiJira,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPostman,
  SiReact,
  SiReactrouter,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "../CSS/Tech.css";

const BORDEAUX = "#4B0000";

/*
  Technologies taken from the CV. Technologies without an official logo
  (Sanctum, REST API, NoSQL, methodologies) use a neutral Bordeaux icon.
*/
const TECHS = [
  // Front-End
  { name: "React.js", category: "Front-End", Icon: SiReact, color: "#087EA4", desc: "Bibliothèque JavaScript pour construire des interfaces dynamiques et réutilisables." },
  { name: "JavaScript", category: "Front-End", Icon: SiJavascript, color: "#E5B800", desc: "Le langage du web, au cœur de la logique côté client de mes interfaces." },
  { name: "HTML5", category: "Front-End", Icon: FaHtml5, color: "#E34F26", desc: "Structure sémantique et accessible de mes pages web." },
  { name: "CSS3", category: "Front-End", Icon: FaCss3Alt, color: "#1572B6", desc: "Mise en page, design responsive et animations de mes interfaces." },
  { name: "React Router", category: "Front-End", Icon: SiReactrouter, color: "#CA4245", desc: "Gestion de la navigation entre les pages de mes applications React." },
  // Back-End
  { name: "PHP", category: "Back-End", Icon: SiPhp, color: "#777BB4", desc: "Langage côté serveur pour la logique back-end de mes applications." },
  { name: "Laravel", category: "Back-End", Icon: SiLaravel, color: "#FF2D20", desc: "Framework PHP pour structurer et développer le back-end de mes applications." },
  { name: "Laravel Sanctum", category: "Back-End", Icon: FiShield, color: BORDEAUX, desc: "Authentification des API avec Laravel." },
  { name: "REST API", category: "Back-End", Icon: FiGlobe, color: BORDEAUX, desc: "Communication entre le front-end et le back-end via des endpoints structurés." },
  // Bases de données
  { name: "MySQL", category: "Base de données", Icon: SiMysql, color: "#00758F", desc: "Base de données relationnelle pour stocker et interroger les données." },
  { name: "NoSQL", category: "Base de données", Icon: FiDatabase, color: BORDEAUX, desc: "Bases de données non relationnelles, pensées pour des données flexibles." },
  // Outils
  { name: "Git", category: "Outils", Icon: SiGit, color: "#F05032", desc: "Gestion de versions et suivi de l’historique du code." },
  { name: "GitHub", category: "Outils", Icon: FaGithub, color: "#242124", desc: "Hébergement du code, collaboration et partage de mes projets." },
  { name: "Visual Studio Code", category: "Outils", Icon: VscVscode, color: "#007ACC", desc: "Éditeur de code pour écrire, organiser et déboguer mes projets." },
  { name: "Postman", category: "Outils", Icon: SiPostman, color: "#FF6C37", desc: "Test et vérification des requêtes API." },
  { name: "Figma", category: "Outils", Icon: SiFigma, color: "#A259FF", desc: "Conception d’interfaces et de maquettes avant le développement." },
  { name: "Jira", category: "Outils", Icon: SiJira, color: "#0052CC", desc: "Suivi des tâches et gestion de projet." },
  // Méthodologies
  { name: "Agile", category: "Méthodologie", Icon: FiRefreshCw, color: BORDEAUX, desc: "Approche itérative : livrer progressivement et s’adapter au changement." },
  { name: "Scrum", category: "Méthodologie", Icon: FiUsers, color: BORDEAUX, desc: "Cadre de travail en équipe organisé en sprints." },
  { name: "Kanban", category: "Méthodologie", Icon: FiColumns, color: BORDEAUX, desc: "Visualisation du flux de travail et des tâches en cours." },
];

const ROW_ONE = TECHS.filter((t) =>
  ["Front-End", "Back-End", "Base de données"].includes(t.category)
);
const ROW_TWO = TECHS.filter((t) => ["Outils", "Méthodologie"].includes(t.category));

const SLOGANS = [
  "Créer des expériences web modernes.",
  "Transformer les idées en solutions.",
  "Développer avec passion et précision.",
];

// Must match the "-100% / 3" in TechStack.css
const COPIES = 3;

function Slogan() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = setInterval(
      () => setIndex((n) => (n + 1) % SLOGANS.length),
      3600
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="tech-slogan">
      {SLOGANS.map((text, n) => (
        <span
          key={text}
          className={n === index ? "tech-slogan__item is-on" : "tech-slogan__item"}
          aria-hidden={n !== index}
        >
          {text}
        </span>
      ))}
    </p>
  );
}

function TechCard({ tech, isActive, isPinned, interactive, onHover, onToggle }) {
  const { name, category, Icon, color } = tech;
  return (
    <li>
      <button
        type="button"
        className={isActive ? "tech-item is-active" : "tech-item"}
        style={{ "--c": color }}
        tabIndex={interactive ? 0 : -1}
        aria-pressed={interactive ? isPinned : undefined}
        onPointerEnter={(e) => e.pointerType === "mouse" && onHover(name)}
        onFocus={(e) =>
          interactive && e.currentTarget.matches(":focus-visible") && onHover(name)
        }
        onBlur={() => interactive && onHover(null)}
        onClick={() => onToggle(name)}
      >
        <span className="tech-item__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="tech-item__text">
          <span className="tech-item__name">{name}</span>
          <span className="tech-item__cat">{category}</span>
        </span>
      </button>
    </li>
  );
}

function MarqueeRow({ label, items, reverse, duration, current, pinned, onHover, onToggle }) {
  return (
    <div
      className={reverse ? "tech-row tech-row--reverse" : "tech-row"}
      style={{ "--dur": `${duration}s` }}
    >
      <div className="tech-track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            className="tech-group"
            key={copy}
            aria-label={copy === 0 ? label : undefined}
            aria-hidden={copy > 0}
          >
            {items.map((tech) => (
              <TechCard
                key={tech.name}
                tech={tech}
                interactive={copy === 0}
                isActive={current === tech.name}
                isPinned={pinned === tech.name}
                onHover={onHover}
                onToggle={onToggle}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TechStack({ id }) {
  const rootRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);

  const current = hovered ?? pinned;
  const tech = TECHS.find((t) => t.name === current);

  // Reveal once, and only run the marquee while the section is on screen
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Release a pinned card by tapping elsewhere or pressing Escape
  useEffect(() => {
    if (!pinned) return undefined;
    const onDown = (e) => !e.target.closest(".tech-item") && setPinned(null);
    const onKey = (e) => e.key === "Escape" && setPinned(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  const toggle = (name) => setPinned((p) => (p === name ? null : name));

  const classes = ["tech-stack"];
  if (revealed) classes.push("is-revealed");
  if (inView) classes.push("is-inview");
  if (pinned) classes.push("has-pin");

  const shared = { current, pinned, onHover: setHovered, onToggle: toggle };

  return (
    <section
      ref={rootRef}
      id={id}
      className={classes.join(" ")}
      aria-labelledby="tech-stack-title"
    >
      <div className="tech-stack__container">
        <span className="tech-stack__eyebrow tech-reveal" style={{ "--d": "0ms" }}>
          STACK TECHNIQUE
        </span>
        <h2
          id="tech-stack-title"
          className="tech-stack__title tech-reveal"
          style={{ "--d": "100ms" }}
        >
          Les technologies que j’utilise au quotidien
        </h2>
        <div className="tech-reveal" style={{ "--d": "200ms" }}>
          <Slogan />
        </div>
      </div>

      <div
        className="tech-showcase tech-reveal"
        style={{ "--d": "300ms" }}
        onPointerLeave={() => setHovered(null)}
      >
        <MarqueeRow
          label="Front-End, Back-End et bases de données"
          items={ROW_ONE}
          duration={80}
          {...shared}
        />
        <MarqueeRow
          label="Outils de développement et méthodologies"
          items={ROW_TWO}
          duration={68}
          reverse
          {...shared}
        />
      </div>

      <div className="tech-stack__container">
        <div className="tech-detail tech-reveal" style={{ "--d": "400ms" }} aria-live="polite">
          {tech ? (
            <div className="tech-detail__body" key={tech.name} style={{ "--c": tech.color }}>
              <span className="tech-detail__icon" aria-hidden="true">
                <tech.Icon />
              </span>
              <div className="tech-detail__text">
                <div className="tech-detail__meta">
                  <strong>{tech.name}</strong>
                  <span className="tech-detail__tag">{tech.category}</span>
                  {pinned === tech.name && (
                    <span className="tech-detail__tag tech-detail__tag--pin">En pause</span>
                  )}
                </div>
                <p>{tech.desc}</p>
              </div>
            </div>
          ) : (
            <div className="tech-detail__body tech-detail__body--hint">
              <span className="tech-detail__icon tech-detail__icon--hint" aria-hidden="true">
                <FiMousePointer />
              </span>
              <p>Survolez ou touchez une technologie pour découvrir son rôle.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}