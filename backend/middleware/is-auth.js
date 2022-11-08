import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const passedToken = req.cookies.jwt

    try {
        const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET)

        req.userName = decodedToken.userName;
        req.userId = decodedToken.userId;

        return next()
    } catch (error) {
        console.log("JWT verification error:", error.message);
        res.sendStatus(401);
    };
};