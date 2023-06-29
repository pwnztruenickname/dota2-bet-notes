const { codegen } = require('swagger-axios-codegen')
codegen({
    remoteUrl: 'http://localhost:8000/swagger/v1/swagger.json',
    outputDir: './src/shared/api',
    useStaticMethod: true,
    fileName: 'api.ts',
})
