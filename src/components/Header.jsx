import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiMail,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import "../CSS/Header.css";
import logo from "../assets/logo.png";

const CV_FILE = "/Aabidin-Fadwa-CV.pdf"; // file must be in /public
const CV_LABEL = "Télécharger mon CV";

const links = [
  { id: "accueil", label: "Accueil", Icon: FiHome },
  { id: "apropos", label: "À propos", Icon: FiUser },
  { id: "competences", label: "Compétences", Icon: FiCode },
  { id: "projets", label: "Projets", Icon: FiFolder },
  { id: "contact", label: "Contact", Icon: FiMail },
];

// Put the notch under the centre of the active icon
function placeNotch(header) {
  const icon = header.querySelector(".nav-item.is-active .nav-item__icon");
  if (!icon || icon.offsetParent === null) return;
  const h = header.getBoundingClientRect();
  const i = icon.getBoundingClientRect();
  header.style.setProperty("--notch-x", `${i.left - h.left + i.width / 2}px`);
}

function NavItem({ id, label, Icon, active, onNavigate }) {
  return (
    <a
      href={`#${id}`}
      title={label}
      className={active ? "nav-item is-active" : "nav-item"}
      aria-current={active ? "page" : undefined}
      onClick={(e) => onNavigate(e, id)}
    >
      <span className="nav-item__icon">
        <Icon aria-hidden="true" />
      </span>
      <span className="nav-item__label">{label}</span>
      <span className="nav-item__dot" aria-hidden="true" />
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Icons only once the page has been scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the notch under the active icon
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const place = () => placeNotch(header);
    place();
    window.addEventListener("resize", place);
    if (document.fonts?.ready) document.fonts.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // While the bar shrinks or grows on scroll, keep the notch glued to the active icon
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    header.dataset.resizing = "true";
    const start = performance.now();
    let raf;
    const tick = (now) => {
      placeNotch(header);
      if (now - start < 750) {
        raf = requestAnimationFrame(tick);
      } else {
        delete header.dataset.resizing;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      delete header.dataset.resizing;
    };
  }, [scrolled]);

  // Keep the active item in sync with the visible section
  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavigate = (e, id) => {
    const target = document.getElementById(id);
    setMenuOpen(false);
    if (!target) return;
    e.preventDefault();
    setActive(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="header-wrap">
      <header
        className={scrolled ? "site-header is-scrolled" : "site-header"}
        ref={headerRef}
      >
        <span className="site-header__shadow" aria-hidden="true" />
        <span className="site-header__glass" aria-hidden="true" />
        <a
          className="site-photo"
          href="#accueil"
          aria-label="Accueil"
          onClick={(e) => handleNavigate(e, "accueil")}
        >
          <img src={logo} alt="Logo Fadwa Aabidin" />
        </a>

        <nav
          id="main-navigation"
          className={menuOpen ? "site-nav is-open" : "site-nav"}
          aria-label="Navigation principale"
        >
          {links.map((link) => (
            <NavItem
              key={link.id}
              {...link}
              active={active === link.id}
              onNavigate={handleNavigate}
            />
          ))}

          <div className="site-nav__extras">
            <a
              className="social-btn"
              href="https://github.com/FadwaAb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              className="social-btn"
              href="https://www.linkedin.com/in/fadwa-aabidin-621074390"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a
              className="cv-button"
              href={CV_FILE}
              download={CV_LABEL}
              aria-label={`Télécharger ${CV_LABEL}`}
            >
              <FiFileText className="cv-button__doc" aria-hidden="true" />
              <span>{CV_LABEL}</span>
              <FiDownload className="cv-button__dl" aria-hidden="true" />
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? "burger is-open" : "burger"} />
        </button>
      </header>
    </div>
  );
}