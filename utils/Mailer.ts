import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import smtpTransport from "nodemailer-smtp-transport";
type Attachment = { filename: string; content: string | Buffer; encoding?: string };
export default class Mailer {
  // constantes
  private _TRANSPORT = {
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // upgrade later with STARTTLS
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    greetingTimeout: 5000,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
  private _FROM = `"Dev Agency" <${process.env.EMAIL}>`;
  // variables dynamiques
  private _transportConnection: Mail;
  private _to: string;
  private _subject: string;
  private _text: string;
  private _html: string;
  private _attachments?: Array<Attachment> | undefined;

  constructor(to: string, subject: string, text: string, html: string, attachments?: Array<Attachment> | undefined) {
    this._to = to;
    this._subject = subject;
    this._text = text;
    this._html = html;
    this._attachments = attachments;

    this._transportConnection = nodemailer.createTransport(smtpTransport(this._TRANSPORT));
  }

  /**
   * Ouverture de la connexion Nodemailer
   */
  private async connect() {
    try {
      return await this._transportConnection.verify();
    } catch (error) {
      console.log("Erreur lors de la connexion Nodemailer : " + error);
      return false;
    }
  }

  /**
   * Fermeture de la connexion Nodemailer
   */
  private close() {
    this._transportConnection.close(); // close the connection pool
  }

  /**
   * Envoi d'un courriel
   */
  public async send() {
    const email = {
      from: this._FROM,
      to: this._to, // list of receivers
      subject: this._subject, // Subject line
      text: this._text, // plain text body
      html: this._html,
      attachments: this._attachments,
    };

    try {
      // on ouvre la connexion
      const isConnected = await this.connect();

      if (!isConnected) return false;

      await this._transportConnection.sendMail(email);
      this.close();
      return true;
    } catch (error) {
      this.close();
      return false;
    }
  }
}
