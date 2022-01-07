const { Questions } = require('../models')
const { MSG_TYPES } = require('../constant/types');

class QuestionService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const question = await Questions.findOne({
                    where: {question: body.question}
                });

                if(question){
                    reject({ statusCode: 404, msg: MSG_TYPES.EXIST })
                }

                const createQuestion = await Questions.create(body)

                resolve(createQuestion)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getQuestions() {
        return new Promise(async (resolve, reject) => {
            try {
                const questions = await Questions.findAll();

                const total = questions.length;
                
                resolve({questions, total})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getQuestion(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const question = await Questions.findOne({
                    where: filter,
                })

                if(!question){
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(question)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static deleteQuestion(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const question = await Questions.findOne({
                    where: filter
                })

                await question.destroy();

                resolve({msg: MSG_TYPES.DELETED})

            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static updateQuestion(body, questionId) {
        return new Promise(async (resolve, reject) => {
            try {
             
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = QuestionService;