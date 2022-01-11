const DocumentService = require('../services/document');
const { MSG_TYPES } = require('../constant/types');
const { JsonResponse } = require('../lib/apiResponse');


exports.create = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.CREATED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getDocument = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.FETCHED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.getDocumentsByUser = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.FETCHED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}

exports.getDocuments = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.FETCHED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.shareDocument = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.CREATED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}


exports.updateDocument = async (req, res, next) => {
    try {
        JsonResponse(res, 201, MSG_TYPES.UPDATED)
    } catch (error) {
        console.log({error})
        next(error)
        JsonResponse(res, error.statusCode, error.msg)
    }
}