const { User } = require("../../models");

const current = async (req, res) => {
  const { token } = req.user;
  const { email, subscription } = await User.findOne({ token });
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = current;
