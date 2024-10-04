import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface CreateProductEntity {
    id: string;
    name: string;
    price: number;
    stock: number;
    isActive: boolean;
    description: string;
}


@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ default: true })
    isActive: boolean;

    @Column('text')
    description: string;

    constructor(product: CreateProductEntity) {
        if (!product) {
            return;
        }
        if (!product.name || !product.price || !product.description) {
            throw new Error('Product name, price, and description are required.');
        }

        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock ?? 0;
        this.isActive = true;
    }

    updateProduct(name: string, price: number, description: string, stock?: number) {
        if (!name || !price || !description) {
            throw new Error('Product name, price, and description are required.');
        }

        this.name = name;
        this.price = price;
        this.description = description;
        if (stock !== undefined) {
            this.stock = stock;
        }
    }

    deactivate() {
        this.isActive = false;
    }

    decrementStock(quantity: number): number {

        this.stock -= quantity;

        if (this.stock <= 0) {
            this.stock = 0;
        }
        return this.stock;
    }
}
