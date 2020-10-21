import jwt from "jsonwebtoken";

const generateToken = (id) => {
    // Generate a token that expires in 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

export default generateToken;