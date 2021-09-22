import React, { useEffect, useRef, useState } from "react";
import Footer from "@components/Footer";
import Image from "next/image";
import { faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Lottie from "lottie-react";
import animationEmail from "@animations/send-email.json";
import animationCode from "@animations/code-animation.json";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const Home = () => {
  const recaptchaRef = useRef(null);
  const [state, setState] = useState({
    email: "",
    nom: "",
    prenom: "",
    message: "",
    tel: "",
    captcha: false,
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoad, setContactLoad] = useState(false);

  useEffect(() => {
    const path = document.getElementsByTagName("path");
    for (let i = 0; i < path.length; i++) {
      path[i].setAttribute("alt", "icon");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.clearWaitingQueue();

    // si le Captcha n'est pas coché
    if (!state.captcha) {
      return toast("Veuillez valider le Captcha", { type: "error", position: "top-center", delay: 1000 });
    }

    setContactLoad(true);
    try {
      const { data } = await axios.post("/api/contact", state);
      setContactSuccess(true);
      setState({
        email: "",
        nom: "",
        prenom: "",
        message: "",
        tel: "",
        captcha: false,
      });
      // on remet à 0 le Captcha
      recaptchaRef.current && recaptchaRef.current.props.grecaptcha.reset();
    } catch (error) {
      Array.isArray(error.response.data)
        ? error.response.data.map(err => {
            toast(err, { type: "warning", position: "top-center", delay: 1000 });
          })
        : toast(error.response.data?.error || "Erreur serveur", { type: "error", position: "top-center", delay: 1000 });
    }
    setContactLoad(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                      <h1 className="display-1">
                        Création de <span className="color-blue">sites web</span> et <br />
                        <span className="color-blue">d'applications mobile.</span>
                        <span className="d-none d-sm-block">
                          {" "}
                          Agence digitale sur Paris, <span className="color-blue">Petites ou Moyennes entreprises, Associations</span> et{" "}
                          <span className="color-blue">Professions libérales.</span>
                        </span>
                      </h1>
                      <br />
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="col-xl-12">
            <h2 className="display-4">
              Besoin de <span className="color-bleu">créer</span> ou <span className="color-bleu"> de moderniser</span> votre identitée
              <span className="color-bleu"> digitale</span> ?<br />
            </h2>
          </div>
        </div>
      </section>

      {/* ####################################################################
                                   NOS SERVICES 
     #################################################################### */}
      <div id="services" className="section our-services">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Nos services</h3>
              <br />
              <br />
              <p>
                Nous travaillons avec nos clients comme une équipe. Notre méthode est définie en 4 grandes étapes : définir le besoin, conceptualiser
                votre demande, développer la solution avec les technologies modernes les plus adaptées afin de pouvoir réaliser un site durable et
                optimisé ainsi qu'une phase de tests pour corriger les éventuels problèmes avant la mise en production.
              </p>
            </div>
            <div className="col-md-6">
              <Lottie
                alt="Animation indiquant la bonne récéption du courriel"
                animationData={animationCode}
                autoPlay
                loop
                style={{ width: 400, margin: "0 auto" }}
              />
            </div>
          </div>
          <br />
          <br />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="text-center">
                UX/UI Design <FontAwesomeIcon alt="icon check" icon={faCheck} style={{ width: 25, color: "green", marginLeft: 5 }} />
              </h4>
              <br />
              <p className="text-center medium">
                Confiez-nous votre identité de marque ou votre logo. Notre agence web est spécialisée en Web Design et création graphique.
              </p>
              <br />
            </div>
            <div className="col-md-6">
              <h4 className="text-center">
                Développement <FontAwesomeIcon alt="icon check" icon={faCheck} style={{ width: 25, color: "green", marginLeft: 5 }} />
              </h4>
              <br />
              <p className="text-center">Nous répondons à tous les projets web (sites vitrines, e-commerces, applications mobiles).</p>
              <br />
            </div>
            <div className="col-md-6">
              <h4 className="text-center">
                E-commerce <FontAwesomeIcon alt="icon check" icon={faCheck} style={{ width: 25, color: "green", marginLeft: 5 }} />
              </h4>
              <br />
              <p className="text-center">
                Emailing, marketing automation, parcours digitaux innovants, nous mettons notre savoir faire pour augmenter vos ventes et accroître
                votre retour sur investissement.
              </p>
              <br />
            </div>
            <div className="col-md-6">
              <h4 className="text-center">
                Référencement <FontAwesomeIcon alt="icon check" icon={faCheck} style={{ width: 25, color: "green", marginLeft: 5 }} />
              </h4>
              <br />
              <p className="text-center">
                Que ce soit par le référencement naturel ou par Google Adwords afin d’être en première position, nous générons du trafic pour
                augmenter vos ventes.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* ####################################################################
                                   NOS COMPETENCES 
     #################################################################### */}
      <div id="competences" className="about-us section">
        <div className="container">
          <h3>Nos compétences</h3> <br />
          <br />
          <div className="row">
            <div className="col-lg-4">
              <div className="d-none d-sm-block left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <Image src="/assets/img/img-a.png" alt="person graphic" width={375} height={375} quality={25} />
              </div>
            </div>
            <div className="col-lg-8 col-xs-12 align-self-center">
              <div className="services">
                <div className="row">
                  <div className="gestion-service col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                      <div className="d-none d-sm-block icon">
                        <Image src="/assets/images/service-icon-01.png" alt="reporting" width={70} height={70} quality={100} />
                      </div>
                      <div className="right-text">
                        <h4>Base de données</h4>
                        <p className="d-block d-sm-none">
                          Le système de gestion de base de données est utilisé afin de stocker les données générales du site web. <br />
                          La couche logicielle de stockage est divisée en 2 grandes familles, les bases de données relationnelles et non
                          relationnelles. Cette difference est dûe à l'arrivée de MongoDB qui est aujourd'hui un acteur important. <br />
                          Nous avons ensuite les bases de données relationnelles avec MySQL et MariaDB qui sont des acteurs principaux notamment pour
                          les sites WordPress.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gestion-service col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                      <div className="d-none d-sm-block icon">
                        <Image
                          src="/assets/images/service-icon-02.png"
                          alt="service site web/application mobile"
                          width={70}
                          height={70}
                          quality={100}
                        />
                      </div>
                      <div className="right-text">
                        <h4>Création Site web / Application mobile</h4>
                        <p className="d-block d-sm-none">
                          La création de sites web est totalement personnalisée. <br />
                          Selon votre objectif, un expert en markerting vous conseillera et notre expert en e-business vous accompagnera pour les
                          atteindre.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gestion-service col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                      <div className="d-none d-sm-block icon">
                        <Image src="/assets/images/service-icon-04.png" alt="service seo" width={70} height={70} quality={100} />
                      </div>
                      <div className="right-text">
                        <h4>SEO</h4>
                        <p className="d-block d-sm-none">
                          On l’appelle aussi référencement naturel.
                          <br />
                          Notre objectif est d’améliorer la visibilité de votre site sur les moteurs de recherche. Le but est de faire se rencontrer
                          les internautes intéressés par vos produits / services ou du contenu informatif.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gestion-service col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                      <div className="d-none d-sm-block icon">
                        <Image src="/assets/images/service-icon-03.png" alt="service hébergement" width={70} height={70} quality={100} />
                      </div>
                      <div className="right-text">
                        <h4>Hébergement</h4>
                        <p className="d-block d-sm-none">
                          L'hébergement vous permet de visualiser et de stocker les informations de votre site. Des solutions existes : Firebase,
                          Amazon Web Service, IONIO et 1&1 qui vous permets à moindre coup d'héberger votre site.
                          <br />
                          Le site web peut être hébergé sur 2 types d'hébergements, le serveur mutualisé et individuel.
                          <br />
                          L'avantage du serveur mutualisé vous permets d'avoir un coup réduit sur le prix mais la puissance est relativement réduite.
                          Une solution idéale pour les sites vitrines.
                          <br />
                          Pour les serveurs induividuels, vous devez tout personnaliser. C'est une solution plus couteuse car elle doit être
                          configurée par un professionel.
                          <br />
                          Le choix du serveur est très important et mérite réflexion en fonction de vos besoins et du traffic internet qu'il va
                          engendrer.
                          <br />
                          Notre objectif est de déterminer la solution la plus optimale entre le prix et la puissance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gestion-service offset-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.3s">
                      <div className="d-none d-sm-block icon">
                        <Image src="/assets/images/service-icon-03.png" alt="service gestion de vos réseaux" width={70} height={70} quality={100} />
                      </div>
                      <div className="right-text">
                        <h4>Gestion de vos réseaux sociaux</h4>
                        <p className="d-block d-sm-none">
                          Avant de communiquer sur vos réseaux, notre Community Manager analysera votre marché et vos concurrents.
                          <br />
                          Ce benchmark nous permet de mieux connaitre votre environnement et d’en déduire les « bonnes pratiques » de votre secteur.
                          <br />
                          Nous identifions vos cibles tout en plaçant des objectifs de fréquentation et d’engagement, puis nous déterminons ensemble,
                          les moyens les plus efficaces de les atteindre. Cette étape est indispensable pour vous garantir des résultats positifs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ####################################################################
                                   NOS GARANTIES 
     #################################################################### */}
      <div id="about" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Nos garanties</h3> <br />
              <br />
              <div className="row nos-garanties">
                <div className="col-xl-12 row">
                  <h4>Une équipe de développeurs et d'experts en gestion de projet</h4>
                  <p className="col-xl-12">
                    Nous avons décidé de lancer notre agence pour fournir une solution de qualité en fonction de votre besoin. Nos compétences en
                    développement informatique nous permettent d'utiliser des technologies modernes afin de vous garantir les meilleurs scores de
                    performances (référencement, rapidité de chargement).
                  </p>
                </div>

                <div className="col-xl-12 row">
                  <h4>Mise en place d'une procédure de reprise d'activité d'urgence</h4>
                  <p className="col-xl-12">
                    Tout professionnel doit pouvoir avoir un système d'information irréprochable. Nous accompagnons nos clients peu importe la
                    situation. <br />
                    Nos infrastructures sont basées en France, avec un système de sauvegarde régulier afin de diminuer le risque de perte de données.
                  </p>
                </div>

                <div className="col-xl-12 row">
                  <h4>Confidentialité pour les projets les plus pointus</h4>
                  <p className="col-xl-12">
                    Formés en tant que chef de projet, nous avons appris à mettre en place pour les clients le souhaitant, un contrat de
                    confidentialité. Nous travaillons avec un avocat pour la rédaction et le conseil.
                  </p>
                </div>

                <div className="col-xl-12 row">
                  <h4>Un design unique pour chaque projet</h4>
                  <p className="col-xl-12">
                    Nous avons appris par expérience que UI/UX est le coeur de notre travail Etudier l'utilisateur type ainsi que la création de
                    d'interface avec un design unique, simple et ergonomique.
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* ####################################################################
                                   QUI SOMMES-NOUS ?
     #################################################################### */}
      <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <h3>Qui sommes-nous ?</h3> <br />
                <br />
              </div>
            </div>
          </div>
          <hr />
          <div className="row justify-content-lg-center">
            <div className="col-lg-4 col-sm-6">
              <a>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.4s">
                  <div className="hidden-content personnas">
                    <h6>Allan BUSI</h6>
                    <p>Expert en développement web et chef de projet</p>
                  </div>
                  <div className="showed-content">
                    <Image src="/assets/img/allan.png" alt="allan busi" width={100} height={100} quality={100} />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
                  <div className="hidden-content personnas">
                    <h6>Adrien MAILLARD</h6>
                    <p>Expert en développement web & mobile</p>
                  </div>
                  <div className="showed-content">
                    <Image src="/assets/img/adrien.png" alt="adrien maillard" width={100} height={100} quality={100} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ####################################################################
                                   CONTACT 
     #################################################################### */}
      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <div className="section-heading nous-sommes-a-lecoute">
                <h3>Nous sommes à l'écoute de vos besoins</h3>
                <div className="phone-info">
                  <h5>
                    Allan BUSI :
                    <span>
                      <FontAwesomeIcon icon={faPhone} alt="icon telephone" style={{ margin: "0 5px 0 25px", width: 20, color: "white" }} />{" "}
                      <a href="tel:0771023973">07 71 02 39 73</a>
                    </span>
                  </h5>
                </div>

                <div className="phone-info">
                  <h5>
                    Adrien MAILLARD :
                    <span>
                      <FontAwesomeIcon icon={faPhone} alt="icon telephone" style={{ margin: "0 5px 0 25px", width: 20, color: "white" }} />{" "}
                      <a href="tel:0627180907">06 27 18 09 07</a>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" onSubmit={onSubmit}>
                {!contactSuccess && (
                  <>
                    <div style={{ textAlign: "end" }}>
                      <span>*</span> : Champs requis
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <fieldset>
                          <label>
                            Prénom <span>*</span>
                          </label>
                          <input
                            style={{ borderRadius: 5 }}
                            onChange={onChange}
                            type="text"
                            value={state.prenom}
                            name="prenom"
                            id="surname"
                            placeholder="Votre prénom"
                            autoComplete="on"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-6">
                        <fieldset>
                          <label>
                            Nom <span>*</span>
                          </label>
                          <input
                            style={{ borderRadius: 5 }}
                            onChange={onChange}
                            type="text"
                            value={state.nom}
                            name="nom"
                            id="name"
                            placeholder="Votre nom"
                            autoComplete="on"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <label>
                            Courriel <span>*</span>
                          </label>
                          <input
                            style={{ borderRadius: 5 }}
                            onChange={onChange}
                            type="email"
                            value={state.email}
                            name="email"
                            id="email"
                            pattern="[^ @]*@[^ @]*"
                            placeholder="Votre courriel"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <label>Téléphone portable</label>
                          <input
                            style={{ borderRadius: 5 }}
                            onChange={onChange}
                            type="number"
                            onKeyPress={e => {
                              if (state.tel.length === 10) {
                                e.preventDefault();
                              }
                            }}
                            value={state.tel}
                            name="tel"
                            id="tel"
                            placeholder="0xxxxxxxxx"
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <label>
                            Message <span>*</span>
                          </label>
                          <div style={{ marginBottom: 5, textAlign: "end" }}>
                            <small>{state.message.length} /4000</small>
                          </div>
                          <textarea
                            style={{ borderRadius: 5 }}
                            onChange={onChange}
                            name="message"
                            value={state.message}
                            className="form-control"
                            id="message"
                            maxLength={4000}
                            placeholder="Votre message"
                            required
                          ></textarea>
                        </fieldset>
                      </div>

                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA}
                        onChange={e => {
                          setState(prev => ({ ...prev, captcha: true }));
                        }}
                      />
                      {!state.captcha && <div className="captcha-validation">Veuillez valider le Captcha</div>}
                    </div>
                  </>
                )}

                <div className="col-lg-12">
                  {contactSuccess ? (
                    <Lottie
                      alt="Animation indiquant la bonne récéption du courriel"
                      animationData={animationEmail}
                      autoPlay
                      loop={false}
                      style={{ width: 100, margin: "0 auto" }}
                    />
                  ) : (
                    <div style={{ textAlign: "center", marginTop: 25 }}>
                      {contactLoad ? (
                        <Loader type="TailSpin" color="#ff3440" height={50} width={50} />
                      ) : (
                        <button
                          disabled={!state.captcha}
                          type="submit"
                          id="form-submit"
                          className="main-button"
                          style={{
                            width: "50%",
                            borderRadius: 5,
                            fontWeight: "bold",
                            opacity: state.captcha ? 1 : 0.5,
                            cursor: state.captcha ? "pointer" : "not-allowed",
                          }}
                        >
                          Envoyer
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="contact-dec">
                  <img src="assets/images/contact-decoration.png" alt="contact décoration" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
