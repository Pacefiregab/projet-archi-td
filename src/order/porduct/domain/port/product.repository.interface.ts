import { Product } from "../entity/product.entity";

export interface ProductRepositoryInterface {
    save(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByName(name: string): Promise<Product[]>;
    deleteProduct(id: string): Promise<void>;
}
