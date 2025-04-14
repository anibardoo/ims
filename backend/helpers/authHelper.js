import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken';


export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Cost factor directly passed
        return hashedPassword;
    } catch (error) {
        console.error("Error while hashing password:", error);
        throw new Error("Password hashing failed"); // Error thrown for proper flow
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword); // Comparison result returned
    } catch (error) {
        console.error("Error while comparing password:", error);
        throw new Error("Password comparison failed"); // Error thrown for proper flow
    }
};
