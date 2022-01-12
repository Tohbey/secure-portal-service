const { Document } = require('../models');
const { mailSender } = require('../utils/index');
const { MSG_TYPES } = require('../constant/types');
const UserService = require('./user')

class DocumentService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let filter = {
                    uuid: body.owner
                }
                const currntUser = await UserService.getUser(filter);

                body.owner = currntUser.id

                const document = await Document.findOne({
                    where: {
                        name: body.name,
                        owner: body.owner
                    }
                });

                if (document) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.EXIST })
                }

                const createDocument = await Document.create(body);

                resolve(createDocument);
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const document = await Document.findOne({
                    where: filter,
                    include: 'user'
                });

                if (!document) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(document);
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getDocuments(filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                if (filter.owner) {
                    let filterUser = {
                        uuid: filter.owner
                    }
                    const currntUser = await UserService.getUser(filterUser);

                    filter.owner = currntUser.id;
                }

                const documents = await Document.findAll({
                    where: filter
                });

                const total = documents.length;

                resolve({ documents, total });
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static deleteDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {

                let filterUser = {
                    uuid: filter.owner
                }
                const currntUser = await UserService.getUser(filterUser);

                filter.owner = currntUser.id;

                const document = await Document.findOne({
                    where: filter
                })

                await document.destroy();

                resolve({ msg: MSG_TYPES.DELETED });
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