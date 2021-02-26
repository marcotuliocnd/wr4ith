"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clip_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Clip"));
const ClipStoreValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClipStoreValidator"));
const ClipVoteValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClipVoteValidator"));
class ClipsController {
    async store({ response, request }) {
        const data = await request.validate(ClipStoreValidator_1.default);
        await Clip_1.default.create({ ...data, status: 'pending' });
        return response.json({
            success: true,
            message: 'The provided clip was stored successfully',
        });
    }
    async list({ request, response }) {
        const { page = 1, limit = 10 } = request.get();
        const { user } = request;
        const data = await Clip_1.default.find({ channel: user?.channel })
            .limit(parseInt(limit, 10))
            .skip(parseInt(page, 10) !== 1 ? parseInt(limit, 10) * parseInt(page, 10) : 0);
        return response.json({
            success: true,
            data,
        });
    }
    async vote({ request, response, params }) {
        const { clip_id: clipId } = params;
        const { user } = request;
        const { status } = await request.validate(ClipVoteValidator_1.default);
        const data = await Clip_1.default.findOne({
            id: clipId,
            channel: user?.channel,
        });
        if (!data) {
            return response.notFound({ success: false, message: 'Clip not found' });
        }
        data.status = status;
        await data.save();
        return response.json({
            success: true,
            data,
        });
    }
}
exports.default = ClipsController;
//# sourceMappingURL=ClipsController.js.map