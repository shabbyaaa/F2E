'use strict';

require('babel-register'); // 将babel注册到node环境中 并开始编译 require 的所有文件  node register.js
require('./index.js'); // 不能在你要编译的文件内同时注册babel 因为node会在babel编译它之前就将它执行了