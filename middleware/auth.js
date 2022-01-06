const { User } = require("../resources/models/User");


let auth = (req, res, next) => {
    //인증처리를 하는곳

    //클라이언트 쿠키에서, 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화 후, 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        //token, user정보를 server에서 사용하기 위해
        req.token = token;
        req.user = user;
        next();

    })
    //유저 있으면 인증 o

    //유저 없으면 인증 x
}

module.exports = { auth };