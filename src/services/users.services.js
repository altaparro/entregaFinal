import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

class UserService {
    async registerUser(userData) {
        const userExists = await UserRepository.getUserByEmail(userData.email); 
        if (userExists) throw new Error("El e-mail ingresado ya está en uso."); 

        const newCart = await CartRepository.createCart(); 
        console.log("ESTO TIENE USERDATA: ", userData);
        userData.cart = newCart._id;
        userData.password = createHash(userData.password); 
        return await UserRepository.createUser(userData); 
    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email); 
        if (!user || !isValidPassword(password, user)) throw new Error("Los datos ingresados son incorrectos.");
        return user; 
    }
}

export default new UserService();
