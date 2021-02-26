"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = new mongoose_1.Schema({
    username: String,
    password: String,
    channel: String,
}, {
    timestamps: true,
    strict: true,
});
User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
User.methods.comparePassword = function (candidatePassword) {
    return bcrypt_1.default.compareSync(candidatePassword, this.password);
};
exports.default = mongoose_1.model('users', User);
//# sourceMappingURL=User.js.map