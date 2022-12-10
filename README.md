![banner](https://github.com/sleepy-wood/server-api/blob/dev/server-api.png)

# server-api

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

<div align="center">
  <a href="https://github.com/sleepy-wood">
    <img src="https://github.com/sleepy-wood/client-web/blob/dev/src/assets/images/logo.png" alt="Logo" width="120" height="120">
  </a>
  <h3 align="center">Sleepywood API Server</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://github.com/sleepy-wood/server-api/blob/dev/server.drawio.png" alt="project" width=480 />
</div>

1) NestJS Server
   - NestJS는 NodeJS에서 새롭게 떠오르는 Server Application 구축용 프레임워크이다. 
   - Typescript의 적극적인 도입과 DI(Dependency Injection), IoC(Inversion of Control), Module을 통한 구조화 등의 기술을 통해 생산적인 개발에 용이하다. 
   - 효율성, 안정성, 확장성 등에서 용이한 모습을 보여주고 있기 때문에 본 프로젝트에 NestJS를 Server Framework로 활용하였다.

2) 35개의 Database Table
   - NestJS와 TypeORM을 활용해서 객체와 관계형 데이터베이스의 데이터를 자동으로 매핑해줬다. 
   - TypeORM의 경우 모델의 정의를 올바르게 했을 경우에 데이터베이스 타입정의에 메리트를 최대한으로 얻을 수 있으며, 복잡한 모델간의 관계를 형성할 수 있는 장점이있다. 
   - 이를 통하여서 우리의 총체적인 어플리케이션 구현을 위한 35개의 관계형 테이블을 설계하였다.

3) 111개의 RESTful API 문서화
   - 클라이언트 개발자와 원활한 의사소통을 위해서 API 명세서를 작성하는 것은 필수적인 작업 중 하나이다.
   - 잘 정리되어 있는 문서는 팀의 생산성을 높여줄 수 있다.
   - Swggaer를 사용해서 자동으로 우리의 RESTful API를 문서화 하였으며, 최종적으로 총 111개의 API를 문서화하였다.

### Built With

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![NestJS](https://img.shields.io/badge/nestJS-E0234E?style=for-the-badge&logo=nestJS&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

1. npm
  ```bash
  npm i -g npm@latest
  ```
2. redis-server
3. ffmpeg
4. mysql
5. .env
6. yarn

### Installation

1. Clone the repo
  ```bash
  git clone https://github.com/sleepy-wood/server-api.git
  ```
2. Install NPM packages
  ```bash
  yarn
  ```
3. Run App
  ```bash
  yarn start:dev
  ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

[contributors-shield]: https://img.shields.io/github/contributors/sleepy-wood/server-api.svg?style=for-the-badge
[contributors-url]: https://github.com/sleepy-wood/server-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sleepy-wood/server-api.svg?style=for-the-badge
[forks-url]: https://github.com/sleepy-wood/server-api/network/members
[stars-shield]: https://img.shields.io/github/stars/sleepy-wood/server-api.svg?style=for-the-badge
[stars-url]: https://github.com/sleepy-wood/server-api/stargazers
[license-shield]: https://img.shields.io/github/license/sleepy-wood/server-api.svg?style=for-the-badge
[license-url]: https://github.com/sleepy-wood/server-api/blob/master/LICENSE.txt
