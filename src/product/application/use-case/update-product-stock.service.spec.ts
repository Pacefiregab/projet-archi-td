import { UpdateStockService } from './update-product-stock.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id: string) {
        return {
            orderItems: [
                {
                    product: { id: '1', name: 'Product 1', price: 100, stock: 10 },
                    quantity: 5,
                },
            ],
        };
    }
}

class ProductRepositoryFake {
    async findById(id: string) {
        return { decrementStock: jest.fn(() => 0) }; // Simulate stock decrement reaching 0
    }

    async save(product) {
        return product;
    }
}

class MailingServiceFake {
    async sendEmail(email: string, subject: string, message: string) {
        return;
    }
}

describe('UpdateStockService', () => {
    let updateStockService: UpdateStockService;
    let orderRepositoryFake;
    let productRepositoryFake;
    let mailingServiceFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        productRepositoryFake = new ProductRepositoryFake();
        mailingServiceFake = new MailingServiceFake();
        updateStockService = new UpdateStockService(
            orderRepositoryFake,
            productRepositoryFake,
            mailingServiceFake,
        );
    });

    it('should throw an error if the product does not exist', async () => {
        productRepositoryFake.findById = async () => null;

        await expect(updateStockService.execute('order-id')).rejects.toThrow(
            NotFoundException,
        );
    });

    it('should decrement the stock and send an email if stock reaches 0', async () => {
        const sendOutOfStockEmailSpy = jest.spyOn(mailingServiceFake, 'sendEmail');
        productRepositoryFake.findById = async () => ({ decrementStock: jest.fn(() => 0) });

        await updateStockService.execute('order-id');

        expect(sendOutOfStockEmailSpy).toHaveBeenCalled();
    });
});
