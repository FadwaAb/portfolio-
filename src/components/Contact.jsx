import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../CSS/Contact.css";

const EMAIL = "aabidinfadwa01@gmail.com";

// Configuration lives in .env (see .env.example). The EmailJS public key is
// designed to be used in the browser; no private key is ever needed here.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { name: "name", label: "Nom complet", type: "text", autoComplete: "name" },
  { name: "email", label: "Adresse e-mail", type: "email", autoComplete: "email" },
  { name: "subject", label: "Sujet", type: "text", autoComplete: "off" },
  { name: "message", label: "Votre message", type: "textarea", autoComplete: "off" },
];

const INITIAL = { name: "", email: "", subject: "", message: "" };

function validateField(name, raw) {
  const value = raw.trim();
  if (!value) {
    return {
      name: "Veuillez indiquer votre nom.",
      email: "Veuillez indiquer votre adresse e-mail.",
      subject: "Veuillez indiquer un sujet.",
      message: "Veuillez écrire votre message.",
    }[name];
  }
  if (name === "email" && !EMAIL_RE.test(value)) {
    return "Cette adresse e-mail n’est pas valide (exemple : nom@domaine.com).";
  }
  return "";
}

function validateAll(values) {
  const errors = {};
  FIELDS.forEach(({ name }) => {
    const message = validateField(name, values[name]);
    if (message) errors[name] = message;
  });
  return errors;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const sendingRef = useRef(false);

  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  // Reveal the section once, when it scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
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
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a stale error as soon as the field becomes valid
    if (errors[name] && !validateField(name, value)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const message = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return; // no duplicate submissions

    // Honeypot: real visitors never see or fill this field
    if (formRef.current?.elements.website?.value) return;

    const found = validateAll(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      setFeedback("");
      const first = FIELDS.find(({ name }) => found[name]);
      formRef.current?.elements[first.name]?.focus();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setFeedback(
        `L’envoi n’est pas encore configuré sur ce site. Votre message est conservé : vous pouvez m’écrire directement à ${EMAIL}.`
      );
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          reply_to: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );
      // Only reached when EmailJS confirmed the delivery request
      setValues(INITIAL);
      setErrors({});
      setStatus("success");
      setFeedback("Merci ! Votre message a bien été envoyé. Je vous répondrai très vite.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        `Le message n’a pas pu être envoyé${
          error?.text ? ` (${error.text})` : ""
        }. Votre texte est conservé : réessayez ou écrivez-moi à ${EMAIL}.`
      );
    } finally {
      sendingRef.current = false;
    }
  };

  const sending = status === "sending";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={visible ? "contact section is-visible" : "contact section"}
      aria-labelledby="contact-title"
    >
      <div className="contact__info">
        <span className="contact__label c-reveal" style={{ "--d": 0 }}>
          04 / CONTACT
        </span>
        <span className="contact__rule" aria-hidden="true" />

        <h2 id="contact-title" className="contact__title c-reveal" style={{ "--d": 1 }}>
          Parlons de votre prochain projet.
        </h2>
        <p className="contact__text c-reveal" style={{ "--d": 2 }}>
          Une idée, une collaboration ou une opportunité ? Je serais ravie
          d’échanger avec vous.
        </p>

        <a className="contact__email c-reveal" style={{ "--d": 3 }} href={`mailto:${EMAIL}`}>
          {EMAIL} <span aria-hidden="true">↗</span>
        </a>

        <div className="contact__socials c-reveal" style={{ "--d": 4 }}>
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

      <form
        ref={formRef}
        className="contact__panel"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={sending}
      >
        {FIELDS.map(({ name, label, type, autoComplete }) => {
          const id = `contact-${name}`;
          const error = errors[name];
          const shared = {
            id,
            name,
            value: values[name],
            onChange: handleChange,
            onBlur: handleBlur,
            placeholder: " ",
            required: true,
            autoComplete,
            disabled: sending,
            "aria-invalid": error ? "true" : "false",
            "aria-describedby": error ? `${id}-error` : undefined,
          };
          return (
            <div className="field" key={name}>
              <div className="field__box">
                {type === "textarea" ? (
                  <textarea {...shared} rows={6} />
                ) : (
                  <input {...shared} type={type} />
                )}
                <label htmlFor={id}>{label}</label>
              </div>
              <p className="field__error" id={`${id}-error`}>
                {error ? <><span aria-hidden="true">⚠ </span>{error}</> : null}
              </p>
            </div>
          );
        })}

        {/* honeypot (hidden from people and assistive tech) */}
        <div className="contact__hp" aria-hidden="true">
          <label htmlFor="contact-website">Ne pas remplir</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="contact__submit" disabled={sending}>
          {sending ? (
            <>
              <span className="contact__spinner" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer le message
              <span className="contact__arrow" aria-hidden="true">↗</span>
            </>
          )}
        </button>

        <div className="contact__status">
          {feedback && (
            <p
              className={`contact__notice contact__notice--${status}`}
              role={status === "error" ? "alert" : "status"}
            >
              <span aria-hidden="true">{status === "success" ? "✓ " : "⚠ "}</span>
              {feedback}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}