const { exec, escape } = require('../db/mysql')
const xss = require('xss')

/**
 * 获取博客列表
 * @param {作者} author 
 * @param {关键字} keyword 
 */
const getList = (author, keyword) => {
    let sql =  `select * from blogs where 1=1 `
    if (author) {
        author = escape(author)
        sql += `and author=${author} `
    }

    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`
    console.log('sql:',sql)
    // 返回promise
    return exec(sql)
}

/**
 * 获取博客详情
 * @param {博客ID} id 
 */
const getDetail = (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

/**
 * 新建一篇博客
 * @param {新建博客的数据} blogData 
 */
const newBlog = ({title, content, author} = {}) => {
    // blogData 是一个博客对象，包含 title content author属性
    const createTime = Date.now()
    title = xss(escape(title))
    console.log('title is ',title)
    content = escape(content)
    author = escape(author)
    const sql = `
        insert into blogs (title, content, createtime, author)
        values (${title}, ${content}, ${createTime}, ${author});
    `
    return exec(sql).then(insertData => {
        // console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

/**
 * 更新一篇博客
 * @param {博客ID} id 
 * @param {博客数据}} blogData 
 */
const updateBlog = (id, {title, content} = {}) => {
    id = escape(id)
    title = escape(title)
    content = escape(content)
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    const sql = `
        update blogs set title=${title}, content=${content} where id=${id};
    `

    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

/**
 * 删除一篇博客
 * @param {博客ID} id 
 */
const delBlog = (id, author) => {
    id = escape(id)
    author = escape(author)
    // id 就是要更新博客的 id
    const sql = `delete from blogs where id=${id} and author=${author};`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}