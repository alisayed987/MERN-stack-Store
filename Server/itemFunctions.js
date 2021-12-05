const joi = require("joi");
async function validateItem(input, itemmodel) {
  const schema = joi.object({
    name: joi.string().required(),
    category: joi.string().required(),
    price: joi.number().min(0).required(),
    sale: joi.number().min(0).max(100).required(),
    image: joi.string(),
    stock: joi.bool().required(),
  });
  const validated = schema.validate(input);
  if (!validated.error) {
    const item = new itemmodel(input);

    await item.save();
    return "Item Saved";
  } else {
    throw validated.error;
  }
}

module.exports = validateItem;
