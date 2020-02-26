// https://console.developers.google.com

// Client ID and API key from the Developer Console
var CLIENT_ID = '329272270753-d5i7eltc431nqf4q57lg129aujr0fl0b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMu1ATbmk6cgoJhD5oGeRihOsP314WOjY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
var SCOPES = "https://www.googleapis.com/auth/drive  https://www.googleapis.com/auth/drive.appdata";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

var files = null;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
let accessToken = null;
let gAPI = null;
function initClient() {
    gAPI = gapi;
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        // accessToken = (gapi.auth2.getAuthInstance().currentUser.Ab.Zi.access_token)
        let key = Object.keys(gapi.auth2.getAuthInstance().currentUser)[0]
        let key2 = Object.keys(gapi.auth2.getAuthInstance().currentUser[key])[1]
        console.log(gapi.auth2.getAuthInstance().currentUser)
        accessToken = gapi.auth2.getAuthInstance().currentUser[key][key2].access_token
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // createPositionsFile(); // 1T1Wa59qS3K71WL7k783vaXkUwnzmfif6VmQWxNTdhRVjcBjFgg 1gZ7Xkv1zKe_-_oi06vubk8og3a5ZC0ts 1EZzPnB-Ab83yhXA9CSOGtQns9gDB72ep 1htIjspmYsXQVIac56GGXHu_fe86zYC34
        fileExists("changed")

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        alert(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print files.
 */

function listFiles() {
    // findAppDataFile(gapi);

    gapi.client.drive.files.list({
        'pageSize': 5,
        'fields': "nextPageToken, files(kind, id, name, webViewLink, iconLink, mimeType, description)"
    }).then(function (response) {
        files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // console.log(i, file)
                fillNav(file)
                // fillFirstFile(file.name, file.webViewLink, file.id);
                if (file.id in BFO['files']) {
                    newFile(file.name, file.webViewLink, file.id, BFO['files'][file.id]['top'], BFO['files'][file.id]['left'], BFO['files'][file.id]['parent'])
                }
            }
        } else {
            alert('No files found.');
        }
    });
}

function renameDriveFile(fileId, name) {
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'name': `${name}`}),
        method: 'PATCH'
    })
}