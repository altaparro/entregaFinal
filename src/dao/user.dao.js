import UserModel from "./models/user.model.js";

class UserDao {
    async findById(id) {
        return await UserModel.findById(id); 
    }

    async findOne(query) {
        return await UserModel.findOne(query); 
    }

    async save(userData) {
        const newUser = new UserModel(userData); 
        return await newUser.save(); 
    }
}

export default new UserDao();
