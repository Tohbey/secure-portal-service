const SharedDocumentService = require('../services/shareDocument');
const { MSG_TYPES } = require('../constant/types');
const { validateSharedDocument } = require('../request/sharedDocument');
const { JsonResponse } = require('../lib/apiResponse');

exports.create = async (req, res, next) => {
    try {
        const { error } = validateSharedDocument(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message)

        const createSharedDocument = await SharedDocumentService.create(req.body, req.user);

        JsonResponse(res, 201, MSG_TYPES.CREATED, createSharedDocument);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getSharedDocumentsByUser = async (req, res, next) => {
    try {
        let filter = {
            user: req.user._id
        }

        let { sharedDocuments, total } = await SharedDocumentService.getSharedDocuments(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, sharedDocuments, total)
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getSharedDocument = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.sharedDocumentUUID
        };

        let sharedDocument = await SharedDocumentService.getSharedDocument(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, sharedDocument);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.updateSharedDocument = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.deleteSharedDocument = async (req, res, next) => {
    try {
        let filter = {
            uuid: req.params.sharedDocumentUUID
        };

        let userFilter = {
            uuid: req.user.uuid
        }

        await SharedDocumentService.deleteSharedDocuments(filter, userFilter);

        JsonResponse(res, 200, MSG_TYPES.DELETED);
    } catch (error) {
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}