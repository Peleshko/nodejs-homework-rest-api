const { NotFound, CustomError } = require("http-errors");

const { Contact } = require("../service/schemas/contact");

const get = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contacts with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const create = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    dats: {
      result,
    },
  });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contacts with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contacts with id=${contactId} not found`);
  }
  if (result) {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
  throw new CustomError(400, "missing field favorite");
};

const remove = async (req, res) => {
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

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
