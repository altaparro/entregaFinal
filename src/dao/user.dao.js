import UserModel from "./models/user.model.js";

class UserDao {
    async findById(id) {
        return await UserModel.findById(id); 
    }

    async findOne(query) {
        return await UserModel.findOne(query); 
    }

    async save(userData) {
        const newUser = new UserModel(userData); // Cambié el nombre de la variable para mayor claridad
        return await newUser.save(); 
    }
}

export default new UserDao();
