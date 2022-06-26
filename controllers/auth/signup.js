const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const { gravatar } = require("gravatar");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: 250 }, true);
  const newUser = new User({ email, verificationToken, avatarURL });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждения email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Registration successful",
      user: {
        email,
        verificationToken,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
