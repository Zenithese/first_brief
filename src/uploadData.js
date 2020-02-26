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
            console.log('creating')
            createPositionsFile();
        } else {
            console.log('finding')
            findAppDataFile();
        }
    });
};

function createPositionsFile() {
    var file = new Blob([JSON.stringify(BFO)], { type: 'text/javascript' });
    var metadata = {
        'name': 'myDriveAppDataFile', // Filename at Google Drive
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
            console.log(files)
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // if (i === length - 1 && file.name !== "myDriveAppDataFiled") {
                //     firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));
                //     continue;
                // }
                if (file.name !== "myDriveAppDataFile") continue;
                console.log('dataFile')
                gAPI.client.drive.files.get({
                    'fileId': file.id,
                    'alt': 'media'
                }).then(function (response) {
                    BFO = JSON.parse(response.body)
                    firstFolder();
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
                if (file.name === 'myDriveAppDataFile') {
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