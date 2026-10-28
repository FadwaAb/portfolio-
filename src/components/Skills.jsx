
import "../CSS/Skills.css";

const groups = [
  {
    number: "01",
    title: "Frontend",
    description: "Créer des interfaces web interactives et responsives.",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    number: "02",
    title: "Backend",
    description: "Développer la logique applicative et les services web.",
    items: ["PHP", "Laravel", "API REST"],
  },
  {
    number: "03",
    title: "Base de données",
    description: "Organiser et manipuler les données des applications.",
    items: ["MySQL"],
  },
  {
    number: "04",
    title: "Outils",
    description: "Gérer le code et faciliter le développement.",
    items: ["Git", "GitHub", "Postman"],
  },
];

export default function Skills() {
  return (
    <section className="skills section" id="competences">
      <div className="skills-heading">
        <span className="skills-eyebrow">02 / COMPÉTENCES</span>
        <h2>Les outils derrière mes projets.</h2>
        <p>
          Des technologies complémentaires pour concevoir et développer
          des applications web.
        </p>
      </div>

      <div className="skills-grid">
        {groups.map((group) => (
          <article className="skill-card" key={group.number}>
            <span className="skill-number">{group.number}</span>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
