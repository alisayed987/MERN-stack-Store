const joi = require("joi");
const registerdebug = require("debug")("app:register");
const logindebug = require("debug")("app:login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//------Registeration Validation------------------------------------------
async function validateRegisteredUser(obj, usermodel) {
  const joischem = joi.object({
    name: joi.string().min(3).max(10).required(),
    email: joi.string().email(),
    password: joi.string().min(6), //pattern(new RegExp("/[a-zA-Z0-9!?]{5,15/")),
    address: joi.string().min(5).max(40),
    phone: joi.string().length(11).required(),
    image: joi.string(),
  });
  const validated = joischem.validate(obj);
  if (!validated.error) {
    const query = await usermodel.find({ email: obj.email });
    registerdebug("query ", query); //
    if (query.length == 0) {
      return true;
    } else {
      return false;
    }
  } else {
    throw validated.error;
  }
}

//---------Login Validation------------------------------------------------
async function validateUser(obj, usermodel) {
  const joischem = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6),
  });
  const validated = joischem.validate(obj);
  if (!validated.error) {
    const query = await usermodel.findOne({ email: obj.email });
    logindebug("query ", query); //
    if (!query) {
      throw new Error("user is not found"); //user not found
    } else {
      const rightpassword = await bcrypt.compare(obj.password, query.password);
      if (rightpassword) {
        const token = jwt.sign({ name: query.name, id: query._id }, "mySecret");
        return token;
      } else throw new Error("wrong password");
    }
  } else {
    throw validated.error;
  }
}

function validateItem(obj) {
  const joischem = joi.object({
    name: joi.string().min(3).max(50).required(),
    category: joi.string().min(3).max(20).required(),
    price: joi.number().min(0),
    sale: joi.number().min(0).max(100),
    image: joi.string(),
    stock: joi.bool().required(),
  });
  const validated = joischem.validate(obj);
  if (!validated.error) {
    return validated.value;
  } else {
    throw validated.error;
  }
}

async function createUser(obj, usermodel) {
  const user = new usermodel(obj);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  registerebug("salt: ", salt);
  registerebug("user after hash: ", user);
  const result = await user.save();
  return result;
}

module.exports.validateRegisteredUser = validateRegisteredUser;
module.exports.validateUser = validateUser;

module.exports.createUser = createUser;
