const { exec, escape } = require('../db/mysql')
/**
 * 登录
 * @param {用户名} username 
 * @param {密码} password 
 */
const login = (username, password) => {
    username = escape(username)
    password = escape(password)
    const sql = `
        select username, realname from users where username=${username} and password=${password};
    `
    console.log('sql:',sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
} 