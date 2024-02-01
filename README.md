로컬 환경에서 develop api 서버에 연결하여 개발 테스트
```
npm run start
```
개발서버 / 운영서버 분리
- develop 브랜치에 push -> 도커허브에 g6y116/damon-fe:dev 이미지 push -> ssh로 develop ec2에 접근하여 pull -> docker-compose up -d
- main 브랜치에 push -> 도커허브에 g6y116/damon-fe:prod 이미지 push -> ssh로 main ec2에 접근하여 pull -> docker-compose up -d

***


개발서버 퍼블릭 IPv4 DNS
```
ec2-13-209-207-54.ap-northeast-2.compute.amazonaws.com
```

운영서버 퍼블릭 IPv4 DNS
```
ec2-15-165-114-166.ap-northeast-2.compute.amazonaws.com
```