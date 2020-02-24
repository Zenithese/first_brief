(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// var http = require('http');
// require(['fs'], function (fs) {});
var fs = require('fs')
// require('../foo')

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

// function createPositionsFile() {
//     fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Length': 2000000,
//             'Content-Type': 'text/javascript',
//         },
//         body: JSON.stringify({'name': 'BFO.js'}),
//         method: 'POST'
//     })
// }
},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1]);
