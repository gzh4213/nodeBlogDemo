const querystring = require('querystring')


// 处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }

    if(req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      if(!postData){
        resolve({})
        return;
      }

      resolve(JSON.parse(postData))
    })
  })

  return promise;
}

// 项目底层业务请求层处理
const serverHandle = (req, res) => {
  // 设置返回文件格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取 URL
  const url = req.url

  // 获取 path
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 获取post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 未命中路由， 返回404
    // res.writeHead(404, {
    //   "content-type": "text/plain"
    // })

    // res.write("404 Not Found\n")
    res.end(JSON.stringify({env: process.env.NODE_ENV}))
  })
}

module.exports = serverHandle