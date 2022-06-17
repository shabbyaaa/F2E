# webpack知识点

## PostCSS

PostCSS是一个用JavaScript工具和插件转化CSS代码的工具

- autoprefixer: 自动补全浏览器私有前缀
- precss: CSS预处理（整合Sass,less或stylus功能，语法基本和Sass相同）
- postcss-import: 通过@import，整合多个CSS文件
- node-pixren: 让IE8支持rem单位
- postcss-pseudoelements: 将伪元素的`::`转换为`:`（IE8不支持`::`）

## postcss-preset-env

支持现代的CSS语法
该插件可以代替PostCSS，其内部依赖有PostCSS

```
