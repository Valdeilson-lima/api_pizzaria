import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, category_id } = req.body;

    const parsedPrice = Number(price);

    if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
      throw new Error("Preço inválido. Envie um número inteiro maior ou igual a zero.");
    }

    if (!req.file) {
      throw new Error("Imagem do produto é obrigatória");
    }

    const createProductService = new CreateProductService();
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

export { CreateProductController };
