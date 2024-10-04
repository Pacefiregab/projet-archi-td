import { CancelOrderService } from './cancel-order.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(order) {
        return order;
    }
}

describe('CancelOrderService', () => {
    let service: CancelOrderService;
    let orderRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        service = new CancelOrderService(orderRepositoryFake);
    });

    it('should throw NotFoundException if order does not exist', async () => {
        await expect(
            service.execute('invalid-order-id', 'Reason'),
        ).rejects.toThrow(NotFoundException);
    });

    it('should cancel the order if valid', async () => {
        orderRepositoryFake.findById = async () => ({
            cancel: jest.fn(),
        });

        const order = await service.execute('order-id', 'Reason');

        expect(order.cancel).toHaveBeenCalledWith('Reason');
    });
});
