# 通用后台管理系统

基于Vue 3、TypeScript、Element Plus等现代前端技术栈构建的企业级后台管理系统。

## 项目概述

本项目旨在开发一个功能完整、易于扩展的通用后台管理系统，遵循企业级开发最佳实践，提供可扩展、可维护的后台管理解决方案。

## 技术栈

- Vue 3
- TypeScript
- Element Plus
- Pinia
- Vue Router
- Vite
- Axios

## 项目结构

```
src/
├── api/                    # 接口请求封装
├── assets/                 # 静态资源文件
├── components/             # 全局公共组件
├── composables/            # Vue组合式API封装
├── directives/             # 自定义指令
├── hooks/                  # 自定义Hooks
├── layouts/                # 页面布局组件
├── locales/                # 国际化资源
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── styles/                 # 全局样式文件
├── utils/                  # 工具函数库
├── views/                  # 页面视图组件
├── App.vue                 # 根组件
└── main.ts                 # 入口文件
```

## 项目设置

```sh
npm install
```

### 开发环境

```sh
npm run dev
```

### 生产环境构建

```sh
npm run build
```

### 单元测试

```sh
npm run test:unit
```
