const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new NotFound(`Contacts with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
