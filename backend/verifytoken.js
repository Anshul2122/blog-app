const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) { 
        return res.status(401).josn("you are not authenticated");
    }
    jwy.verify(token, process.env.SECRET, async (err, data) => {
        if (err) {
            return res.status(403).json("token is not valid!");
        }
        req.userId = data._id;
        next();
    })
}

module.exports = verifyToken;