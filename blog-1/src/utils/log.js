const fs = require('fs')
const path = require('path')
// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')  // 关键代码
}

// 生成 write stream
function createWriteStream(fillName) {
    const fullFileName = path.join(__dirname, '../','../','logs',fillName);
    const writeStream  = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })

    return writeStream
}


// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    // 在此处可以判断环境控制是否写入日志
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}

/**
 * 日志拆分
 * 使用linux下的crontab 实现定时任务
 *  设置定时任务， 格式： *****command； *1: 分钟； *2，小时；*3:日期；*4:月份； *5：星期
 *  示例： 1.将acess.log拷贝并重命名为 2020-01-01.access.log; 2.清空access.log文件，继续积累日志
 * crontab -e: 编辑
 * 每天的00:00执行相应目录下的脚本
 * * 0 * * * sh /Users/guozhen/work/nodeBlog/blog-1/src/utils/copy.sh
 * crontab -l: 查看当前执行的任务
 * 
 * 日志分析
 * 如： 针对access.log日志，分析Chrome的占比
 * 使用node.js的readline(基于stream， 效率高)
 */