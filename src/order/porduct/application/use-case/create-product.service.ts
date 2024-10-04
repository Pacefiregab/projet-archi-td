import { NotFoundException } from "@nestjs/common";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { CreateProductEntity, Product } from "../../domain/entity/product.entity";

export class CreateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(
        createProduct: CreateProductEntity
    ): Promise<Product> {
        const existingProduct = await this.productRepository.findByName(createProduct.name);

        if (existingProduct) {
            throw new NotFoundException(`A product with the name "${createProduct.name}" already exists.`);
        }

        const newProduct = new Product(createProduct);

        return await this.productRepository.save(newProduct);
    }
}
