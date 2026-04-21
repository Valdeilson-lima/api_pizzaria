"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
class CreateProductController {
    async handle(req, res) {
        const { name, description, price, category_id } = req.body;
        const parsedPrice = Number(price);
        if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
            throw new Error("Preço inválido. Envie um número inteiro maior ou igual a zero.");
        }
        if (!req.file) {
            throw new Error("Imagem do produto é obrigatória");
        }
        const createProductService = new CreateProductService_1.CreateProductService();
        const product = await createProductService.execute({
            name: name,
            description: description,
            price: parsedPrice,
            category_id: category_id,
            imageBuffer: req.file.buffer,
            imageName: req.file.originalname,
        });
        return res.json(product);
    }
}
exports.CreateProductController = CreateProductController;
//# sourceMappingURL=CrateProductController.js.map