const express = require('express');
const { JsonResponse } = require("../lib/apiResponse");
const question = require('../routes/question');
const user = require('../routes/user');

module.exports = function(app){
    app.use(express.json({extended: true}));
    app.use(express.urlencoded({extended: true}));
    app.use('/api/v1/question', question)
    app.use('/api/v1/user', user)

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}