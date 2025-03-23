import JWT from "jsonwebtoken";

//protect routes
export const requireSignIn = async (req, res, next) => {
    try {
        const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        
    }
}