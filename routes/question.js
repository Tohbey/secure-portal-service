const router = require('express').Router();
const controller = require("../controllers");

router.get('/:reportUUID', controller.question.getQuestion); //working

router.get('/', controller.question.getQuestions); //working

router.post('/', controller.question.create); //working

router.delete('/:reportUUID', controller.question.deleteQuestion); //working

module.exports = router;