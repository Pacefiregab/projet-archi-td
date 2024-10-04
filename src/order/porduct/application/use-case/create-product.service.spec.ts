import { CreateProductService } from './create-product.service';
import { NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/entity/product.entity';

class ProductRepositoryFake {
    async findByName(name: string) {
        return null; // Simulate no product with the same name exists
    }

    async save(product: Product) {
        return product;
    }
}

describe('CreateProductService', () => {
    let createProductService: CreateProductService;
    let productRepositoryFake;

    beforeEach(() => {
        productRepositoryFake = new ProductRepositoryFake();
        createProductService = new CreateProductService(productRepositoryFake);
    });

    it('should throw an error if product name, price, or description are missing', async () => {
        await expect(
            createProductService.execute({
                id: '1',
                name: '',
                price: 0,
                stock: 0,
                isActive: true,
                description: '',
            }),
        ).rejects.toThrow('Product name, price, and description are required.');
    });

    it('should create a product if all fields are valid', async () => {
        const product = await createProductService.execute({
            id: '1',
            name: 'New Product',
            price: 100,
            stock: 10,
            isActive: true,
            description: 'A new test product',
        });

        expect(product).toBeDefined();
        expect(product.name).toBe('New Product');
        expect(product.price).toBe(100);
    });
});
