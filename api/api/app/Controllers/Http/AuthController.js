"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const RegisterValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/RegisterValidator"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LoginValidator"));
class AuthController {
    async login({ request, response }) {
        const { username, password } = await request.validate(LoginValidator_1.default);
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return response.notFound({
                success: false,
            });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return response.notFound({
                success: false,
            });
        }
        const { password: pass, ...data } = user.toJSON();
        return response.json({
            success: true,
            data: {
                user: data,
                token: this.generateToken(user.id),
            },
        });
    }
    async register({ request, response }) {
        const userData = await request.validate(RegisterValidator_1.default);
        const user = new User_1.default(userData);
        await user.save();
        return response.json({
            success: true,
            data: user,
        });
    }
    generateToken(payload = {}) {
        return {
            type: 'bearer',
            token: jsonwebtoken_1.default.sign(payload, Env_1.default.get('APP_KEY')),
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map