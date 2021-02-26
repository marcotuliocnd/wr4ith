"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { status: 'running' };
});
Route_1.default.group(() => {
    Route_1.default.post('/', 'ClipsController.store');
    Route_1.default.get('/', 'ClipsController.list');
    Route_1.default.patch('/:clip_id', 'ClipsController.vote');
})
    .prefix('clips')
    .middleware(['auth']);
Route_1.default.group(() => {
    Route_1.default.post('/register', 'AuthController.register');
    Route_1.default.post('/login', 'AuthController.login');
}).prefix('auth');
//# sourceMappingURL=routes.js.map