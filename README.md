```
npx create-nx-workspace@latest

npx: 198 安装成功，用时 33.521 秒
? Workspace name (e.g., org name)     my-nx
? What to create in the new workspace angular-nest      [a workspace with a full stack application (Angular + Nest)]
? Application name                    mynx
? Default stylesheet format           SASS(.scss)  [ http://sass-lang.com   ]
Creating a sandbox with Nx...


npm install -g @nrwl/cli

```

```
nx serve mynx
nx serve api

npm run nx -- serve mynx
npm run nx -- serve api

```

```
npm install --save @angular/material @angular/cdk @angular/animations
npm install --save hammerjs
npm install material-design-icons


```


```
ng generate component heroes
ng g c no-auth --module=app

ng generate service hero

ng generate module CustomerDashboard

ng generate module app-routing --flat --module=app

ng generate module my-module --routing

```

```
npm i

npm start

npm run build:prod

```

# Nest
```

npm i -g @nestjs/cli
nest new my-nest

npm run start:debug


nest g module cats
nest g controller cats
nest g service cats 


http://localhost:3000/


npm i --save-dev @nestjs/testing


npm install --save @nestjs/passport passport passport-jwt passport-http-bearer

npm install --save @nestjs/typeorm typeorm mysql


npm install --save js-sha256
npm install --save @hapi/joi
npm install --save class-validator class-transformer
npm install --save chalk


```

```
npm i typeorm-model-generator@no-engines
# npm i -g typeorm-model-generator
"db": "npx typeorm-model-generator -h localhost -d my_nx -p 3306 -u root -x admin888 -e mysql -o libs/entities --noConfig true --ce pascal --cp camel",


"scripts": {
  "db": "rm -rf entities & npx typeorm-model-generator -h localhost -d testdabase -p 3306 -u root -x root -e mysql -o entities --noConfig true --ce pascal --cp camel"
}

rm -rf entities表示先删除文件夹entities
npx typeorm-model-generator如果全局安装了就不需要加npx没有全局安装就加上去
-h localhost -d 数据库名字 -p 端口 -u 用户名 -x 密码 -e 数据库类型
-o entities表示输出到指定的文件夹
--noConfig true表示不生成ormconfig.json和tsconfig.json文件
--ce pascal表示将类名转换首字母是大写的驼峰命名
--cp camel表示将数据库中的字段比如create_at转换为createAt
-a 表示会继承一个BaseEntity的类,根据自己需求加


npm run db


```

```
nx g @nrwl/workspace:lib entities
nx g @nrwl/workspace:lib repositories
```


https://www.npmjs.com/package/typeorm-model-generator
https://blog.csdn.net/kuangshp128/article/details/98062662


# MyNx

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@my-nx/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
