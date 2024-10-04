import { DataSource, Repository } from "typeorm";
import { Promotion } from "../../domain/entity/promotion-entity";
import { PromotionRepositoryInterface } from "../../domain/port/promotion-repository.interface";
import { InjectDataSource } from "@nestjs/typeorm";

export class PromotionRepository extends Repository<Promotion> implements PromotionRepositoryInterface {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(Promotion, datasource.createEntityManager());
    }

    async findById(promotionId: string): Promise<Promotion> {
        return await this.findOne({ where: { id: promotionId } });
    }

    async savePromotion(promotion: Promotion): Promise<Promotion> {
        return await this.manager.save(promotion);
    }

    async findByCode(code: string): Promise<Promotion | null> {
        return await this.findOne({ where: { code } });
    }

    async findAll(): Promise<Promotion[]> {
        return await this.find();
    }

    async deletePromotion(id: string): Promise<void> {
        await this.delete({ id });
    }

    async isProductInPromotion(productId: string): Promise<boolean> {
        // Assuming there's a relation between Promotion and Product entities.
        const count = await this.createQueryBuilder('promotion')
            .innerJoin('promotion.products', 'product') // Assuming there is a relation called 'products'
            .where('product.id = :productId', { productId })
            .getCount();
        return count > 0;
    }
}
