
import "../CSS/Projects.css";

const projects = [
  {
    name: "AMUDUX",
    type: "Plateforme touristique",
    description:
      "Projet de plateforme web dédiée à la découverte touristique du Maroc et à la préparation de voyages.",
    role: "Projet réalisé en équipe",
    stack: ["React", "Laravel", "MySQL"],
    image: "",
    demo: "",
    github: "https://github.com/sanafangach/touriste-projet",
  },
  {
    name: "Vydex",
    type: "Site vitrine e-commerce",
    description:
      "Projet de présentation de produits informatiques avec une interface pensée pour faciliter la découverte des produits.",
    role: "Préciser les fonctionnalités et contributions personnelles",
    stack: ["React", "JavaScript", "CSS"],
    image: "",
    demo: "",
    github: "",
  },
  {
    name: "Glow Beauty",
    type: "Projet web beauté",
    description:
      "Projet web orienté beauté, avec une attention particulière portée à la présentation visuelle.",
    role: "Préciser les fonctionnalités et contributions personnelles",
    stack: ["React", "CSS"],
    image: "",
    demo: "",
    github: "",
  },
];

export default function Projects() {
  return (
    <section className="projects section" id="projets">
      <div className="projects-heading">
        <span className="projects-eyebrow">03 / PORTFOLIO</span>
        <h2>Des projets concrets, des solutions réfléchies.</h2>
        <p>
          Une sélection de projets pour illustrer mon approche
          du développement web.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className="project-cover">
              {project.image ? (
                <img src={project.image} alt={`Aperçu de ${project.name}`} />
              ) : (
                <span className="project-placeholder">
                  PROJET / 0{index + 1}
                </span>
              )}
            </div>

            <div className="project-body">
              <span className="project-type">{project.type}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="project-role">{project.role}</p>

              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
