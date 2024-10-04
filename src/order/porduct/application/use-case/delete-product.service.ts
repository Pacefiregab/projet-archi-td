import { NotFoundException } from "@nestjs/common";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";


export class DeleteProductService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly orderRepository: OrderRepositoryInterface
  ) { }

  async execute(productId: string): Promise<void> {
    // Vérifier si le produit est lié à une commande existante
    const isProductInOrder = await this.orderRepository.isProductInOrder(productId);

    if (isProductInOrder) {
      throw new NotFoundException('Cannot delete a product that is linked to an existing order.');
    }

    // Supprimer le produit si non lié à une commande
    await this.productRepository.deleteProduct(productId);
  }
}
