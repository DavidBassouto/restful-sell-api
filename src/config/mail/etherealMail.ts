import nodemailer from 'nodemailer';
import {
  HandleBarsMailTemplate,
  IParseMailTemplate,
} from './handlebarsMailTemplate';

interface IEmailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail) {
    const mailTemplate = new HandleBarsMailTemplate();
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Api Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log(
      'Preview URL: %s',
      nodemailer.getTestMessageUrl(message),
    );
  }
}
