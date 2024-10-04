import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { Product } from '../../domain/entity/product.entity';
import { MailingServiceInterface } from '../../domain/port/mailing.service.interface';

export class UpdateStockService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface,
        private readonly sendEmailService: MailingServiceInterface
    ) { }

    private readonly ADMIN_EMAIL: string = 'admin@mail.com';

    async execute(orderId: string): Promise<void> {
        const order = await this.orderRepository.findById(orderId);

        for (const item of order.orderItems) {
            const product = await this.productRepository.findById(item.product.id);

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.product.id} not found.`);
            }

            if (product.decrementStock(item.quantity) === 0) {
                this.sendOutOfStockEmail(product);
            }


            await this.productRepository.save(product);
        }
    }

    private sendOutOfStockEmail(product: Product) {
        this.sendEmailService.sendEmail(this.ADMIN_EMAIL, 'Out of stock', `The product ${product.name} is out of stock.`);
    }
}
