import { S3Client } from '@aws-sdk/client-s3'
import { SESClient } from '@aws-sdk/client-ses'

// Set the AWS Region.
const REGION = 'us-east-2' //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
})

const sesClient = new SESClient({
  region: REGION,
})

export { s3Client, sesClient }
