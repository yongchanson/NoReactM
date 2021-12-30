1. detail페이지 img가 창크기에 따라 사진의 일부가 안보임
2. css, html : classname 변경 및 정리


### 개선사항

1. 라우터의 "/"가 2개일 경우 css,js,img이 실행X
  - `app.use(express.static(initial_path)); -> app.use('/static', express.static('resources'));`
  - `<script src="js/api.js"></script> -> <script src="/static/js/api.js"></script>`