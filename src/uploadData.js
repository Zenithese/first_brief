function fileExists(fileName) {
    var request = gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'files(id, name, modifiedTime)'
    });
    request.execute(function (res) {
        var exists = res.files.filter(function (f) {
            return f.name === fileName;
        }).length > 0;
        if (!exists) {
            createPositionsFile();
        } else {
            findAppDataFile();
        }
    });
};

function createPositionsFile() {
    var file = new Blob([JSON.stringify(BFO)], { type: 'text/javascript' });
    var metadata = {
        'name': 'app_data_1', // Filename at Google Drive
        'mimeType': 'text/javascript', // mimeType at Google Drive
        'parents': ['appDataFolder']
    };
    // 10CCF55t-UIyxf_QF7bEeIlEVLbjTC171AM86i-OW3NaakLYlxg
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
        console.log(xhr.response.id); // Retrieve uploaded file ID.
    };
    xhr.send(form);
    greeting();
    listFiles();
}

function findAppDataFile () {
    gAPI.client.drive.files.list({
        'spaces': 'appDataFolder',
        'fields': 'nextPageToken, files(id, name, kind, mimeType)',
        'pageSize': 5
    }).then(function (response) {
        let files = response.result.files;
        let length = files.length
        if (files && length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // if (i === length - 1 && file.name !== "app_datad") {
                //     firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));
                //     continue;
                // }
                if (file.name !== "app_data_1") continue;
                gAPI.client.drive.files.get({
                    'fileId': file.id,
                    'alt': 'media'
                }).then(function (response) {
                    BFO = JSON.parse(response.body)
                    // debugger
                    firstFolder();
                    if (BFO['wallpaper'] !== null) changeBackground(BFO['wallpaper'])
                })
            }
        } else {
            alert('No files found.');
        }
    });
}

function updatePositionsFile () {
    gAPI.client.drive.files.list({
        'spaces': 'appDataFolder',
        'fields': 'nextPageToken, files(id, name, kind, mimeType)',
        'pageSize': 5
    }).then(function (response) {
        files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.name === 'app_data_1') {
                    var xhr = new XMLHttpRequest();
                    xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + file.id + '?uploadType=media');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                    xhr.responseType = 'json';
                    xhr.send(JSON.stringify(BFO));
                }
            }
        } else {
            alert('No files found.');
        }
    });
}

function createNewFile(x, y) {
    var file = new Blob(['New File from myDesktop'], { type: 'text/plain' });
    var metadata = {
        'name': 'New File', // Filename at Google Drive
        'mimeType': 'text/plain', // mimeType at Google Drive
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    xhr.onload = () => {
        gAPI.client.drive.files.list({
            'pageSize': 1,
            'fields': "nextPageToken, files(kind, id, name, webViewLink, iconLink, mimeType, description)"
        }).then(function (response) {
            let file = response.result.files[0]
            newFile(file.name, file.webViewLink, file.id, x, y, null);
        })
    };
    xhr.send(form);
}