
import "../CSS/About.css";

export default function About() {
  return (
    <section className="about section" id="apropos">
      <div className="about-heading">
        <span className="about-eyebrow">01 / À PROPOS</span>
        <h2>Derrière chaque projet, une envie d'apprendre.</h2>
      </div>

      <div className="about-content">
        <p className="about-intro">
          Je suis Fadwa Aabidin, développeuse Web Full Stack
          récemment diplômée.
        </p>

        <p>
          Je m'intéresse à la création d'applications web, de la conception
          des interfaces à la logique backend. J'aime transformer une idée
          en solution concrète, comprendre les problèmes et améliorer
          progressivement la qualité de mon code.
        </p>

        <div className="about-cards">
          <article className="about-card">
            <span>01</span>
            <h3>Mon approche</h3>
            <p>
              Comprendre le besoin, organiser le travail et développer
              une solution claire, utile et facile à maintenir.
            </p>
          </article>

          <article className="about-card">
            <span>02</span>
            <h3>Mon objectif</h3>
            <p>
              Consolider mes compétences, participer à des projets concrets
              et évoluer dans le développement web.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
