import { Product } from './product.entity';

describe('Product Entity Validations', () => {

    it('should throw an error if required fields are missing', () => {
        expect(() => {
            new Product({
                id: '1',
                name: '',
                price: 0,
                stock: 0,
                isActive: true,
                description: '',
            });
        }).toThrow('Product name, price, and description are required.');
    });

    it('should create a product with valid data', () => {
        const product = new Product({
            id: '1',
            name: 'Test Product',
            price: 100,
            stock: 10,
            isActive: true,
            description: 'A valid test product',
        });

        expect(product).toBeDefined();
        expect(product.name).toBe('Test Product');
        expect(product.price).toBe(100);
        expect(product.stock).toBe(10);
        expect(product.isActive).toBe(true);
    });

    it('should update product details with valid data', () => {
        const product = new Product({
            id: '1',
            name: 'Old Product',
            price: 50,
            stock: 5,
            isActive: true,
            description: 'An old product',
        });

        product.updateProduct('Updated Product', 75, 'Updated description', 20);

        expect(product.name).toBe('Updated Product');
        expect(product.price).toBe(75);
        expect(product.description).toBe('Updated description');
        expect(product.stock).toBe(20);
    });

    it('should throw an error if required fields are missing when updating a product', () => {
        const product = new Product({
            id: '1',
            name: 'Test Product',
            price: 100,
            stock: 10,
            isActive: true,
            description: 'A valid test product',
        });

        expect(() => {
            product.updateProduct('', 0, '');
        }).toThrow('Product name, price, and description are required.');
    });

    it('should deactivate a product', () => {
        const product = new Product({
            id: '1',
            name: 'Test Product',
            price: 100,
            stock: 10,
            isActive: true,
            description: 'A valid test product',
        });

        product.deactivate();

        expect(product.isActive).toBe(false);
    });

    it('should decrement stock and prevent it from going negative', () => {
        const product = new Product({
            id: '1',
            name: 'Test Product',
            price: 100,
            stock: 10,
            isActive: true,
            description: 'A valid test product',
        });

        product.decrementStock(3);

        expect(product.stock).toBe(7); // Stock reduced from 10 to 7

        product.decrementStock(10); // Should not go below 0

        expect(product.stock).toBe(0); // Stock set to 0
    });

});
