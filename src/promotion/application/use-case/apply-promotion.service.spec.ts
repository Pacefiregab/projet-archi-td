import { ApplyPromotionService } from './apply-promotion.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
  async findById(id: string) {
    return null; // Simulate no order found
  }

  async save(order) {
    return order;
  }
}

class PromotionRepositoryFake {
  async findByCode(code: string) {
    return null; // Simulate no promotion found
  }
}

describe('ApplyPromotionService', () => {
  let applyPromotionService: ApplyPromotionService;
  let orderRepositoryFake;
  let promotionRepositoryFake;

  beforeEach(() => {
    orderRepositoryFake = new OrderRepositoryFake();
    promotionRepositoryFake = new PromotionRepositoryFake();
    applyPromotionService = new ApplyPromotionService(orderRepositoryFake, promotionRepositoryFake);
  });

  it('should throw an error if order does not exist', async () => {
    await expect(applyPromotionService.execute('invalid-order-id', 'PROMO1')).rejects.toThrow('Order not found.');
  });

  it('should throw an error if promotion code does not exist', async () => {
    orderRepositoryFake.findById = async () => ({});
    await expect(applyPromotionService.execute('order-id', 'invalid-code')).rejects.toThrow(
      'Promotion with code "invalid-code" not found.',
    );
  });

});
