const env = process.env.NODE_ENV   // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Guo4213!',
        port:'3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '39.104.170.179',
        user: 'root',
        password: 'Guozhen4213!',
        port:'3306',
        database: 'blog_gzh4213_com'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '39.104.170.179'
    }
}


module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}