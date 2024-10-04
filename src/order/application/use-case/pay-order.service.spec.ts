import { PayOrderService } from './pay-order.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(order) {
        return order;
    }
}

describe('PayOrderService', () => {
    let service: PayOrderService;
    let orderRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        service = new PayOrderService(orderRepositoryFake);
    });

    it('should throw NotFoundException if order does not exist', async () => {
        await expect(service.execute('invalid-order-id')).rejects.toThrow(NotFoundException);
    });

    it('should mark the order as paid if valid', async () => {
        orderRepositoryFake.findById = async () => ({
            pay: jest.fn(),
        });

        const order = await service.execute('order-id');

        expect(order.pay).toHaveBeenCalled();
    });
});
