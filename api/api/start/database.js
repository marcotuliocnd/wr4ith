"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
mongoose_1.default.connect(Env_1.default.get('DATABASE_URI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=database.js.map