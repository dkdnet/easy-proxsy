const chalk = require("chalk");
const path = require('path');
const express = require('express');
const proxy = require("http-proxy-middleware");
const CONST = require('./config/constant.json');
const app = express();
const router = express.Router();


// 处理代理
if(CONST.proxy) {
    const proxyConfig = require('./config/server.proxy');
    proxyConfig.forEach(function (element) {
        if (element.enable) {//代理开启
            //默认配置项
            let proxyOpt = {
            target: element.url,
            logLevel: "debug",
            changeOrigin: true,
            headers: (typeof element.headers !== 'undefined' ? element.headers : {}),
            onProxyRes: function (proxyRes) {
                proxyRes.headers["Proxy-Server"] = "true";
            }
            }
            app.use(element.router, proxy(proxyOpt));
            console.log(chalk.green(`[proxy] : ${element.router} to ${element.url}`));
        }
    });
}

app.use(router);

// 端口
app.listen(CONST.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:'+ CONST.port);
});
