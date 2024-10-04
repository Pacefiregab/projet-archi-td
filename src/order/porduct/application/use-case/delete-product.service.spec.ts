import { DeleteProductService } from './delete-product.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async isProductInOrder(productId: string) {
        return true; // Simulate the product is in an order
    }
}

class ProductRepositoryFake {
    async deleteProduct(id: string) {
        return;
    }
}

describe('DeleteProductService', () => {
    let deleteProductService: DeleteProductService;
    let orderRepositoryFake;
    let productRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        productRepositoryFake = new ProductRepositoryFake();
        deleteProductService = new DeleteProductService(productRepositoryFake, orderRepositoryFake);
    });

    it('should throw an error if the product is associated with an order', async () => {
        await expect(deleteProductService.execute('product-id')).rejects.toThrow(
            NotFoundException,
        );
    });

    it('should delete the product if it is not associated with an order', async () => {
        orderRepositoryFake.isProductInOrder = async () => false;

        await expect(deleteProductService.execute('product-id')).resolves.not.toThrow();
    });
});
