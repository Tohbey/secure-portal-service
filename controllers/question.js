const QuestionService = require('../services/question');
const { MSG_TYPES } = require('../constant/types');
const { JsonResponse } = require('../lib/apiResponse');
const { validateQuestion } = require('../request/question');

exports.create = async (req, res, next) => {
    try {
        const {error} = validateQuestion(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const createQuestion = await QuestionService.create(req.body);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createQuestion)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.getQuestion = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.questionUUID
        };

        let question = await QuestionService.getQuestion(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, question);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getQuestions = async (req, res, next) => {
    try {
        let {questions, total} = await QuestionService.getQuestions();

        JsonResponse(res, 200, MSG_TYPES.FETCHED, questions, total);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.updateQuestion = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.deleteQuestion = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.questionUUID
        };

        await QuestionService.deleteQuestion(filter);

        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}