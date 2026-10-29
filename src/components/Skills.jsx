import { useEffect, useRef, useState } from "react";
import { FaCss3Alt, FaGithub, FaHtml5 } from "react-icons/fa";
import {
  FiColumns,
  FiDatabase,
  FiGlobe,
  FiRefreshCw,
  FiShield,
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
import "../CSS/Skills.css";

/*
  Only the technologies listed in the profile. Items without an official logo
  (Sanctum, REST API, NoSQL, Agile / Scrum, Kanban) use a simple line icon.
*/
const FRONT = {
  number: "01",
  title: "Front-End",
  items: [
    { name: "HTML5", Icon: FaHtml5 },
    { name: "CSS3", Icon: FaCss3Alt },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "React.js", Icon: SiReact },
    { name: "React Router", Icon: SiReactrouter },
  ],
};

const BACK = {
  number: "02",
  title: "Back-End & Database",
  items: [
    { name: "PHP", Icon: SiPhp },
    { name: "Laravel", Icon: SiLaravel },
    { name: "Laravel Sanctum", Icon: FiShield },
    { name: "REST API", Icon: FiGlobe },
    { name: "MySQL", Icon: SiMysql },
    { name: "NoSQL", Icon: FiDatabase },
  ],
};

const TOOLS = {
  number: "03",
  title: "Tools & Workflow",
  items: [
    { name: "Git", Icon: SiGit },
    { name: "GitHub", Icon: FaGithub },
    { name: "VS Code", Icon: VscVscode },
    { name: "Postman", Icon: SiPostman },
    { name: "Figma", Icon: SiFigma },
    { name: "Jira", Icon: SiJira },
    { name: "Agile / Scrum", Icon: FiRefreshCw },
    { name: "Kanban", Icon: FiColumns },
  ],
};

/*
  The group sequence is repeated `copies` times inside the track and the track
  moves by exactly one copy (-100% / copies), so the loop never jumps.
  Row 2 is shorter, so it repeats one more time to cover very wide screens.
*/
const ROWS = [
  { id: "row-1", groups: [FRONT, BACK], copies: 3, duration: 56, reverse: false },
  { id: "row-2", groups: [TOOLS], copies: 4, duration: 42, reverse: true },
];

// "hl" = serif-italic Bordeaux highlight
const HEADING = [
  { w: "Les" },
  { w: "technologies" },
  { w: "qui" },
  { w: "donnent" },
  { w: "vie", hl: true },
  { w: "à" },
  { w: "mes" },
  { w: "idées.", hl: true },
];

function Group({ groups, copy, rowIndex }) {
  let counter = 0;
  return (
    <ul
      className="skills-group"
      aria-hidden={copy > 0}
      aria-label={copy === 0 ? "Technologies et outils" : undefined}
    >
      {groups.map(({ number, title, items }, g) => (
        <li className="skills-cat-wrap" key={title}>
          <div className="skills-cat" aria-hidden="true" style={{ "--d": `${500 + (rowIndex * 2 + g) * 220}ms` }}>
            <span className="skills-cat__num">{number}</span>
            <span className="skills-cat__title">{title}</span>
          </div>
          <ul className="skills-items">
            {items.map(({ name, Icon }) => {
              const i = counter++;
              return (
                <li
                  className="skills-item"
                  key={name}
                  style={{ "--i": i, "--k": i % 3 }}
                >
                  <div className="skills-item__float">
                    <span className="skills-item__tile" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="skills-item__name">{name}</span>
                    <span className="skills-sr">{title}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);

  // Reveal once; only run the marquees while the section is on screen
  useEffect(() => {
    const node = ref.current;
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

  const classes = ["skills"];
  if (revealed) classes.push("is-revealed");
  if (inView) classes.push("is-inview");

  return (
    <section
      ref={ref}
      id="competences"
      className={classes.join(" ")}
      aria-labelledby="skills-title"
    >
      {/* very subtle decorative elements */}
      <div className="skills__deco" aria-hidden="true">
        <span className="skills__ring" />
        <span className="skills__dot skills__dot--1" />
        <span className="skills__dot skills__dot--2" />
        <span className="skills__dot skills__dot--3" />
        <span className="skills__dot skills__dot--4" />
      </div>

      <header className="skills__head">
        <div className="skills__headline">
          <span className="skills__label skills__fade" style={{ "--d": "0ms" }}>
            02 / COMPÉTENCES
          </span>

          <h2 id="skills-title" className="skills__title">
            {HEADING.map(({ w, hl }, i) => (
              <span key={w}>
                <span className={hl ? "skills__word skills__word--hl" : "skills__word"}>
                  <span className="skills__word-in" style={{ "--i": i }}>
                    {w}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h2>

          <span className="skills__rule" aria-hidden="true" />
        </div>

        <p className="skills__intro skills__fade" style={{ "--d": "700ms" }}>
          Du Front-End au Back-End, les outils que j’utilise pour transformer
          des idées en expériences web modernes.
        </p>
      </header>

      <div className="skills__showcase">
        {ROWS.map(({ id, groups, copies, duration, reverse }, rowIndex) => (
          <div
            key={id}
            className={reverse ? "skills-row skills-row--reverse" : "skills-row"}
            style={{ "--dur": `${duration}s`, "--copies": copies }}
          >
            <div className="skills-track">
              {Array.from({ length: copies }, (_, copy) => (
                <Group key={copy} groups={groups} copy={copy} rowIndex={rowIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}