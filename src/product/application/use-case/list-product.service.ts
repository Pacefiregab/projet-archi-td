import { NotFoundException } from '@nestjs/common';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { Product } from '../../domain/entity/product.entity';



export class ListProductsService {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(isActive?: boolean): Promise<Product[]> {
        // Filtrer les produits actifs ou inactifs si un filtre est fourni
        return await this.productRepository.findAll();
    }
}