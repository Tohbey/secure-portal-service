const { MSG_TYPES } = require('../constant/types');
const { SharedDocument, Document } = require('../models');
const UserService = require('./user');


class SharedDocumentService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const shareDocument = await SharedDocument.findOne({
                    where: { 
                        document: body.document,
                        user: body.user
                    }
                });

                if (shareDocument) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.DOCUMENT_HAS_BEEN_SHARED })
                }

                const document = await Document.findOne({
                    where: { document: body.document }
                });

                if (!document) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }
                if (document.shared >= 5) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.EXCEED_SHARED_MAX })
                }

                const createSharedDocument = await SharedDocument.create(body)

                //incrementing the shared value in the document by 1
                await document.increment('shared', { by: 1 });

                resolve(createSharedDocument)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getSharedDocument(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const sharedDocument = await SharedDocument.findOne({
                    where: filter,
                })

                if (!sharedDocument) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(sharedDocument)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getSharedDocuments(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const sharedDocuments = await SharedDocument.findAll({
                    where: filter
                });

                const total = sharedDocuments.length;

                resolve({ sharedDocuments, total })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static deleteSharedDocuments(filter, userFilter) {
        return new Promise(async (resolve, reject) => {
            try {
                const sharedDocument = await SharedDocument.findOne({
                    where: filter
                });

                const owner = await UserService.getUser(userFilter);
                
                if (!sharedDocument) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                const document = await Document.findOne({
                    where: { document: sharedDocument.document }
                });

                if (!document) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                if(document.owner != owner.id){
                    return reject({ statusCode: 404, msg: MSG_TYPES.PERMISSION })
                }

                await sharedDocument.destroy();

                //decrementing the shared value in the document by 1
                await document.decrement('shared', { by: 1 });

                resolve({ msg: MSG_TYPES.DELETED })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = SharedDocumentService;