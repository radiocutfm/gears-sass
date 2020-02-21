var sys    = require('sys'),
    fs     = require('fs'),
    sass   = require('node-sass'),
    paths  = process.argv.slice(2) || [],
    source = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    source += chunk;
});

process.stdin.on('end', function() {
    var result = sass.renderSync({
        data: source,
        outputStyle: 'nested',      //nested|compressed|expanded
        sourceComments: 'none',     //none|normal
        includePaths: paths,
        imagePath: '/static',
        error: function (error) {
            throw error;
        }

    });
    process.stdout.write(result.css);
});
