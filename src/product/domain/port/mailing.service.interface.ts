export interface MailingServiceInterface {
    sendEmail(email: string, subject: string, body: string): Promise<void>;
}