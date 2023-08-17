import fs from 'node:fs';
import { join } from 'node:path';
import { compile } from "handlebars";
import { emailTransports } from './nodemailer';
import { EMAIL_CURRENT_TRANSPORT, EMAIL_TEMPLATES_DIRECTORY, EMAIL_TEMPLATE_ENGINE_EXTENSION } from '../../domain/consts';

/**
 * 
 * @param   {string}    readTemplateSource 
 * @param   {object}    injectionData 
 * @returns {string}
 */
export const handlebarsInjectTemplateEngine = (readTemplateSource: string, injectionData: object): string => {
    const template = compile(readTemplateSource);
    const html = template(injectionData);
    return html;
}

/**
 * 
 * 
 * 
 */
export class EmailNotification {
    title: string;
    private content: string;

    constructor(private templateName: string) {
        this.content = '';
        this.title = '';
    }

    async prepareTemplate(): Promise<this> {
        const templating = new Promise<string>((resolve, reject) => {
            const templateChunks: Buffer[] = [];
            const templateURL = `${EMAIL_TEMPLATES_DIRECTORY}/${this.templateName}${EMAIL_TEMPLATE_ENGINE_EXTENSION}`;
            const templatePath = join(__dirname, templateURL);
            const fileStream = fs.createReadStream(templatePath, 'utf-8');

            fileStream.on('data', (chunk) => {
                const chunkBuffer = Buffer.from(chunk);
                templateChunks.push(chunkBuffer);
            });

            fileStream.on('end', async () => {
                const templateSource = Buffer.concat(templateChunks).toString();
                fileStream.close();
                resolve(templateSource);
            })

            fileStream.on('error', (error) => {
                console.error('processSendMail', error);
                fileStream.close();
                reject(error);
            })
        })

        this.content = await templating;
        
        return this;
    };

    async injectData(data: object): Promise<this> {
        const html = handlebarsInjectTemplateEngine( this.content, data );
        return this;
    }

    sendNotification(email: string) {
        emailTransports[EMAIL_CURRENT_TRANSPORT].transport.sendMail({
            to: email,
            from: emailTransports[EMAIL_CURRENT_TRANSPORT].from,
            subject: this.title,
            html: this.content
        })
            .then((info) => {
                console.info('sendEmail', info);
            })
            .catch((error) => {
                console.error('sendEmail', error);
            })
    };
}