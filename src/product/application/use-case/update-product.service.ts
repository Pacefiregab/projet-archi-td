import { NotFoundException } from "@nestjs/common";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { Product } from "../../domain/entity/product.entity";


export class UpdateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(
        productId: string,
        name: string,
        price: number,
        description: string,
        stock?: number
    ): Promise<Product> {

        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        product.updateProduct(name, price, description, stock);

        return await this.productRepository.save(product);
    }
}
