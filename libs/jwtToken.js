const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const createToken = (user) => {
    const newToken = jwt.sign(
        { userId: user },
        jwtSecret,
        { expiresIn: '1h' }
    )
    return newToken;
}

const checkToken = (req) => {
    if (!req.headers.authorization) {
        return false;
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        var decoded = jwt.verify(token, jwtSecret);
        return true;
    } catch (err) {
        return false;
    }
}

export default { createToken, checkToken }