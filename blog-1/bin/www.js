const http = require('http')
const port = 8000;
const serverHandle = require('../app')
const server = http.createServer(serverHandle)

server.listen(port, () => {
  console.log(`server is running on ${port}`)
})