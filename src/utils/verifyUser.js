import jwt from 'jsonwebtoken';

export const verifyUser = async req => {
    req.user = null;
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'mysecretkey');
            if (decoded) {
                req.user = decoded;
            }
        }
    } catch (error) {
        throw error;
    }
};