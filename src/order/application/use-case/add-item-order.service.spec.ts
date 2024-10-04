import { AddProductToCartService } from './add-item-order.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(order) {
        return order;
    }
}

class ProductRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(product) {
        return product;
    }
}

describe('AddProductToCartService', () => {
    let service: AddProductToCartService;
    let orderRepositoryFake;
    let productRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        productRepositoryFake = new ProductRepositoryFake();
        service = new AddProductToCartService(orderRepositoryFake, productRepositoryFake);
    });

    it('should throw NotFoundException if order does not exist', async () => {
        await expect(
            service.execute('invalid-order-id', 'product-id', 1),
        ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product does not exist', async () => {
        orderRepositoryFake.findById = async () => ({});
        await expect(
            service.execute('order-id', 'invalid-product-id', 1),
        ).rejects.toThrow(NotFoundException);
    });

    it('should add product to the cart if valid', async () => {
        orderRepositoryFake.findById = async () => ({ addItem: jest.fn() });
        productRepositoryFake.findById = async () => ({ decrementStock: jest.fn() });

        const order = await service.execute('order-id', 'product-id', 1);

        expect(order.addItem).toHaveBeenCalled();
    });
});
