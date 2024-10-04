import { Promotion } from "../entity/promotion-entity";

export interface PromotionRepositoryInterface {
    findById(promotionId: string): Promise<Promotion>;
    save(promotion: Promotion): Promise<Promotion>;
    findByCode(code: string): Promise<Promotion | null>;
    findAll(): Promise<Promotion[]>;
    deletePromotion(id: string): Promise<void>;
    isProductInPromotion(productId: string): Promise<boolean>;
}