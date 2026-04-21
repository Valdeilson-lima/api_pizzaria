"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const node_stream_1 = require("node:stream");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
class CreateProductService {
    async execute({ name, description, price, category_id, imageBuffer, imageName, }) {
        if (!Number.isInteger(price) || price < 0) {
            throw new Error("Preço inválido. Envie um número inteiro maior ou igual a zero.");
        }
        const categoryAlreadyExists = await prisma_1.default.category.findFirst({
            where: {
                id: category_id,
            },
        });
        if (!categoryAlreadyExists) {
            throw new Error("Categoria não encontrada");
        }
        let bannerUrl = "";
        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.default.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}_${imageName.split(".")[0]}`,
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
                const readableStream = new node_stream_1.Readable();
                readableStream.push(imageBuffer);
                readableStream.push(null);
                readableStream.pipe(uploadStream);
            });
            bannerUrl = result.secure_url;
        }
        catch (error) {
            throw new Error("Erro ao fazer upload da imagem");
        }
        const existingProduct = await prisma_1.default.product.findFirst({
            where: {
                name: name,
            },
        });
        if (existingProduct) {
            throw new Error("Já existe um produto com esse nome");
        }
        const product = await prisma_1.default.product.create({
            data: {
                name: name,
                description: description,
                price: price,
                banner: bannerUrl,
                category_id: category_id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
                category_id: true,
            },
        });
        return product;
    }
}
exports.CreateProductService = CreateProductService;
//# sourceMappingURL=CreateProductService.js.map