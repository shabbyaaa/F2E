// 全局的应用程序配置 对数据进行处理
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  // apiKey: process.env.API_KEY,
});
