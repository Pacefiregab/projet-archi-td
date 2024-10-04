import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';

export class PdfGeneratorService implements PdfGeneratorServiceInterface {
  async generatePdf(text: string): Promise<Buffer> {
    //sould return a mock string
    return Buffer.from('PDF content');
  }
}
