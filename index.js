var inlineSource = require('jade-inline-source');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-jade-inline-source';

function gulpJadeInlineSource (options) {
    'use strict';

    var stream = through.obj(function (file, enc, cb) {
        var self = this;

        if (file.isNull() || file.isDirectory()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var fileOptions = {
          base: path.join(file.base, options.base || '')
        };

        inlineSource(file.contents.toString(), fileOptions, function (err, html) {
            if (err) {
                self.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
            } else {
                file.contents = new Buffer(html || '');
                self.push(file);
            }

            cb();
        });
    });

    return stream;
}

module.exports = gulpJadeInlineSource;