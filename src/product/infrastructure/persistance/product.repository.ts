
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProductRepositoryInterface } from '../../domain/port/product.repository.interface';
import { Product } from '../../domain/entity/product.entity';

export class ProductRepository extends Repository<Product> implements ProductRepositoryInterface {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {
        super(Product, datasource.createEntityManager());
    }

    async findById(id: string): Promise<Product | null> {
        return await this.findOne({ where: { id } });
    }

    async findAll(): Promise<Product[]> {
        return await this.find();
    }

    async findByName(name: string): Promise<Product[]> {
        return await this.createQueryBuilder('product')
            .where('product.name = :name', { name })
            .getMany();
    }

    async deleteProduct(id: string): Promise<void> {
        await this.delete({ id });
    }
}
