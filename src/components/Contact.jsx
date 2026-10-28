
import "../CSS/Contact.css";

const EMAIL = "ton-email@example.com";

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `Contact portfolio — ${data.get("name")}`
    );
    const body = encodeURIComponent(
      `Nom : ${data.get("name")}\n` +
      `Email : ${data.get("email")}\n\n` +
      `Message :\n${data.get("message")}`
    );

    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact-info">
        <span className="contact-eyebrow">05 / CONTACT</span>
        <h2>Un projet en tête ? Parlons-en.</h2>
        <p>
          Je suis ouverte aux opportunités professionnelles,
          aux collaborations et aux projets web.
        </p>

        <a className="contact-email" href={`mailto:${EMAIL}`}>
          {EMAIL} ↗
        </a>

        <div className="contact-socials">
          <a href="https://github.com/FadwaAb" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/fadwa-aabidin-621074390"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Nom</label>
        <input id="contact-name" name="name" required />

        <label htmlFor="contact-email">Adresse e-mail</label>
        <input id="contact-email" name="email" type="email" required />

        <label htmlFor="contact-message">Votre message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          required
        />

        <button type="submit">Préparer mon message ↗</button>
        <p className="contact-note">
          L'envoi ouvre votre application e-mail. Aucun message
          n'est envoyé automatiquement depuis ce site.
        </p>
      </form>
    </section>
  );
}
