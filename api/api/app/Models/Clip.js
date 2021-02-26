"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Clip = new mongoose_1.Schema({
    link: String,
    username: String,
    display_name: String,
    channel: String,
    status: String,
}, {
    timestamps: true,
    strict: true,
});
exports.default = mongoose_1.model('clips', Clip);
//# sourceMappingURL=Clip.js.map