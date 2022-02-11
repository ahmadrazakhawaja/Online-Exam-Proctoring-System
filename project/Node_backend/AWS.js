const dotenv = require("dotenv");
dotenv.config();

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.Access_Key_Id,
  secretAccessKey: process.env.AWS_Access_Key,
});

module.exports = s3;
