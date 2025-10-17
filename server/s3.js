const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
require("dotenv").config();

let s3Client = null;
let bucketName = null;

// Initialize S3 client only if AWS credentials are provided
function initializeS3() {
  if (process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    bucketName = process.env.AWS_BUCKET_NAME;
    return true;
  }
  return false;
}

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

async function uploadToS3(file) {
  // Initialize S3 client if not already done
  if (!s3Client && !initializeS3()) {
    throw new Error("AWS S3 credentials not configured. Please set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_BUCKET_NAME environment variables.");
  }

  const fileName = generateFileName();
  const contentType = file.mimetype || "application/octet-stream";

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  const baseUrl = process.env.AWS_BUCKET_URL || `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  return `${baseUrl}/${fileName}`;
}

module.exports = { uploadToS3 };


