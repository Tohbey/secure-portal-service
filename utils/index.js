const RandExp = require("randexp");
const dotenv = require('dotenv').config();
const mailjetAPIKEY1 = process.env.MAILJETAPIKEY1;
const mailjetAPIKEY2 = process.env.MAILJETAPIKEY2;

const mailjet = require('node-mailjet').connect(mailjetAPIKEY1, mailjetAPIKEY2)
const AWS = require('aws-sdk');
const multer = require("multer")
const multerS3 = require("multer-s3")
const fs = require('fs')
const bucket = process.env.BUCKET

const s3 = new AWS.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET,
  region: 'us-east-2'
})

GenerateOTP = (num) => {
  const OTPCode = new RandExp(`[0-9]{${num}}`).gen();

  return OTPCode;
};

GenerateCode = (num) => {
  const token = new RandExp(`[a-z]{${num}}`).gen();

  return token;
};

const paginate = (req) => {
  const page =
    typeof req.query.page !== "undefined" ? Math.abs(req.query.page) : 1;
  const pageSize =
    typeof req.query.pageSize !== "undefined"
      ? Math.abs(req.query.pageSize)
      : 50;
  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
};

const mailSender = async (to, subject, text, html) => {
  const request = mailjet.post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "fafoworatobi25@gmail.com",
            "Name": "Admin"
          },
          "To": [
            to
          ],
          "Subject": subject,
          "TextPart": text,
          "HTMLPart": html,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })

  await request.then((result) => {
    console.log(result.body)
  }).catch((err) => {
    console.log({ err })
  })
}

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

//setting filter to the files just pictures with that format
const fileFilter = (req, file, cb) => {
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
    cb(null, true)
  }else{
    cb(new Error("Wrong Format"), false)
  }
}

const uploadFiles = multer({
  storage,
  limits:{
    fileSize:  1024 * 1024 * 20 //20mb max
  },
  fileFilter,
})

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb){
      cb(null,  file.originalname + '-' + Date.now())
    },
    metadata: function(req, file,cd){
      cd(null, {filename: file.fieldname})
    },
    acl: "public-read",
    limits:{
      fileSize:  1024 * 1024 * 20 //20mb max
    },
    fileFilter, 
  })
})

module.exports = {
  paginate,
  GenerateOTP,
  GenerateCode,
  mailSender,
  uploadS3,
};