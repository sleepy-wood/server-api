import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { path } from 'app-root-path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { performance } from 'perf_hooks';

import * as Entities from './entities';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { AppModule } from './modules/common/app.module';
import { ClusterService } from './services';
import { logger } from './utils/logger';

declare const module: any;

const startTime = performance.now();

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isContainer = env === 'container';

logger.log(` * imports done in ${(performance.now() - startTime).toFixed(3)}ms`);
logger.log(` * Memory: ${readMemory()}`);

function readMemory() {
  const memory = process.memoryUsage();
  const convert = { Kb: (n: number) => n / 1024, Mb: (n: number) => convert.Kb(n) / 1024 };
  const toHuman = (n: number, t: string) => `${convert[t](n).toFixed(2)}${t}`;
  return `Used ${toHuman(memory.heapUsed, 'Mb')} of ${toHuman(memory.heapTotal, 'Mb')} - RSS: ${toHuman(
    memory.rss,
    'Mb',
  )}`;
}

async function bootstrap() {
  const localIp = '127.0.0.1';
  const port = Number(process.env.PORT) ?? 3000;

  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
    logger,
    cors: {
      origin: isDev ? true : 'https://team-buildup.shop',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          imgSrc: [`'self'`, '*.googleapis.com', '*.jsdelivr.net', 'blob:', 'data:', 'validator.swagger.io'],
          styleSrc: [`'self'`, '*.googleapis.com', '*.jsdelivr.net', `'unsafe-inline'`],
          fontSrc: [`'self'`, '*.googleapis.com', '*.jsdelivr.net'],
          scriptSrc: [`'self'`, '*.googleapis.com', '*.jsdelivr.net', `https: 'unsafe-inline'`, `'unsafe-eval'`],
        },
      },
    }),
  );
  app.use(compression());
  app.use(cookieParser());

  app.useStaticAssets(join(path, 'uploads/secure'), {
    index: false,
    redirect: false,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  generateSwagger(app, localIp, port);

  await app.listen(port, () => {
    logger.log(`┌──────────────────────────────────────────────────────────────┐`);
    logger.log(`│   🟢 Starting: ${new Date().toISOString()}                      │`);
    if (isDev) logger.log(`│   🟢 The http server is listening on local ${localIp}         │`);
    else logger.log(`│   🟢 The https server is listening on 'https://team-buildup.shop │`);
    logger.log(`│   🟢 The http server is listening on port ${port}.              │`);
    logger.log(`└──────────────────────────────────────────────────────────────┘`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

if (isDev || isContainer) bootstrap();
else ClusterService.init(bootstrap);

function generateSwagger(app: NestExpressApplication, localIp: string, port: number) {
  const config = new DocumentBuilder()
    .setTitle('메타버스 슬리피우드 어플리케이션')
    .setDescription('<h4>슬리피우드 REST APIs</h4><h5>nestJS</h5><h5>written by PIYoung</h5>')
    .setVersion('1.0.0')
    .addServer(isDev ? `http://${localIp}:${port}` : 'https://team-buildup.shop')
    // common
    .addTag('auth', '권한 REST APIs')
    .addTag('files', '파일 업로드 REST APIs')
    .addTag('users', '사용자 REST APIs')
    // app
    .addTag('bridges', '다리 REST APIs')
    .addTag('items', '아이템 REST APIs')
    .addTag('lands', '랜드 REST APIs')
    .addTag('land-decorations', '랜드 데코레이션 REST APIs')
    .addTag('sleeps', '수면 REST APIs')
    .addTag('trees', '나무 REST APIs')
    // shop
    .addTag('carts', '쇼핑몰 장바구니 REST APIs')
    .addTag('orders', '쇼핑몰 주문 REST APIs')
    .addTag('products', '쇼핑몰 상품 REST APIs')
    .addTag('reviews', '쇼핑몰 리뷰 REST APIs')
    .addTag('wishlists', '쇼핑몰 관심 상품 REST APIs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: Object.entries(Entities).map(([name, entity]) => entity),
  });
  const SnippetGeneratorPlugin = {
    statePlugins: {
      spec: {
        wrapSelectors: {
          requestFor: (ori: any, system: any) => (state: any, _path: any, method: any) => {
            return ori(_path, method)
              ?.set('spec', state.get('json', {}))
              ?.setIn(['oasPathMethod', 'path'], _path)
              ?.setIn(['oasPathMethod', 'method'], method);
          },
          mutatedRequestFor: (ori: any) => (state: any, _path: any, method: any) => {
            return ori(_path, method)
              ?.set('spec', state.get('json', {}))
              ?.setIn(['oasPathMethod', 'path'], _path)
              ?.setIn(['oasPathMethod', 'method'], method);
          },
        },
      },
    },
    fn: {
      requestSnippetGenerator_csharp_httpclient: (req: any) => {
        const { spec, oasPathMethod } = req.toJS();
        const { path, method } = oasPathMethod;
        const targets = ['csharp_httpclient'];

        let snippet: string;
        try {
          snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
        } catch (err) {
          console.log(err);
          snippet = JSON.stringify({ err });
        }

        return snippet;
      },
      requestSnippetGenerator_node_native: (req: any) => {
        const { spec, oasPathMethod } = req.toJS();
        const { path, method } = oasPathMethod;
        const targets = ['node_native'];

        let snippet: string;
        try {
          snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
        } catch (err) {
          snippet = JSON.stringify({ err });
        }

        return snippet;
      },
      requestSnippetGenerator_javascript_xhr: (req: any) => {
        const { spec, oasPathMethod } = req.toJS();
        const { path, method } = oasPathMethod;
        const targets = ['javascript_xhr'];

        let snippet: string;
        try {
          snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
        } catch (err) {
          snippet = JSON.stringify({ err });
        }

        return snippet;
      },
      requestSnippetGenerator_python_python3: (req: any) => {
        const { spec, oasPathMethod } = req.toJS();
        const { path, method } = oasPathMethod;
        const targets = ['python_python3'];

        let snippet: string;
        try {
          snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
        } catch (err) {
          console.log(err);
          snippet = JSON.stringify({ err });
        }

        return snippet;
      },
      requestSnippetGenerator_python_requests: (req: any) => {
        const { spec, oasPathMethod } = req.toJS();
        const { path, method } = oasPathMethod;
        const targets = ['python_requests'];

        let snippet: string;
        try {
          snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
        } catch (err) {
          console.log(err);
          snippet = JSON.stringify({ err });
        }

        return snippet;
      },
    },
  };
  SwaggerModule.setup('/api/api-docs', app, document, {
    explorer: true,
    customSiteTitle: '슬리피우드 API 문서',
    customfavIcon: '/resources/swagger-favicon/favicon.ico',
    customCssUrl: '/resources/swagger-themes/3.x/theme-feeling-blue.css',
    customJs: '/resources/swagger-js/index.js',
    swaggerOptions: {
      plugins: [SnippetGeneratorPlugin],
      docExpansion: 'none', // "list"*, "full", "none"
      persistAuthorization: true,
      requestSnippetsEnabled: true,
      requestSnippets: {
        generators: {
          csharp_httpclient: {
            title: 'C#',
            syntax: 'csharp',
          },
          node_native: {
            title: 'Node',
            syntax: 'javascript',
          },
          javascript_xhr: {
            title: 'XHR',
            syntax: 'javascript',
          },
          python_python3: {
            title: 'python-client',
            syntax: 'python',
          },
          python_requests: {
            title: 'python-requests',
            syntax: 'python',
          },
        },
        languages: [
          'curl_bash',
          'csharp_httpclient',
          'node_native',
          'javascript_xhr',
          'python_python3',
          'python_requests',
        ],
      },
      syntaxHighlight: {
        activate: true,
        theme: 'nord',
      },
    },
  });
}
