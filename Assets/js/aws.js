const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAZJHWEIJU2Y7NCOCR',
    secretAccessKey: 'nyub2vuvGdsgdI6c41CFGNCacB+Ybb2Jfmchhmwt',
    region: 'us-east-1' // Change to your desired region
});

const s3 = new AWS.S3();

// Save file to S3
async function saveJsonToS3(json) {
        // Define the S3 parameters
        const params = {
            Bucket: 'edx.js.bucket',
            Key: 'subscribers.js',
            Body: subscribersJSON,
            ContentType: 'application/json'
        };
    
        try {
            // Upload the updated JSON to S3
            await s3.putObject(params).promise();
            console.log('Updated subscribers array saved to S3.');
        } catch (error) {
            console.error('Error saving updated subscribers array to S3:', error);
        }
}