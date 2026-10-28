
import "../CSS/Workflow.css";

const steps = [
  {
    number: "01",
    title: "Comprendre",
    description: "Identifier les besoins et définir les objectifs du projet.",
  },
  {
    number: "02",
    title: "Concevoir",
    description: "Organiser les fonctionnalités et réfléchir à l'expérience utilisateur.",
  },
  {
    number: "03",
    title: "Développer",
    description: "Construire l'interface et la logique applicative.",
  },
  {
    number: "04",
    title: "Améliorer",
    description: "Tester le fonctionnement et corriger les problèmes identifiés.",
  },
];

export default function Workflow() {
  return (
    <section className="workflow section">
      <div className="workflow-heading">
        <span className="workflow-eyebrow">04 / APPROCHE</span>
        <h2>De l'idée à la réalisation.</h2>
      </div>

      <div className="workflow-grid">
        {steps.map((step) => (
          <article className="workflow-step" key={step.number}>
            <span className="workflow-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
