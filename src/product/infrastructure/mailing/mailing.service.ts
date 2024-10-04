import { MailingServiceInterface } from "src/product/domain/port/mailing.service.interface";


export class MailingService implements MailingServiceInterface {
    async sendEmail(email: string, subject: string, body: string): Promise<void> {
        console.log('Sending email to', email, 'with subject', subject, 'and body', body);
    }
}