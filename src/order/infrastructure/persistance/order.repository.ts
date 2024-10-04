
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';

export class OrderRepositoryTypeOrm extends Repository<Order> implements OrderRepositoryInterface {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Order, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Order | null> {
    return await this.findOne({ where: { id } });
  }

  async findAll(): Promise<Order[]> {
    return await this.find();
  }

  async findByCustomerName(customerName: string): Promise<Order[]> {
    return await this.createQueryBuilder('order')
      .where('order.customerName = :customerName', { customerName })
      .getMany();
  }

  async deleteOrder(id: string): Promise<void> {
    await this.delete({ id });
  }

  async isProductInOrder(productId: string): Promise<boolean> {
    const count = await this.createQueryBuilder('order')
      .innerJoin('order.orderItems', 'item')
      .where('item.productId = :productId', { productId })
      .getCount();
    return count > 0;
  }

  async isPromotionInUse(promotionId: string): Promise<boolean> {
    const count = await this.createQueryBuilder('order')
      .where('order.promotionId = :promotionId', { promotionId }) // Assuming promotionId is tracked
      .getCount();
    return count > 0;
  }
}
