const { Documents } = require('../models');
const { mailSender } = require('../utils/index');
const { MSG_TYPES } = require('../constant/types');


class DocumentService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    } 

    static getDocuments(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    } 

    static deleteDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    } 

    static updateDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    } 

    static shareDocument(body) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    } 
}

module.exports = DocumentService;