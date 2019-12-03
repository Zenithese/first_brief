// // var http = require('http');
// require(['fs'], function (fs) {});
// // var fs = require('fs')
// // require('../foo')

// var fileMetadata = {
//   'name': 'BFO.js',
// //   'parents': ['appDataFolder']
// };
// var media = {
//   mimeType: 'text/javascript',
//   body: fs.createReadStream('/Users/justin/Desktop/projects/first_brief/src/BFO.js')
// };
// drive.files.create({
//   resource: fileMetadata,
//   media: media,
//   fields: 'id'
// }, function (err, file) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('File Id: ', file.id);
//   }
// });

// positions = null;

// function savePositions(BFO){
//     if (!positions) {
//         // positions = createPositionsFile();
//     } else {
//         // positions = updatePositionsFile();
//     }
// }

function createPositionsFile() {
    fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Length': 2000000,
            'Content-Type': 'text/javascript',
        },
        body: JSON.stringify({'name': 'BFO.js'}),
        method: 'POST'
    })
}