"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ClipStoreValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            link: Validator_1.schema.string(),
            username: Validator_1.schema.string(),
            display_name: Validator_1.schema.string(),
            channel: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = ClipStoreValidator;
//# sourceMappingURL=ClipStoreValidator.js.map