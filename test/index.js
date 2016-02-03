var path = require('path');
var gutil = require('gulp-util');
var fs = require('fs');
var inlinesource = require('../');

function getFile (filePath, contents) {
    return new gutil.File({
        path: filePath,
        base: path.dirname(filePath),
        contents: contents || fs.readFileSync(filePath)
    });
}

function getFixture (filePath) {
    return getFile(path.join(__dirname, filePath));
}


var output = fs.createWriteStream('./demo-dist.jade');

var stream = inlinesource();

stream.on('data', function (newFile) {
    output.write(newFile.contents);
});

stream.on('end', function () {
});

stream.write(getFixture('demo.jade'));
stream.end();