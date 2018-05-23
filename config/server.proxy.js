//远程代理访问，可以配置多个代理服务
const proxyConfig = [
    {
        enable: true,
        router: "/api/*",
        headers: {"X-XSS": "X-XSS"},
        url: "http://localhost:8000"
    },
    {
        enable: true,
        router: ["/profile/*"],
        url: "http://localhost:3000"
    },
    {
        enable: false,
        router: ["/users/*", "/orgs/*"],
        url: "https://api.github.com"
    }
];

module.exports = proxyConfig
