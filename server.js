var app = require('koa')(),
    router = require('koa-router')();

var fs = require('co-fs'),
    gzip = require('node-zopfli');

var StreamConcat = require('stream-concat');

var MIME = {
    'js': 'text/javascript',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'text/xml',
    'gif': 'image/gif',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'woff': 'application/x-font-woff',
    'ttf': 'application/x-font-ttf',
    'otf': 'application/x-font-opentype',
    'eot': 'application/vnd.ms-fontobject'
}

app
    .use(router.routes())
    .use(router.allowedMethods());

router
    .get('/', function*(next) {
        this.body = 'Welcome to http://static.hello13.net/';
    })
    .get('/*', function*(next) {
        var path = this.request.path,
            type = path.split('.').pop();

        // var stat = yield util.getStat(path);

        this.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': MIME[type] || 'text/plain'
        });

        var stream = yield util.readStream(path);
        if (stream) {
            this.body = stream;

            // if (MIME[type].indexOf('text') >= 0) {
            //     this.set('Content-Encoding', 'gzip');
            //     this.body = stream.pipe(gzip.createGzip());
            // }
        }
    })
    .get('/image/*', function*(next) {
        // TODO 生成固定尺寸图片
        // url: /image/<width>.<height>.<quality>/<imagename>
        console.log(this.request.url);
    })
    .get('/combo', function*(next) {
        this.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/javascript',
            // 'Content-Encoding': 'gzip'
        });

        var req = this.request,
            resp = this.response;

        var resoures = [],
            body = [];
        if (req.query && req.query['f']) {
            resoures = req.query['f'].split(';');
        }

        for (var i = 0, len = resoures.length; i < len; i++) {
            var path = resoures[i],
                text = yield util.readFile(path);

            if (text) {
                var name = path.split('/').pop(),
                    prefix = '/*___meta___' + name + '*/\n';

                body.push(prefix + text);
            }

        }

        if (body.length) {
            // this.body = gzip.gzipSync(new Buffer(body.join('\n')), {});
            this.body = body.join('\n');
        }
    });

var util = {
    getStat: function*(path) {
        path = __dirname + '/static' +path;

        if (yield fs.exists(path)) {
            return fs.stat(path);
        }

        return {};
    },
    readStream: function*(path) {
        console.log(path);

        path = __dirname + '/static' +path, stream = '';

        if (yield fs.exists(path)) {
            stream = fs.createReadStream(path);
        }

        // 返回文件内容
        return stream;
    },
    readFile: function*(path) {
        console.log(path);

        path = __dirname + '/static' +path, text = '';

        if (yield fs.exists(path)) {
            text = yield fs.readFile(path);
        }

        // 返回文件内容
        return text;
    }
}

app.listen(3030, function() {
    console.log('Combo\'s running on port:3030');
});