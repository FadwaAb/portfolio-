import React from "react";
import "../CSS/Header.css";
import { FaMapMarkerAlt, FaCircle } from "react-icons/fa";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineFileDownload } from "react-icons/md"; // 👈 tbedlna l'icône
import logo1 from "../assets/logo1.png";
import cvFile from "../assets/pdf/Aabidin Fadwa CV.pdf";

const Header = () => {
  return (
    <header className="header">
      {/* ===== Top Banner ===== */}
      <div className="top-banner">
        <div className="banner-left">
          <span className="sparkle">✦</span>
          <span className="banner-text">Développer, apprendre et évoluer chaque jour..</span>
        </div>

        <div className="banner-center">
          <span className="banner-item">
            <FaMapMarkerAlt className="icon" />
            Tiznit, Morocco
          </span>
          <span className="banner-item">
            <FaCircle className="icon dot" />
            Apprendre, créer et évoluer.
          </span>
        </div>

        <div className="banner-right">
          <a href="https://github.com/FadwaAb" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/fadwa-aabidin-621074390" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:https://mail.google.com/mail/u/1/#inbox" className="social-btn" aria-label="Email">
            <MdOutlineEmail />
          </a>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <a href="#home" className="logo">
          <img src={logo1} alt="Logo" className="logo-img" />
        </a>

        <ul className="nav-links">
          <li>
            <a href="#home" className="nav-link active">
              Accueil
            </a>
          </li>
          <li><a href="#about" className="nav-link">À propos</a></li>
          <li><a href="#skills" className="nav-link">Compétences</a></li>
          <li><a href="#projects" className="nav-link">Projets</a></li>
          <li><a href="#journey" className="nav-link">Mon Parcours</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        {/* 👇 Le bouton dial download CV */}
        <a href={cvFile} download="aabidin fadwa CV.pdf" className="cta-btn">
          Télécharger CV
          <MdOutlineFileDownload className="arrow" />
        </a>
      </nav>
    </header>
  );
};

export default Header;