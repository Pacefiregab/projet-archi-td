import { CreatePromotionEntity, Promotion } from "../../domain/entity/promotion-entity";
import { PromotionRepositoryInterface } from "../../domain/port/promotion-repository.interface";


export class CreatePromotionService {
    constructor(private readonly promotionRepository: PromotionRepositoryInterface) { }

    async execute(promotionCreation: CreatePromotionEntity): Promise<Promotion> {
        const existingPromotion = await this.promotionRepository.findByCode(promotionCreation.code);

        if (existingPromotion) {
            throw new Error(`A promotion with the code "${promotionCreation.code}" already exists.`);
        }

        const newPromotion = new Promotion(promotionCreation);

        return await this.promotionRepository.save(newPromotion);
    }
}
