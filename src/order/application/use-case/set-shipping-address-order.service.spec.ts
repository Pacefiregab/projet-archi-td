import { SetShippingAddressOrderService } from './set-shipping-address-order.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(order) {
        return order;
    }
}

describe('SetShippingAddressOrderService', () => {
    let service: SetShippingAddressOrderService;
    let orderRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        service = new SetShippingAddressOrderService(orderRepositoryFake);
    });

    it('should throw NotFoundException if order does not exist', async () => {
        await expect(
            service.execute('invalid-order-id', 'New Address'),
        ).rejects.toThrow(NotFoundException);
    });

    it('should set the shipping address if order exists', async () => {
        orderRepositoryFake.findById = async () => ({
            setShippingAddress: jest.fn(),
        });

        const order = await service.execute('valid-order-id', 'New Address');

        expect(order.setShippingAddress).toHaveBeenCalledWith('New Address');
    });
});
