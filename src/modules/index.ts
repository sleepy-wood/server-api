//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}'` : "")
export * from './app.module';
export * from './auth.module';
export * from './file.module';
export * from './global.module';
export * from './service.module';
export * from './user.module';
export * from './util.module';
