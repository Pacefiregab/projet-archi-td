import { SetInvoiceAddressOrderService } from './set-invoice-address-order.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }

    async save(order) {
        return order;
    }
}

describe('SetInvoiceAddressOrderService', () => {
    let service: SetInvoiceAddressOrderService;
    let orderRepositoryFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        service = new SetInvoiceAddressOrderService(orderRepositoryFake);
    });

    it('should throw NotFoundException if order does not exist', async () => {
        await expect(service.execute('invalid-order-id', 'New Invoice Address')).rejects.toThrow(NotFoundException);
    });

    it('should set the invoice address if order exists', async () => {
        orderRepositoryFake.findById = async () => ({
            setInvoiceAddress: jest.fn(),
        });

        const order = await service.execute('valid-order-id', 'New Invoice Address');

        expect(order.setInvoiceAddress).toHaveBeenCalledWith('New Invoice Address');
    });
});
