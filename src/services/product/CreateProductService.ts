import prismaClient from "../../prisma";
import { Readable } from "node:stream";
import cloudinary from "../../config/cloudinary";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateProductService {
  async execute({
    name,
    description,
    price,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    if (!Number.isInteger(price) || price < 0) {
      throw new Error(
        "Preço inválido. Envie um número inteiro maior ou igual a zero.",
      );
    }

    const categoryAlreadyExists = await prismaClient.category.findFirst({
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
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}_${imageName.split(".")[0]}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        const readableStream = new Readable();
        readableStream.push(imageBuffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });

      bannerUrl = (result as any).secure_url;
    } catch (error) {
      throw new Error("Erro ao fazer upload da imagem");
    }

    const existingProduct = await prismaClient.product.findFirst({
      where: {
        name: name,
      },
    });

    if (existingProduct) {
      throw new Error("Já existe um produto com esse nome");
    }

    const product = await prismaClient.product.create({
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

export { CreateProductService };
