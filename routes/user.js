const { Router } = require("express");
const router = Router();

const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user");

router.get("/", userGet);
router.put("/:id", userPut);
router.post("/", userPost);
router.delete("/", userDelete);

module.exports = router;
