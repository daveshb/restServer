const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateRols, validateEmail, validateId } = require("../helpers/db-validators");

const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user");

router.get("/", userGet);

router.put("/:id",[
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(validateId),
  check('rol').custom(validateRols),
  validateFields
] , userPut);

router.post("/", [
  check('name', 'The name is required').not().isEmpty(),
  check('email', 'The email is not valid').isEmail(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
  // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(validateRols),
  check('email').custom(validateEmail),
    validateFields
], userPost);

router.delete("/:id",[
  check('id', 'It is not a valid ID').isMongoId(),
  check('id').custom(validateId),
  validateFields
], userDelete);

module.exports = router;
