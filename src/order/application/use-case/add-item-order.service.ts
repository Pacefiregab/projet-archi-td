import { NotFoundException } from "@nestjs/common";
import { Order } from "src/order/domain/entity/order.entity";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { ProductRepositoryInterface } from "src/order/porduct/domain/port/product.repository.interface";


export class AddProductToCartService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface
    ) { }

    async execute(orderId: string, productId: string, quantity: number): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        const product = await this.productRepository.findById(productId);

        if (!order) {
            throw new NotFoundException('Order not found.');
        }

        if (!product) {
            throw new NotFoundException('Productnot found.')
        }

        product.decrementStock(quantity);
        order.addItem(productId, product.name, product.price, quantity);

        await this.productRepository.save(product);
        return await this.orderRepository.save(order);
    }
}
