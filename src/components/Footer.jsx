import React from "react";
import "../styles/Footer.css";
import Myphone from "../assets/Images/phone.png";
import MyEmail from "../assets/Images/Mail.png";
import MyPN from "../assets/Images/p.png";
import myFacebook from "../assets/Images/fb.png";
import myLinkedin from "../assets/Images/linkedin.png";
import myLogo from "../assets/Images/Logo.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <footer className="footer">
      <div className="footer__section">
        <h3 className="footer__section1">Contact</h3>
        <p className="footer__contact-item">
          <img src={Myphone} alt="Phone" className="footer__icon" />
          <p> 020 85 000 26 </p>
        </p>
        <p className="footer__contact-item">
          <img src={MyEmail} alt="Email" className="footer__icon" />
          <a href="info.madagasikara@passerellesnumeriques.org">
            info.madagasikara@passerellesnumeriques.org{" "}
          </a>
        </p>
        <div className="footer__logo-container">
          <a href="https://www.bing.com/ck/a?!&&p=e3bfbdd251822cdaJmltdHM9MTcyNTc1MzYwMCZpZ3VpZD0wZTRlMDhmOS04M2Q2LTZlNjctMmFkYS0xY2QxODJkNjZmZTYmaW5zaWQ9NTE4MA&ptn=3&ver=2&hsh=3&fclid=0e4e08f9-83d6-6e67-2ada-1cd182d66fe6&psq=passerelles+num%c3%a9riques+madagascar+siteweb&u=a1aHR0cHM6Ly93d3cucGFzc2VyZWxsZXNudW1lcmlxdWVzLm9yZy9mci9ub3MtYWN0aW9ucy9tYWRhZ2FzY2FyLw&ntb=1">
            <img
              src={MyPN}
              alt="Passerelles numériques"
              width={"90"}
              height={"90"}
            />
          </a>
        </div>
      </div>

      <div className="footer__section">
        <h3>A propos</h3>
        <ul className="footer__links">
          <li>
            <NavLink to="/privacy-policy">Politique de confidentialité</NavLink>
          </li>
          <li>
            <NavLink to="/Fonctionnement">
              Fonctionnement de l'application
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="footer__section">
        <h3>Nous suivre</h3>
        <div className="footer__social-icons">
          <a href="https://www.bing.com/ck/a?!&&p=e3bfbdd251822cdaJmltdHM9MTcyNTc1MzYwMCZpZ3VpZD0wZTRlMDhmOS04M2Q2LTZlNjctMmFkYS0xY2QxODJkNjZmZTYmaW5zaWQ9NTE4MA&ptn=3&ver=2&hsh=3&fclid=0e4e08f9-83d6-6e67-2ada-1cd182d66fe6&psq=passerelles+num%c3%a9riques+madagascar+siteweb&u=a1aHR0cHM6Ly93d3cucGFzc2VyZWxsZXNudW1lcmlxdWVzLm9yZy9mci9ub3MtYWN0aW9ucy9tYWRhZ2FzY2FyLw&ntb=1">
            <img src={MyPN} alt="Passerelles numériques" />
          </a>
          <a href="https://www.bing.com/ck/a?!&&p=2d1307dcf8903d8bJmltdHM9MTcyNTc1MzYwMCZpZ3VpZD0wZTRlMDhmOS04M2Q2LTZlNjctMmFkYS0xY2QxODJkNjZmZTYmaW5zaWQ9NTE5Mw&ptn=3&ver=2&hsh=3&fclid=0e4e08f9-83d6-6e67-2ada-1cd182d66fe6&psq=passerelles+num%c3%a9riques+madagascar+fb&u=a1aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3Bhc3NlcmVsbGVzLm51bWVyaXF1ZXMubWFkYWdhc2lrYXJhLw&ntb=1">
            <img src={myFacebook} alt="Facebook" />
          </a>
          <a href="https://www.bing.com/ck/a?!&&p=148817b14dc0e550JmltdHM9MTcyNTc1MzYwMCZpZ3VpZD0wZTRlMDhmOS04M2Q2LTZlNjctMmFkYS0xY2QxODJkNjZmZTYmaW5zaWQ9NTE3Ng&ptn=3&ver=2&hsh=3&fclid=0e4e08f9-83d6-6e67-2ada-1cd182d66fe6&psq=passerelles+num%c3%a9riques+madagascar+linkedin&u=a1aHR0cHM6Ly9tZy5saW5rZWRpbi5jb20vc2hvd2Nhc2UvcGFzc2VyZWxsZXMtbnVtJUMzJUE5cmlxdWVzLW1hZGFnYXNpa2FyYS8&ntb=1">
            <img src={myLinkedin} alt="LinkedIn" />
          </a>
        </div>
        <div className="footer__logo-container">
          <img
            src={myLogo}
            alt="Billet de Sortie Logo"
            className="footer__logo"
          />
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; DevExplorer@PasserellesNumeriques.org. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
