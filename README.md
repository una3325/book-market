**폴더 구조*
```
📦book-market
 ┣ 📂routes
 ┃ ┣ 📜books.js
 ┃ ┣ 📜carts.js
 ┃ ┣ 📜likes.js
 ┃ ┣ 📜orders.js
 ┃ ┗ 📜users.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜mariadb.js
 ┣ 📜package-lock.json
 ┗ 📜package.json*
```


**모듈 설치**
```
npm install dotenv express express-validator http-status-codes jsonwebtoken mysql2
```

**.env**
```
#서버 포트 넘버
PORT = 0000 
#jwt 발행 키
PRIVATE_KEY = "PRIVATE_KEY" 
```

