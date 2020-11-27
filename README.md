# Rice Coco #

## Table Contents
- [Rice Coco](#rice-coco)
  - [Table Contents](#table-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Tech](#tech)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Deploy](#deploy)
  - [Client](#client-1)
  - [Server](#server-1)
- [Project Process](#project-process)
  - [1주차](#1주차)
  - [2주차](#2주차)
  - [3주차](#3주차)
- [Collaboration principle](#collaboration-principle)
  - [Principle](#principle)
  - [Result](#result)
- [Challenges](#challenges)
    - [기술적 측면](#기술적-측면)
    - [협업적 측면](#협업적-측면)
- [Things to do](#things-to-do)

# Introduction
 - Rice coco는 내 주변 익명의 사람들과의 식사 약속 기능을 제공하는, 위치기반 실시간 소셜 네트워크 앱 서비스입니다.
 - Rice coco는 Rice와 동료를 의미하는 co의 합성어 입니다.
 - 해당 프로젝트는 1주간 Idea Brainstorming & Planning, 2주간의 Development 기간을 걸쳐 총 3명의 인원으로 진행되었습니다.(1명은 일신 상의 사유로 2주차에 중도 하차 하였습니다.)

# Features
- Facebook 소셜 로그인 및 회원가입 기능을 제공합니다.
- 사용자는 가입시 5개의 포인트가 부여되며 상황에 따라 증가 혹은 감소하게 됩니다.(하단에 추가 설명 있음)
- 만남을 희망하고자하는 상대방의 직업군, 나이, 성별을 설정을 통해 필터링을 할 수 있습니다.(사용자도 마찬가지로 상대방의 조건에 따라 필터링 됩니다.)
- 가입 및 설정이 완료되면, 구글 지도에 만남을 희망하고자하는 사람들이 신청해놓은 음식점들의 위치가 밥 모양으로 표시됩니다.
- 지도 우측 하단에 새로고침을 버튼을 누르면, 해당 시점을 기준으로 신청되어있는 음식점들이 업데이트 됩니다.
- 해당 음식점(밥 모양)을 클릭하면 음식점에 대한 간략한 설명과 기다리고 있는 상대방의 닉네임을 확인 할 수 있고 , 참여를 하여 매칭을 성사할 수 있습니다.(포인트가 1개 감소되고, 주변 3km 이내에 있는 음식점만 매칭이 가능합니다.)
- 탭 중앙에 Search 버튼을 클릭하면, 내 주변 3km 이내에 음식점을 검색하여 해당 음식점에서의 만남을 신청 할 수 있습니다. 만남을 신청할 경우, 포인트가 1개 감소합니다.
- (대기자가 있을 경우) 검색한 음식점에 대기자가 있을 경우, 즉시 매칭이 성사됩니다.
- (대기자가 없을 경우) 만남 신청 후 1시간 동안 타임아웃이 실행되고 익명의 상대방으로부터 수락을 받으면, 즉시 매칭이 성사됩니다. 시간 내에 수락을 받지 못한 경우, 종료됩니다.
- 매칭이 성사되면, 실시간으로 서로의 위치가 맵에 표시되고 30분의 타임아웃이 설정됩니다.
- 우측 하단에 대화 버튼을 클릭하면 상대방과 실시간으로 대화할 수 있는 채팅방이 열립니다.
- 시간 안에 음식점 50m 반경 이내에 도착하면 도착 버튼이 생성되고, 해당 버튼을 누르면 포인트가 1개 증가하게 됩니다.
- 양자가 도착 버튼을 누른 상황에서 타임아웃이 종료되면, 상대방을 친구로 추가할 것인지에 대한 질문창이 뜨고 추가하면 상대방을 친구로 등록할 수 있습니다.(그렇지 않은 경우, 다시 메인 지도화면으로 넘어갑니다.)
- 내 정보 창에서 나의 닉네임과 직업을 다시 설정할 수 있고, 선호하는 상대방의 조건을 재설정 할 수 있습니다. 메인 지도에는 해당 재설정한 조건을 기준으로 필터링됩니다.
- 포인트가 0개가 되면 더 이상 만남을 생성하거나 만남에 참여할 수 없게 됩니다. 마이페이지 결제 정보창을 통해 포인트를 구매할 수 있습니다.

# Tech

## Frontend
- ES2015+
- React Native for component-based-architecture
- Redux for state management
- Styled Component for component reusability
- Socket.io for real-time communication
- Google Map API
- Jest for unit-test
- Enzyme for component-test

## Backend
- Node.js
- Express for using Node.js simple and flexible
- MongoDB / MongoDB Atlas for data persistence
- Moongoose for implement MVC pattern
- JSON Web Token Authentication
- Socket.io
- Chai / Sinon for unit-test

# Requirements
 - Android에서만 사용이 가능합니다.
 - Expo 앱을 설치하여야합니다.
# Installation

Local 환경에서 실행을 위해 환경 변수 설정이 필요합니다.

## Client

Root 디렉토리에 environment.js파일에 아래와 같이 환경변수 값을 입력합니다.
- [페이스북 개발자 계정](https://developers.facebook.com/?no_redirect=1)
- [구글 개발자 계정](https://developers.google.com/)

```javascript
// in environment.js in Root directory
{
  REACT_NATIVE_ANDROID_SERVER_URL=<YOUR_SERVER_URL>
  REACT_NATIVE_GOOGLE_PLACES_API_KEY=<YOUR_GOOGLE_PLACES_API_KEY>
  REACT_NATIVE_FACEBOOK_APP_ID=<YOUR_FACEBOOK_API_ID>
}
```

```javascript
git clone https://github.com/daechidongVibe/Rice-coco-frontend.git
cd Rice-coco-frontend
npm install
npm start
```

## Server
Root 디렉토리에 .env파일에 아래와 같이 환경변수 값을 입력합니다.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-  [아임포트](https://www.iamport.kr/getstarted)
```javascript
// in .env in your directory
PORT=<YOUR_PORT_NUMBER>
DB_URL=<YOUR_MONGODB_URL>
JWT_SECRET=<YOUR_JWT_SECRET>
IAMPORT_KEY=<YOUR_IAMPORT_KEY>
IAMPORT_SECRET=<YOUR_IAMPORT_SECRET>
```

```javascript
git clone https://github.com/daechidongVibe/Rice-coco-backend.git
cd Rice-coco-backend
npm install
npm run dev
```
# Deploy

## Client
  - Download apk

## Server
 - AWS Elastic Beanstalk (EB)
 - AWS Code Pipeline for Deployment automation

# Project Process
  ## 1주차
  - 아이디어 결정 + 기술 스택 검토
  - [Figma를 통한 Mockup 작업](https://www.figma.com/file/BkVHNeKMDqsV0hDMkFkC1E/%EB%9D%BC%EC%9D%B4%EC%8A%A4-%EC%BD%94%EC%BD%94-Mock-up?node-id=0%3A1)
  - [LucidChart를 활용한 Database Schema Modeling](https://lucid.app/lucidchart/b58b26aa-50c8-4918-b09f-9ce44058617e/edit?page=0_0#?folder_id=home&browser=icon)
  - [Notion Todo를 활용한 Task Management](https://www.notion.so/5ace08f805444be9bd66d21cfdb07350?v=f22ec679cde14f45b539c8b8dfd04856)
  - Git을 이용한 Version관리 원칙 설정 (Client/Server 분리, Branch 분리)
  ## 2주차
  - React native Navigation 구조 설계
  - Social Login & JWT 토큰 로그인 구현
  - 유저 정보 등록 및 선호하는 파트너 조건 필터링 DB 쿼리 작업
  - Google API를 통한 실시간 위치 확인 및 검색 기능
  - 실시간 채팅 및 위치 정보 공유를 위한 Socket 연결
  - WebView 및 Iamport를 통한 포인트 결제 기능 구현
  ## 3주차
  - Refactoring & Debugging
  - Front & Backend Test code 작성
  - 프론트 App Build 및 배포
  - AWS Elastic Beanstalk를 활용한 백엔드 서버 배포

# Collaboration principle
 ## Principle
  1. 깃 커밋 메시지 통일 [(커밋 메시지 Reference)](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)
  2. 리팩토링 전까지 타인의 변수명 임의 변경 금지
  3. 각자 하루에 맡은 테스크 다음날 오전에 팀원이 확인할 수 있도록 Pull request 해놓기
  4. 팀원 Pull Request시 간단한 코드 리뷰
  5. Pull Request전 불필요한 콘솔 주석 제거
  6. 
 ## Result

# Challenges
### 기술적 측면
### 협업적 측면

# Things to do
  -