import { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import "../CSS/Projects.css";

/*
  Add or remove projects here — the section adapts to any number of entries.
  - image: put an imported screenshot (import shot from "../assets/..."), or
    leave "" to show the CSS mockup built from the project's real information.
  - demo / github: leave "" when there is no real link (no button is shown).
*/
const PROJECTS = [
  {
    name: "AMUDUX",
    type: "Plateforme touristique",
    description:
      "Une plateforme de planification touristique marocaine, conçue avec React, Laravel et MySQL pour aider les utilisateurs à découvrir et organiser leurs expériences de voyage.",
    note: "Projet réalisé en équipe",
    stack: ["React", "Laravel", "MySQL"],
    mock: "tourism",
    image: "",
    demo: "",
    github: "https://github.com/sanafangach/touriste-projet",
  },
  {
    name: "Glow Beauty",
    type: "Site web beauté",
    description:
      "Un site web moderne dédié à la beauté, axé sur une présentation élégante, un design responsive et une navigation intuitive.",
    note: "",
    stack: ["React", "CSS"],
    mock: "beauty",
    image: "",
    demo: "",
    github: "",
  },
  {
    name: "Car Rental Management",
    type: "Application de gestion",
    description:
      "Une application de gestion de location de voitures développée avec PHP et MySQL, incluant les fonctionnalités CRUD.",
    note: "",
    stack: ["PHP", "MySQL"],
    mock: "table",
    image: "",
    demo: "",
    github: "",
  },
  {
    name: "Room Management Application",
    type: "Application desktop",
    description:
      "Une application desktop développée avec Python et Tkinter pour gérer les informations liées aux salles.",
    note: "",
    stack: ["Python", "Tkinter"],
    mock: "desktop",
    image: "",
    demo: "",
    github: "",
  },
];

// Below 820px (or with reduced motion) the section becomes a native swipe carousel
const SIMPLE_QUERY = "(max-width: 820px), (prefers-reduced-motion: reduce)";
// Vertical scroll distance (in viewport heights) spent on each project
const SCROLL_PER_PANEL = 1;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
// Rest on each project, then glide to the next one
const plateau = (f) => {
  const t = clamp((f - 0.2) / 0.6, 0, 1);
  return t * t * (3 - 2 * t);
};
const pad = (n) => String(n).padStart(2, "0");

/* ---------- CSS mockups built from real project info ---------- */
function MockBody({ variant, name }) {
  if (variant === "tourism") {
    return (
      <>
        <div className="mk-hero">
          <span className="mk-pill" />
          <strong className="mk-title">{name}</strong>
          <span className="mk-line mk-line--w70" />
          <span className="mk-line mk-line--w50" />
        </div>
        <div className="mk-cards">
          {[0, 1, 2].map((i) => (
            <span className="mk-card" key={i}>
              <span className="mk-thumb" />
              <span className="mk-line" />
              <span className="mk-line mk-line--w60" />
            </span>
          ))}
        </div>
      </>
    );
  }
  if (variant === "beauty") {
    return (
      <div className="mk-split">
        <div className="mk-col">
          <strong className="mk-title mk-title--serif">{name}</strong>
          <span className="mk-line mk-line--w80" />
          <span className="mk-line mk-line--w60" />
          <span className="mk-btn" />
        </div>
        <div className="mk-art">
          <span className="mk-orb mk-orb--1" />
          <span className="mk-orb mk-orb--2" />
        </div>
      </div>
    );
  }
  if (variant === "table") {
    return (
      <>
        <div className="mk-top">
          <strong className="mk-title mk-title--sm">{name}</strong>
          <span className="mk-btn" />
        </div>
        <div className="mk-table">
          {[0, 1, 2, 3, 4].map((r) => (
            <div className={r === 0 ? "mk-row mk-row--head" : "mk-row"} key={r}>
              <span className="mk-line" />
              <span className="mk-line mk-line--w70" />
              <span className="mk-line mk-line--w60" />
              <span className="mk-dot" />
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="mk-desk">
      <div className="mk-side">
        {[0, 1, 2, 3].map((r) => (
          <span className={r === 1 ? "mk-item is-on" : "mk-item"} key={r}>
            <span className="mk-dot" />
            <span className="mk-line" />
          </span>
        ))}
      </div>
      <div className="mk-form">
        <strong className="mk-title mk-title--sm">{name}</strong>
        {[0, 1, 2].map((f) => (
          <span className="mk-field" key={f}>
            <span className="mk-line mk-line--w30" />
            <span className="mk-input" />
          </span>
        ))}
        <span className="mk-actions">
          <span className="mk-btn" />
          <span className="mk-btn mk-btn--ghost" />
        </span>
      </div>
    </div>
  );
}

function Mockup({ project }) {
  const { mock, name, image } = project;
  return (
    <div className={`mock mock--${mock}`} aria-hidden={image ? undefined : true}>
      <div className="mock__bar">
        <i />
        <i />
        <i />
        <span>{name}</span>
      </div>
      <div className="mock__body">
        {image ? (
          <img src={image} alt={`Aperçu du projet ${name}`} />
        ) : (
          <MockBody variant={mock} name={name} />
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef([]);

  const count = PROJECTS.length + 1; // intro + projects
  const [simple, setSimple] = useState(
    () => typeof window !== "undefined" && window.matchMedia(SIMPLE_QUERY).matches
  );
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  // Switch between the sticky showcase and the simple swipe layout
  useEffect(() => {
    const query = window.matchMedia(SIMPLE_QUERY);
    const onChange = () => setSimple(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /* ---------- Sticky mode: vertical scroll drives the horizontal track ---------- */
  useEffect(() => {
    if (simple) return undefined;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return undefined;

    let vh = window.innerHeight;
    let distance = 0;
    let ticking = false;

    const update = () => {
      const total = section.offsetHeight - vh;
      const p = total > 0 ? clamp(-section.getBoundingClientRect().top / total, 0, 1) : 0;
      const seg = p * (count - 1);
      const i = Math.min(count - 2, Math.floor(seg));
      const pos = i + plateau(seg - i);

      track.style.transform = `translate3d(${-(pos / (count - 1)) * distance}px,0,0)`;
      stage.style.setProperty("--p", p.toFixed(4));

      panelRefs.current.forEach((panel, k) => {
        if (!panel) return;
        const o = k - pos;
        panel.style.setProperty("--o", o.toFixed(3));
        panel.style.setProperty("--a", Math.min(1, Math.abs(o)).toFixed(3));
      });

      setActive(Math.round(pos));
    };

    const measure = () => {
      vh = window.innerHeight;
      const vw = stage.clientWidth;
      stage.style.setProperty("--vw", `${vw}px`);
      stage.style.height = `${vh}px`;
      distance = Math.max(0, track.scrollWidth - vw);
      section.style.height = `${vh + (count - 1) * vh * SCROLL_PER_PANEL}px`;
      update();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(track);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
      section.style.height = "";
      stage.style.height = "";
      stage.style.removeProperty("--vw");
      stage.style.removeProperty("--p");
      track.style.transform = "";
      panelRefs.current.forEach((panel) => {
        panel?.style.removeProperty("--o");
        panel?.style.removeProperty("--a");
      });
    };
  }, [simple, count]);

  /* ---------- Simple mode: native swipe, progress follows scrollLeft ---------- */
  useEffect(() => {
    if (!simple) return undefined;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return undefined;

    let ticking = false;
    const update = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const p = max > 0 ? clamp(viewport.scrollLeft / max, 0, 1) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
      setActive(Math.round(p * (count - 1)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    update();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      stage.style.removeProperty("--p");
    };
  }, [simple, count]);

  /* ---------- Jump to a panel (dots, arrow keys, keyboard focus) ---------- */
  const goTo = useCallback(
    (k, behavior = "smooth") => {
      const index = clamp(k, 0, count - 1);
      if (simple) {
        const viewport = viewportRef.current;
        const panel = panelRefs.current[index];
        if (!viewport || !panel) return;
        viewport.scrollTo({
          left: panel.offsetLeft - (viewport.clientWidth - panel.offsetWidth) / 2,
          behavior,
        });
        return;
      }
      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const total = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (index / (count - 1)) * total, behavior });
    },
    [simple, count]
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeRef.current - 1);
    }
  };

  const classes = ["projects"];
  if (simple) classes.push("is-simple");

  return (
    <section
      ref={sectionRef}
      id="projets"
      className={classes.join(" ")}
      aria-labelledby="projects-title"
      onKeyDown={onKeyDown}
    >
      <div ref={stageRef} className="projects__stage">
        {/* top bar: label + navigation dots */}
        <div className="projects__bar">
          <span className="projects__label">03 / PROJETS</span>
          <div className="projects__dots" role="group" aria-label="Navigation des projets">
            {Array.from({ length: count }, (_, k) => (
              <button
                key={k}
                type="button"
                className={k === active ? "projects__dot is-on" : "projects__dot"}
                aria-label={k === 0 ? "Introduction" : `Projet ${k} : ${PROJECTS[k - 1].name}`}
                aria-current={k === active ? "true" : undefined}
                onClick={() => goTo(k)}
              />
            ))}
          </div>
        </div>

        {/* horizontal presentation */}
        <div
          ref={viewportRef}
          className="projects__viewport"
          tabIndex={simple ? 0 : undefined}
          role={simple ? "region" : undefined}
          aria-label={simple ? "Projets, faites glisser horizontalement" : undefined}
        >
          <div ref={trackRef} className="projects__track">
            {/* intro panel */}
            <div
              ref={(el) => (panelRefs.current[0] = el)}
              className={active === 0 ? "panel panel--intro is-active" : "panel panel--intro"}
            >
              <div className="panel__inner">
                <div className="intro">
                  <h2 id="projects-title" className="intro__title reveal" style={{ "--r": 0 }}>
                    Des <span className="intro__accent">idées</span> transformées en{" "}
                    <span className="intro__accent">expériences digitales.</span>
                  </h2>
                  <p className="intro__text reveal" style={{ "--r": 1 }}>
                    Découvrez une sélection de projets qui illustrent mon approche
                    du développement web, du design et de l’expérience utilisateur.
                  </p>
                  <span className="intro__hint reveal" style={{ "--r": 2 }}>
                    <span className="intro__hint-line" aria-hidden="true" />
                    {simple ? "Faites glisser" : "Faites défiler"}
                  </span>
                </div>
              </div>
            </div>

            {/* project panels */}
            {PROJECTS.map((project, i) => {
              const k = i + 1;
              return (
                <article
                  key={project.name}
                  ref={(el) => (panelRefs.current[k] = el)}
                  className={active === k ? "panel is-active" : "panel"}
                  aria-label={`Projet ${k} sur ${PROJECTS.length} : ${project.name}`}
                  onFocus={() => k !== activeRef.current && goTo(k, "auto")}
                >
                  <div className="panel__inner">
                    <div className="panel__preview">
                      <Mockup project={project} />
                    </div>

                    <div className="panel__info">
                      <span className="info__num reveal" style={{ "--r": 0 }}>
                        {pad(k)} / {pad(PROJECTS.length)}
                      </span>
                      <span className="info__type reveal" style={{ "--r": 1 }}>
                        {project.type}
                      </span>
                      <h3 className="info__name reveal" style={{ "--r": 2 }}>
                        {project.name}
                      </h3>
                      <p className="info__desc reveal" style={{ "--r": 3 }}>
                        {project.description}
                      </p>
                      {project.note && (
                        <p className="info__note reveal" style={{ "--r": 4 }}>
                          {project.note}
                        </p>
                      )}
                      <ul className="info__stack reveal" style={{ "--r": 5 }} aria-label="Technologies">
                        {project.stack.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                      {(project.demo || project.github) && (
                        <div className="info__links reveal" style={{ "--r": 6 }}>
                          {project.demo && (
                            <a
                              className="info__link info__link--primary"
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Voir le projet
                              <FiArrowUpRight aria-hidden="true" />
                            </a>
                          )}
                          {project.github && (
                            <a
                              className={
                                project.demo
                                  ? "info__link"
                                  : "info__link info__link--primary"
                              }
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaGithub aria-hidden="true" />
                              Voir sur GitHub
                              <FiArrowUpRight aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* thin Bordeaux progress + counter */}
        <div className="projects__footer">
          <span className="projects__progress" aria-hidden="true">
            <span className="projects__fill" />
          </span>
          <span className="projects__count" aria-live="polite">
            {pad(Math.max(active, 0))} / {pad(PROJECTS.length)}
          </span>
        </div>
      </div>
    </section>
  );
}