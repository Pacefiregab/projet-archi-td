import { Order } from '../../domain/entity/order.entity';
import { BadRequestException } from '@nestjs/common';

describe('Order Entity Validations', () => {
    it('should throw an error if required fields are missing', () => {
        expect(() => {
            new Order({
                customerName: '',
                items: [],
                shippingAddress: '',
                invoiceAddress: ''
            });
        }).toThrow(BadRequestException);
    });

    it('should throw an error if the total amount is less than the minimum allowed', () => {
        expect(() => {
            new Order({
                customerName: 'John Doe',
                items: [
                    { productId: '1', price: 2, quantity: 1 }, // Amount is below the minimum
                ],
                shippingAddress: 'Shipping Address',
                invoiceAddress: 'Invoice Address',
            });
        }).toThrow(BadRequestException);
    });

    it('should throw an error if there are more than the maximum allowed items', () => {
        expect(() => {
            new Order({
                customerName: 'John Doe',
                items: [
                    { productId: '1', price: 10, quantity: 1 },
                    { productId: '2', price: 10, quantity: 1 },
                    { productId: '3', price: 10, quantity: 1 },
                    { productId: '4', price: 10, quantity: 1 },
                    { productId: '5', price: 10, quantity: 1 },
                    { productId: '6', price: 10, quantity: 1 }, // Exceeding max items (5)
                ],
                shippingAddress: 'Shipping Address',
                invoiceAddress: 'Invoice Address',
            });
        }).toThrow(BadRequestException);
    });

    it('should create an order if all validations pass', () => {
        const order = new Order({
            customerName: 'John Doe',
            items: [
                { productId: '1', price: 50, quantity: 1 },
                { productId: '2', price: 20, quantity: 1 },
            ],
            shippingAddress: 'Shipping Address',
            invoiceAddress: 'Invoice Address',
        });

        expect(order).toBeDefined();
        expect(order.price).toBe(70); // Total amount of the items
        expect(order.orderItems.length).toBe(2); // Number of items in the order
    });
});