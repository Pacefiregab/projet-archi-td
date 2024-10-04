import { GenerateInvoiceService } from './generate-invoice.service';
import { NotFoundException } from '@nestjs/common';

class OrderRepositoryFake {
    async findById(id) {
        return null;
    }
}

class PdfGeneratorServiceFake {
    async generatePdf(invoiceInfos: string): Promise<Buffer> {
        return Buffer.from('fake-pdf-content');
    }
}

describe('GenerateInvoiceService', () => {
    let service: GenerateInvoiceService;
    let orderRepositoryFake;
    let pdfGeneratorServiceFake;

    beforeEach(() => {
        orderRepositoryFake = new OrderRepositoryFake();
        pdfGeneratorServiceFake = new PdfGeneratorServiceFake();
        service = new GenerateInvoiceService(orderRepositoryFake, pdfGeneratorServiceFake);
    });

    it('should throw an error if order does not exist', async () => {
        await expect(service.generateInvoice('invalid-order-id')).rejects.toThrow('Order not found');
    });

    it('should generate an invoice if order exists', async () => {
        orderRepositoryFake.findById = async () => ({
            getInvoiceInfos: jest.fn(() => 'Invoice details'),
        });

        const invoice = await service.generateInvoice('valid-order-id');

        expect(invoice).toBeInstanceOf(Buffer); 
        expect(invoice.toString()).toBe('fake-pdf-content'); 
    });
});
