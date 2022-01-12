const DocumentService = require('../services/document');
const { MSG_TYPES } = require('../constant/types');
const { validateDocument } = require('../request/document');
const { JsonResponse } = require('../lib/apiResponse');


exports.create = async (req, res, next) => {
    try {
        req.body.owner = req.user.uuid;
        const { error } = validateDocument(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const createDocument = await DocumentService.create(req.body, req.user);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createDocument);
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getDocument = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.documentUUID
        };

        let document = await DocumentService.getDocument(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, document)
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getDocumentsByUser = async (req, res, next) => {
    try {
        let filter = {
            owner: req.user.uuid
        }

        let { documents, total } = await DocumentService.getDocuments(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, documents, total)
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.getDocuments = async (req, res, next) => {
    try {
        let { documents, total } = await DocumentService.getDocuments();

        JsonResponse(res, 200, MSG_TYPES.FETCHED, documents, total);
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.shareDocument = async (req, res, next) => {
    try {
        JsonResponse(res, 200, MSG_TYPES.CREATED)
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.updateDocument = async (req, res, next) => {
    try {
        JsonResponse(res, 200, MSG_TYPES.UPDATED)
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.deleteDocument = async (req, res, next) => {
    try {
        let filter = {
            owner: req.user.uuid,
            uuid: req.params.documentUUID
        }
        console.log(filter)
        await DocumentService.deleteDocument(filter);

        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        console.log({ error })
        next(error)
        JsonResponse(res, error.statusCode, error.msg);
    }
}