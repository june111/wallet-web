# HD wallet demo (web)

<p align="center">
   	<a href="https://travis-ci.com/june111/wallet-web" rel="nofollow">
    	<img src="https://travis-ci.com/june111/wallet-web.svg?branch=master" alt="Build Status" />
  	</a>
	<a href="https://github.com/vuejs/vue">
    	<img src="https://img.shields.io/badge/vue-2.5.21-brightgreen.svg" alt="vue" />
  	</a>
  	<a href="https://github.com/ElemeFE/element">
    	<img src="https://img.shields.io/badge/element--ui-2.4.10-brightgreen.svg" alt="element-ui" />
  	</a>
	<a href="https://codebeat.co/projects/github-com-june111-wallet-web-master">
		<img src="https://codebeat.co/badges/a10a9b6b-6ac0-42e5-a8de-64d4ac7062c5" alt="codebeat badge" />
	</a>
</p>

[English](./README.md) | 简体中文

## 介绍

网页版的 HD (Hierarchical Deterministic) wallet demo

demo线上版本： [http://blog.junezhu.top/wallet-web/](http://blog.junezhu.top/wallet-web/)

## 功能

* 生成 BIP32 Hierarchical deterministic (HD) 地址
* 通过导出助记词、私钥、keystore 来备份钱包
* 通过导入助记词、私钥、keystore 来导入钱包
* 基于设备的安全性：所有私钥都存储在本地，而不是存储在云上
* 转账与收款
* 离线生成二维码
* 自定义钱包名称

## 作者

**June** -> [email](mailto:ru-q-ur@163.com)

## 开发
```bash
# 安装依赖
npm install
# 启动服务
npm run dev
```

浏览器访问 : http://localhost:8080/wallet-web/ 

## 发布
```bash
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


