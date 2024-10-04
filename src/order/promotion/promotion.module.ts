import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Promotion } from "./domain/entity/promotion-entity";
import PromotionController from "./infrastructure/presentation/promotion.controller";
import { PromotionRepository } from "./infrastructure/persistance/promotion.repository";
import { ApplyPromotionService } from "./application/use-case/apply-promotion.service";
import { OrderRepositoryInterface } from "../domain/port/persistance/order.repository.interface";
import { PromotionRepositoryInterface } from "./domain/port/promotion-repository.interface";
import { OrderRepositoryTypeOrm } from "../infrastructure/persistance/order.repository";
import { CreatePromotionService } from "./application/use-case/create-promotion.service";
import { ListPromotionsService } from "./application/use-case/list-promotion.service";

@Module({
    imports: [TypeOrmModule.forFeature([Promotion])],
    controllers: [PromotionController],

    providers: [
        PromotionRepository,
        OrderRepositoryTypeOrm,
        {
            provide: ApplyPromotionService,
            useFactory: (
                orderRepository: OrderRepositoryInterface,
                promotionRepository: PromotionRepositoryInterface
            ) => {
                return new ApplyPromotionService(orderRepository, promotionRepository);
            },
            inject: [OrderRepositoryTypeOrm, PromotionRepository],
        },

        {
            provide: CreatePromotionService,
            useFactory: (
                promotionRepository: PromotionRepositoryInterface
            ) => {
                return new CreatePromotionService(promotionRepository);
            },
            inject: [PromotionRepository],
        },

        {
            provide: ListPromotionsService,
            useFactory: (
                promotionRepository: PromotionRepositoryInterface
            ) => {
                return new ListPromotionsService(promotionRepository);
            },
            inject: [PromotionRepository],
        },
    ],
})
export class PromotionModule { }