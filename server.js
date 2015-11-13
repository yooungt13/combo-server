var app = require('koa')(),
    router = require('koa-router')();

var fs = require('co-fs');

app
    .use(router.routes())
    .use(router.allowedMethods());

router
    .get('/', function*(next) {
        this.body = 'Welcome to http://static.hello13.net/';
    })
    .get('/static/*', function*(next) {
        this.body = yield handler(this.request.url);
    })
    .get('/image/*', function*(next) {
        // TODO 生成固定尺寸图片
        // url: /image/<width>.<height>.<quality>/<imagename>
        console.log(this.request.url);
    })
    .get('/combo', function*(next) {
        this.set('Access-Control-Allow-Origin', '*');

        var req = this.request,
            resp = this.response;

        var resoures = [],
            body = [];
        if (req.query && req.query['f']) {
            resoures = req.query['f'].split(';');
        }

        for (var i = 0, len = resoures.length; i < len; i++) {
            var resPath = resoures[i],
                // resType = resPath.split('.').pop(),
                resText = yield handler(resPath);

            if( resText ) {
                body.push(resText);
            }
        }

        if (body.length) {
            this.body = body.join('\n');
        }
    });

function* handler(path) {
    console.log(path);

    var name = path.split('/').pop(),
        path = __dirname + path,
        prefix = '/*___meta___' + name + '*/\n',
        text = '';

    // 如果dist存在
    if (yield fs.exists(path)) {
        text = yield fs.readFile(path);
    }

    // 返回文件内容
    return text ? prefix + text : '';
};

app.listen(3030, function() {
    console.log('Combo\'s running on port:3030');
});