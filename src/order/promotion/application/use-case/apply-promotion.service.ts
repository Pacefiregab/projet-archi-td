import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { PromotionRepositoryInterface } from "../../domain/port/promotion-repository.interface";

export class ApplyPromotionService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly promotionRepository: PromotionRepositoryInterface
  ) {}

  async execute(orderId: string, promoCode: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
        throw new Error('Order not found.');
    }
    
    const promotion = await this.promotionRepository.findByCode(promoCode);
    if (!promotion) {
      throw new Error(`Promotion with code "${promoCode}" not found.`);
    }

    order.applyPromotion(promotion.amount);

    await this.orderRepository.save(order);
  }
}
