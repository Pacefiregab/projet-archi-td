import { Promotion } from '../../domain/entity/promotion-entity';
import { PromotionRepositoryInterface } from '../../domain/port/promotion-repository.interface';

export class ListPromotionsService {
    constructor(private readonly promotionRepository: PromotionRepositoryInterface) { }

    async execute(): Promise<Promotion[]> {
        return await this.promotionRepository.findAll();
    }
}
