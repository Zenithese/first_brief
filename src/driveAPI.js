// https://console.developers.google.com

// Client ID and API key from the Developer Console
var CLIENT_ID = '329272270753-d5i7eltc431nqf4q57lg129aujr0fl0b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMu1ATbmk6cgoJhD5oGeRihOsP314WOjY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
var SCOPES = 'https://www.googleapis.com/auth/drive';

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
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        accessToken = (gapi.auth2.getAuthInstance().currentUser.Ab.Zi.access_token)
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
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
        listFiles();
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
let gApi = null;
function listFiles() {
    gApi = gapi;
    gapi.client.drive.files.list({
        'pageSize': 5,
        'fields': "nextPageToken, files(kind, id, name, webViewLink, iconLink, mimeType, description)"
    }).then(function (response) {
        files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                fillNav(file)
                fillFirstFile(file.name, file.webViewLink, file.id);
            }
        } else {
            appendPre('No files found.');
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