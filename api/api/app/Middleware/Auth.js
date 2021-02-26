"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class Auth {
    async handle({ request, response }, next) {
        const authorizationTokenHeader = request.header('authorization');
        if (!authorizationTokenHeader) {
            return response.unauthorized({
                success: false,
                message: 'Please, log in to proceed',
            });
        }
        const decodedToken = jsonwebtoken_1.default.decode(authorizationTokenHeader.replace('Bearer ', ''));
        if (!decodedToken) {
            return response.unauthorized({
                success: false,
                message: 'Please, log in to proceed',
            });
        }
        request.user = await User_1.default.findById(decodedToken);
        await next();
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map