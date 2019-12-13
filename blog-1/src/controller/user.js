/**
 * 登录
 * @param {用户名} username 
 * @param {密码} password 
 */
const loginCheck = (username, password) => {
    // 先使用假数据
    if (username === 'zhangsan' && password === '123'){
        return true
    }

    return false
}

module.exports = {
    loginCheck
}