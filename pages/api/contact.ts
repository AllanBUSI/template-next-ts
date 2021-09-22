import { NextApiRequest, NextApiResponse } from "next";
import Mailer from "@utils/Mailer";
import DefaultHandler from "@middlewares/default";
import { isEmail, isExisted } from "@utils/validators";
import contactTemplate from "@utils/templates/contactTemplate";
import { isPhoneNumber } from "../../utils/validators";

interface IRequestBody {
  nom: string;
  prenom: string;
  message: string;
  email: string;
  tel?: string;
  captcha: boolean;
}
export default DefaultHandler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as IRequestBody;
  try {
    // si le captcha n'est pas validé
    if (!body.captcha) {
      return res.status(400).json({ error: "Veuillez valider le Captcha" });
    }
    // #################################################
    // On vérifie les champs
    // #################################################
    const { code, errors } = verifs(body);
    if (code !== 200) {
      return res.status(code).json(errors);
    }

    // #################################################
    // Structure du courriel
    // #################################################
    const contentNoHtml = `Demande de contact : ${body.prenom} ${body.nom} (${body.email}), ${body.message}`;
    const mailer = await new Mailer(
      process.env.EMAIL,
      "Demande de contact",
      contentNoHtml,
      contactTemplate(body.nom, body.prenom, body.email, body.message, body.tel)
    ).send();

    if (!mailer) {
      return res.status(500).json({ error: "Erreur lors de l'envoi du courriel. Veuillez réessayer plus tard" });
    }

    res.status(200).json({ message: "Votre message a été envoyé !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

const verifs = (body: IRequestBody) => {
  // Vérification de si les données sont bien présentes dans le body
  const errors = [] as string[];

  // #######################################
  // vérifications si les champs existent
  // #######################################
  if (!isExisted(body.nom)) errors.push("Champ nom requis");
  if (!isExisted(body.prenom)) errors.push("Champ prénom requis");
  if (!isExisted(body.email)) errors.push("Champ courriel requis");
  if (!isExisted(body.message)) errors.push("Champ message requis");

  // si y'a des erreurs, on envoie une réponse pour signaler à l'utilisateur que tous les champs requis ne sont pas remplis
  if (errors.length > 0) return { code: 409, errors };

  // #######################################
  // vérifications des formats
  // #######################################
  if (!isEmail(body.email)) errors.push("Format incorrect pour le champ email");
  if (typeof body.nom !== "string") errors.push("Format incorrect pour le champ nom");
  if (typeof body.prenom !== "string") errors.push("Format incorrect pour le champ prénom");
  if (typeof body.message !== "string") errors.push("Format incorrect pour le champ message");
  // si y'a le tel de renseigné
  if (body.tel) {
    if (!isPhoneNumber(body.tel)) errors.push("Format incorrect pour le champ téléphone portable");
  }
  // si y'a des erreurs, on envoie une réponse pour signaler à l'utilisateur que certains champs ne sont pas au bon format
  if (errors.length > 0) return { code: 409, errors };

  // #######################################
  // vérifications de la longueur des champs
  // #######################################
  if (body.message.length > 40000) errors.push("La taille maximale pour le champ message est de 4000 caractères");
  // si y'a des erreurs, on envoie une réponse pour signaler à l'utilisateur que certains champs ne sont pas au bon format
  if (errors.length > 0) return { code: 409, errors };

  return { code: 200 };
};
