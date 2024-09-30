import UserService from "../services/users.services.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {
    async register(req, res) {
        const { first_name, last_name, email, cart_id, age } = req.body;

        try {
            const newUser = await UserService.registerUser({ first_name, last_name, email, cart_id, age });

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                role: newUser.role
            }, "backendDos", { expiresIn: "1h" });

            res.cookie("tokenCookie", token, { maxAge: 3600000, httpOnly: true });
            res.redirect("/api/sessions/profile");
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send("Ocurrió un problema al registrar el usuario. Por favor, intenta nuevamente.");
        }
    }

    async login(req, res) {
        const { email, password, cartId } = req.body;

        try {
            const user = await UserService.loginUser(email, password, cartId);

            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role,
                cart: user.cartId
            }, "backendDos", { expiresIn: "1h" });

            res.cookie("tokenCookie", token, { maxAge: 3600000, httpOnly: true });
            req.session.user = user;
            req.session.login = true;
            res.redirect("/api/sessions/profile");
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send("Ocurrió un problema al iniciar sesión. Por favor, intenta nuevamente.");
        }
    }

    async current(req, res) {
        if (req.user) {
            const userDTO = new UserDTO(req.user);
            res.render("profile", { user: userDTO });
        } else {
            res.status(401).send("No autorizado");
        }
    }

    async failed(req, res) {
        res.render("failed");
    }

    async githubCallback(req, res) {
        req.session.user = req.user;
        req.session.login = true;
        res.redirect("/api/sessions/profile");
    }

    logout(req, res) {
        res.clearCookie("tokenCookie");
        res.clearCookie("connect.sid");
        res.redirect("/");
    }
}

export default new UserController();
