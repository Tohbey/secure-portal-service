const express = require('express');
const { JsonResponse } = require("../lib/apiResponse");
const question = require('../routes/question');
const user = require('../routes/user');
const document = require('../routes/document');
const auth = require('../routes/auth');
const permission = require('../routes/permission');
const sharedDocument = require('../routes/sharedDocument');

module.exports = function(app){
    app.use(express.json({extended: true}));
    app.use(express.urlencoded({extended: true}));
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/question', question);
    app.use('/api/v1/user', user);
    app.use('/api/v1/document', document);
    app.use('/api/v1/permission', permission);
    app.use('/api/v1/shared', sharedDocument);

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}