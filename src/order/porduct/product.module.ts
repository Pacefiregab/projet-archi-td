import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./domain/entity/product.entity";
import ProductController from "./infrastructure/presentation/product.controller";
import { ProductRepository } from "./infrastructure/persistance/product.repository";
import { MailingService } from "./infrastructure/mailing/mailing.service";
import { UpdateStockService } from "./application/use-case/update-product-stock.service";
import { OrderRepositoryInterface } from "../domain/port/persistance/order.repository.interface";
import { ProductRepositoryInterface } from "./domain/port/product.repository.interface";
import { MailingServiceInterface } from "./domain/port/mailing.service.interface";
import { OrderRepositoryTypeOrm } from "../infrastructure/persistance/order.repository";
import { CreateProductService } from "./application/use-case/create-product.service";
import { DeleteProductService } from "./application/use-case/delete-product.service";
import { ListProductsService } from "./application/use-case/list-product.service";
import { UpdateProductService } from "./application/use-case/update-product.service";


@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],

    providers: [
        ProductRepository,
        OrderRepositoryTypeOrm,
        MailingService,

        {
            provide: UpdateStockService,
            useFactory: (
                productRepository: ProductRepositoryInterface,
                orderRepository: OrderRepositoryInterface,
                mailingService: MailingServiceInterface,
            ) => {
                return new UpdateStockService(
                    orderRepository,
                    productRepository,
                    mailingService
                );
            },
            inject: [OrderRepositoryTypeOrm, ProductRepository, MailingService],
        },

        {
            provide: CreateProductService,
            useFactory: (productRepository: ProductRepositoryInterface) => {
                return new CreateProductService(productRepository);
            },
            inject: [ProductRepository],
        },

        {
            provide: DeleteProductService,
            useFactory: (
                productRepository: ProductRepositoryInterface,
                orderRepository: OrderRepositoryInterface
            ) => {
                return new DeleteProductService(
                    productRepository,
                    orderRepository
                );
            },
            inject: [ProductRepository, OrderRepositoryTypeOrm],
        },

        {
            provide: ListProductsService,
            useFactory: (
                productRepository: ProductRepositoryInterface,
            ) => {
                return new ListProductsService(productRepository);
            },
            inject: [ProductRepository],
        },

        {
            provide: UpdateProductService,
            useFactory: (
                productRepository: ProductRepositoryInterface,
            ) => {
                return new UpdateProductService(productRepository);
            },
            inject: [ProductRepository],
        },
    ],
})
export class ProductModule { }
