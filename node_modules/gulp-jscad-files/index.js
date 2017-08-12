var through = require('through2'),
    fs = require('fs'),
    path = require('path'),
    globby = require('globby'),
    gutil = require('gulp-util');

function getPackage(file, stream, loaded, depth) {
    depth = depth || 0;
    if (depth > 1) {
        throw new Error('getPackage depth exceeded');
    }
    // console.log('getPackage file', depth, file.path);
    var pkg = JSON.parse(file.contents.toString());
    if (pkg && pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(function (key) {
            // console.log('pkg.dependencies key', key);
            globby.sync(['node_modules/' + key + '/jscad.json']).forEach(function (jscadconf) {
                var jscad = JSON.parse(fs.readFileSync(jscadconf));
                jscad.files.forEach(function (depfilename) {
                    // console.log('  jscad:', jscadconf, depfilename);
                    var deppath = path.resolve(path.dirname(jscadconf), depfilename);
                    var depfile = new gutil.File({
                        path: deppath,
                        contents: fs.readFileSync(deppath)
                    });

                    stream.push(depfile);
                });

            });


        });
    }
}

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        var self = this;

        getPackage(file, self, {});
        // console.warn('cb');
        callback();

    });
};
