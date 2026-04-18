"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserControler = void 0;
const DetailUserService_1 = require("../../services/user/DetailUserService");
class DetailUserControler {
    async handle(req, res) {
        const userId = req.userId;
        const detailUserService = new DetailUserService_1.DetailUserService();
        const user = await detailUserService.execute(userId);
        res.status(200).json(user);
    }
}
exports.DetailUserControler = DetailUserControler;
//# sourceMappingURL=DetailUserControler.js.map