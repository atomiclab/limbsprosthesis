# gulp-jscad-files
This gulp plugin reads jscad.json library files, and their NPM dependencies.

## Example
To find `jscad.json` files and place those and their NPM files into a directory called `dist`:

```javascript
gulp.task('lib', function () {
  return gulp.src('node_modules/**/jscad.json')
    .pipe(plugins.plumber())
    .pipe(plugins.jscadFiles())
    .pipe(plugins.flatten())
    .pipe(gulp.dest('dist'));
});
```

## jscad Modules
You can create a jscad module by creating a NPM module with your jscad files and a `jscad.json` file that contains a files array.

```json
{
    "files": ["jscad-utils.jscad"]
}
```

`gulp-jscad-files` will read the `jscad.json` project file and the `package.json` file in that directory to determine the required files for that module.  You can use a gulp task to place those files into a directory being monitored by a openjscad.org page.
