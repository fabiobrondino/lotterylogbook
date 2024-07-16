const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { authDatamapper } = require("../datamappers");
const tokenService = require("../services/token");

const controller = {

  async addUser(req, res) {

      const newUser = req.body;
      console.log(newUser);

        const result = await authDatamapper.addUser(newUser);
        res.json(result);

  },

  async connectUser(req, res) {

      const userInfo = req.body;
      console.log(userInfo);

      const {result} = await authDatamapper.connectUser(userInfo);

      const userPayload = {
        userId: result[0].id_user,
        username: `${result[0].firstname} ${result[0].lastname}`,
      };

      const token = tokenService.get(userPayload);
      res.json({ token });

  },

  async requestPasswordReset(req, res) {
    const { email } = req.body;
    
    // Générer un token sécurisé
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token);
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure
    console.log(resetTokenExpiry);

    // Sauvegarder le token et son expiration dans la base de données
    await authDatamapper.saveResetToken(token, resetTokenExpiry, email);

    // Configurer le transporteur nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_RESET,
        pass: process.env.EMAIL_PASSWORD_RESET
      }
    });

    // Définir l'email
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_RESET,
      subject: 'Réinitialisation de mot de passe',
      text: `Vous recevez cet email parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
             Cliquez sur le lien suivant ou copiez-le dans votre navigateur pour compléter le processus dans l'heure qui suit:\n\n
             http://${req.headers.host}/reset/${token}\n\n
             Si vous n'avez pas demandé cela, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Erreur lors de l\'envoi de l\'email: ', err);
        return res.status(500).send('Erreur lors de l\'envoi de l\'email');
      }
      res.status(200).send('Email de réinitialisation de mot de passe envoyé');
    });
  },

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    // Vérifier le token et son expiration
    const user = await authDatamapper.verifyResetToken(token);

    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).send('Le token est invalide ou a expiré');
    }

    // Réinitialiser le mot de passe
    const updatedUser = await authDatamapper.resetPassword(user.email, newPassword);
    res.status(200).send(updatedUser);
  }
};

module.exports = controller;
