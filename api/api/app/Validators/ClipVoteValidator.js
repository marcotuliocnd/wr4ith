"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ClipVoteValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            status: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = ClipVoteValidator;
//# sourceMappingURL=ClipVoteValidator.js.map