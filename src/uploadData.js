// var http = require('http');
var fs = require('fs');

var fileMetadata = {
  'name': 'BFO.js',
//   'parents': ['appDataFolder']
};
var media = {
  mimeType: 'text/javascript',
  body: fs.createReadStream('/Users/justin/Desktop/projects/first_brief/src/BFO.js')
};
drive.files.create({
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function (err, file) {
  if (err) {
    console.error(err);
  } else {
    console.log('File Id: ', file.id);
  }
});

// positions = null;

// function savePositions(BFO){
//     if (!positions) {
//         // positions = createPositionsFile();
//     } else {
//         // positions = updatePositionsFile();
//     }
// }