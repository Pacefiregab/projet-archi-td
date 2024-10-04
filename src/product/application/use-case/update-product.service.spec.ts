import { UpdateProductService } from './update-product.service';
import { NotFoundException } from '@nestjs/common';

class ProductRepositoryFake {
    async findById(id: string) {
        return null; // Simulate product not found
    }

    async save(product) {
        return product;
    }
}

describe('UpdateProductService', () => {
    let updateProductService: UpdateProductService;
    let productRepositoryFake;

    beforeEach(() => {
        productRepositoryFake = new ProductRepositoryFake();
        updateProductService = new UpdateProductService(productRepositoryFake);
    });

    it('should throw an error if the product does not exist', async () => {
        await expect(
            updateProductService.execute('invalid-id', 'Updated Name', 50, 'Updated description', 10),
        ).rejects.toThrow(NotFoundException);
    });

    it('should update a product if it exists and data is valid', async () => {
        productRepositoryFake.findById = async () => ({
            updateProduct: jest.fn(),
        });

        const product = await updateProductService.execute(
            'valid-id',
            'Updated Name',
            50,
            'Updated description',
            10,
        );

        expect(product.updateProduct).toHaveBeenCalled();
    });
});
