import "../styles/privacyPolicy.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  return (
    <>
      <Header />
      <div class="container-privacy_policy">
        <h1>
          Politique de Confidentialité de l'application{" "}
          <strong>Billet de Sortie</strong>
        </h1>
        <p>
          <em>Dernière mise à jour : [08/09/2024]</em>
        </p>

        <h2>1. Introduction</h2>
        <p>
          L'application <strong>Billet de Sortie</strong> a été développée par
          un groupe d'étudiants dans le cadre d'un projet de gestion des sorties
          des jeunes sur le campus. Cette politique de confidentialité décrit
          comment nous collectons, utilisons, partageons et protégeons les
          informations personnelles des utilisateurs.
        </p>

        <h2>2. Données collectées</h2>
        <ul>
          <li>
            <strong>Informations d'identification</strong> : ID étudiant.
          </li>
          <li>
            <strong>Informations relatives aux sorties</strong> : Heure de
            départ, raison de la sortie, et heure de retour.
          </li>
          <li>
            <strong>Historique des sorties</strong> : Enregistrement des sorties
            et retours précédents.
          </li>
        </ul>

        <h2>3. Utilisation des données</h2>
        <p>Les informations collectées sont utilisées aux fins suivantes :</p>
        <ul>
          <li>
            <strong>Suivi des sorties</strong> : Surveiller les allées et venues
            des étudiants.
          </li>
          <li>
            <strong>Notifications et rappels</strong> : Envoyer des rappels pour
            l'enregistrement des retours.
          </li>
          <li>
            <strong>Consultation administrative</strong> : L'administration peut
            consulter les informations.
          </li>
        </ul>

        <h2>4. Partage des données</h2>
        <p>
          Les données sont partagées uniquement avec{" "}
          <strong>l'administration du campus</strong>. Aucune vente ou partage
          avec des tiers n'est effectué à des fins commerciales.
        </p>

        <h2>5. Protection des données</h2>
        <p>
          Nous mettons en place les mesures de sécurité suivantes pour protéger
          les informations :
        </p>
        <ul>
          <li>
            <strong>Authentification sécurisée</strong> via un identifiant
            unique.
          </li>
          <li>
            <strong>Stockage des données sécurisé</strong> dans une base de
            données protégée.
          </li>
        </ul>

        <h2>6. Droits des utilisateurs</h2>
        <p>Vous avez les droits suivants :</p>
        <ul>
          <li>
            <strong>Droit d'accès</strong> à vos informations.
          </li>
          <li>
            <strong>Droit de rectification</strong> des erreurs.
          </li>
          <li>
            <strong>Droit à l'effacement</strong>, sous certaines conditions
            légales.
          </li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:[Contact Email]">
            [info.madagasikara@passerellesnumeriques.org]
          </a>
          .
        </p>

        <h2>7. Cookies et technologies similaires</h2>
        <p>
          L'application n'utilise pas de cookies ni de technologies similaires.
        </p>

        <h2>8. Transfert des données</h2>
        <p>
          Les données ne sont pas transférées en dehors de l'organisation sans
          garanties adéquates.
        </p>

        <h2>9. Durée de conservation des données</h2>
        <p>
          Les données sont conservées pendant une année à des fins de gestion
          interne.
        </p>

        <h2>10. Modifications de la politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique. En cas de
          changement, une notification sera envoyée via l'application.
        </p>

        <h2>11. Contact</h2>
        <p>
          Pour toute question, veuillez nous contacter à{" "}
          <a href="mailto:[Contact Email]">
            [info.madagasikara@passerellesnumeriques.org]
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
