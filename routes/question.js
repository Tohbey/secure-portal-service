//working
const router = require('express').Router();
const controller = require("../controllers");

router.get('/:questionUUID', controller.question.getQuestion);

router.get('/', controller.question.getQuestions);

router.post('/', controller.question.create);

router.delete('/:questionUUID', controller.question.deleteQuestion);

module.exports = router;