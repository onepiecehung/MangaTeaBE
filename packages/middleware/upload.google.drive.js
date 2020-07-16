
const path = require('path');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
// const jWTClient = new google.auth.JWT(
//     `truyentranh@quickstart-1592205717062.iam.gserviceaccount.com`,
//     null,
//     `7c444b180882d29cd1081c465299c25718724516`,
//     ['https://www.googleapis.com/auth/drive']
// )

// Obtain user credentials to use for the request


export async function listFiles() {
    // const auth = await authenticate({
    //     keyfilePath: path.join(__dirname, './keys.json'),
    //     scopes: 'https://www.googleapis.com/auth/drive',
    // });
    // google.options({ auth });
    const jWTClient = new google.auth.JWT(
        `truyentranh@quickstart-1592205717062.iam.gserviceaccount.com`,
        null,
        `50e3f97b93c69450264ced2a587b448191af00b9`,
        ['https://www.googleapis.com/auth/drive']
    )
    const drive = google.drive({ version: 'v3' });
    let data = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    return data.data;
}