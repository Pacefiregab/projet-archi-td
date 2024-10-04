import { CreateOrderService } from './create-order.service';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { BadRequestException } from '@nestjs/common';

class OrderRepositoryFake {
  async save(order) {
    return order;
  }
}

describe('CreateOrderService', () => {
  let createOrderService: CreateOrderService;
  let orderRepositoryFake: OrderRepositoryInterface;

  beforeEach(() => {
    orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
    createOrderService = new CreateOrderService(orderRepositoryFake);
  });

  it('should throw an error if the order has more than 5 items', async () => {
    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productId: '1', price: 10, quantity: 1 },
          { productId: '2', price: 10, quantity: 1 },
          { productId: '3', price: 10, quantity: 1 },
          { productId: '4', price: 10, quantity: 1 },
          { productId: '5', price: 10, quantity: 1 },
          { productId: '6', price: 10, quantity: 1 }, // exceeds the limit
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create an order if it is valid', async () => {
    const order = await createOrderService.execute({
      customerName: 'John Doe',
      items: [{ productId: '1', price: 50, quantity: 1 }],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    expect(order).toBeDefined();
    expect(order.customerName).toBe('John Doe');
  });
});
