/**
 * 获取博客列表
 * @param {作者} author 
 * @param {关键字} keyword 
 */
const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）

    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1575910161772,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1575910204590,
            author: 'lisi'
        }
    ]
}

/**
 * 获取博客详情
 * @param {博客ID} id 
 */
const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1575910161772,
        author: 'zhangsan'
    }
}

/**
 * 新建一篇博客
 * @param {新建博客的数据} blogData 
 */
const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    return {
        id: 3  // 表示新建博客，插入到数据库表里面的ID
    }
}

/**
 * 更新一篇博客
 * @param {博客ID} id 
 * @param {博客数据}} blogData 
 */
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    return true
}

/**
 * 删除一篇博客
 * @param {博客ID} id 
 */
const delBlog = (id) => {
    // id 就是要更新博客的 id

    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}