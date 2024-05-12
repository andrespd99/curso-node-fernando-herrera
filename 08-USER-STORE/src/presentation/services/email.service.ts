import nodemailer, { Transporter } from 'nodemailer';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[] | undefined;
}

interface Attachment {
    filename: string;
    path: string;
}

interface EmailServiceConfig {
    mailerService: string;
    mailerEmail: string;
    mailerSecret: string;

}


export class EmailService {

    private transporter: Transporter;

    constructor(config: EmailServiceConfig, private readonly disableMailing: boolean) {
        const { mailerEmail, mailerSecret, mailerService } = config;
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerSecret,
            }
        });
    }


    async sendEmail(options: SendMailOptions): Promise<boolean> {
        if (this.disableMailing) return true;

        const { to, subject, html, attachments = [] } = options;

        try {
            const sentInfo = await this.transporter.sendMail(options);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}