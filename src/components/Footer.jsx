
import "../CSS/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="#accueil">Fadwa Aabidin</a>
        <p>Développeuse Web Full Stack</p>
      </div>

      <p className="footer-signature">
        Made by Fadwa. Built with passion.
      </p>

      <a className="footer-top" href="#accueil">
        Retour en haut ↑
      </a>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Fadwa Aabidin</span>
        <span>Conçu avec soin.</span>
      </div>
    </footer>
  );
}
