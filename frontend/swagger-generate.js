const { generateApi } = require('swagger-typescript-api')
const { resolve } = require('path')

generateApi({
  name: 'api.ts',
  output: resolve(process.cwd(), 'src/api'),
  url: 'http://localhost:8000/swagger/v1/swagger.json',
  httpClientType: 'axios',
})
