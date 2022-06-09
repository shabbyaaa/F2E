yarn upgrade --latest

webpack、webpack-dev-server
- devServer启动命令修改为webpack server，--env=development改为--env env=development
- dev配置参数调整（static、client、onBeforeSetupMiddleware等）

loader
- 静态文件loader使用type: 'asset'替代
- eslint-loader调整为eslint-webpack-plugin，对应parser把babel-eslint调整为@babel/eslint-parser
- loader的配置options修改，如less-loader、postcss-loader等

plugin
- CleanWebpackPlugin不再需要，webpack5里面output有一个clean的选项可以替代
- 使用terser-webpack-plugin替代uglify
- 使用mini-css-extract-plugin、css-minimizer-webpack-plugin压缩生成的CSS
- 使用webpack.optimize.MinChunkSizePlugin控制chunk的最小字符数

库
- react-router-dom、mobx、mobx-react仍然使用5.x，不要升级
- 使用dayjs替代moment
- 使用@loadable/component替代bundle-loader或者react的Suspense
- babel-plugin-react-css-modules不再维护，社区有一个版本@dr.pogodin/babel-plugin-react-css-modules
- enzyme对react的适配只有到16的版本enzyme-adapter-react-16，社区有一个17的@wojtekmaj/enzyme-adapter-react-17
- jest mock文件写法调整，参考https://jestjs.io/docs/code-transformation