1. detail페이지 img가 창크기에 따라 사진의 일부가 안보임
2. css, html : classname 변경 및 정리

### 개선사항

1. 라우터의 "/"가 2개일 경우 css,js,img이 실행X

- `app.use(express.static(initial_path)); -> app.use('/static', express.static('resources'));`
- `<script src="js/api.js"></script> -> <script src="/static/js/api.js"></script>`

2. mogndb

- npm install mongoose --save
- useNewUrlParser, useUnifiedTopology, useFindAndModify 및 useCreateIndex는 더 이상 지원되지 않는 옵션입니다. 제거하면 오류가 덜 생김.
- Error on DB Connection:MongooseServerSelectionError: Invalid message siz
  e: 1347703880, max allowed: 67108864
  ```javascript
  mongoose.connect("mongodb://localhost:5000", {}); ->
  mongoose.connect("mongodb://localhost", {});
  ```

윹
mongodb+srv://<username>:<password>@cluster0.ybfcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

git rm -cached node_modules -r : git add 한 node_modules 취소
