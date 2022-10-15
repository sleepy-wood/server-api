//@index('./*.ts', f => f.path !== `./index` ? `export * from '${f.path}'` : "")
export * from './auth.controller';
export * from './file.controller';
export * from './user.controller';
