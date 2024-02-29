import { Inject, Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

export const EMAIL_TRANSPORT = 'EMAIL_TRANSPORT';

interface SendEmailPayload {
  toEmailId: string;
  subject: string;
  username: string;
  cta?: {
    label: string;
    link: string;
  };
  text: string;
}

@Injectable()
export class EmailNotificationService {
  @Inject(EMAIL_TRANSPORT)
  private emailTransport!: Transporter<SMTPTransport.SentMessageInfo>;

  private logger = new Logger(EmailNotificationService.name);

  private draftEmailMessage(
    message: Omit<SendEmailPayload, 'toEmailId' | 'subject'>
  ): string {
    return `
            <div style="width: 60vw; height: 70vh; border: 1px solid royalblue; border-radius: 4px;">
                <div style="box-styling: border-box;padding-left: 5%; height: 15%; display: flex; align-items: center; width: 95%; background-color: royalblue; color: white;">
                    <h1>API Assistant (TEST EMAIL)</h1>
                </div>  

                <div style="padding-left: 5%; height: 50%; width: 100%;">
                    <h2 style="margin-top: 30px;">Hello ${
                      message.username
                    },</h2>
                    <h3 style="margin-top: 30px;">${message.text}</h3>
                    ${
                      message.cta
                        ? `<h4 style="margin-top: 70px;">
                            <a style="padding:1%; border-radius: 5px; font-size: 1.2rem; background-color: royalblue; color:white;" href="${message.cta.link}">
                                ${message.cta.label}
                            </a>
                        </h4>`
                        : ''
                    }
                </div>

                <div style="padding-left: 5%; height: 35%; width: 100%;">
                    <h3>Best regards,</h3>
                    <h3 style="font-weight: lighter;">API Assistant team</h3>
                    <h4>(This is testing email, Ignore if you received by mistake)</h4>
                </div>
            </div>
        `;
  }

  public async notify(
    payload: SendEmailPayload
  ): Promise<SMTPTransport.SentMessageInfo> {
    this.logger.log(
      `Sending email to ${payload.toEmailId} with subject: ${payload.subject}`
    );
    const sendEmailResponse = await this.emailTransport.sendMail({
      to: payload.toEmailId,
      subject: payload.subject,
      html: this.draftEmailMessage({
        text: payload.text,
        username: payload.username,
        cta: payload.cta,
      }),
    });
    this.logger.log(`Email sent with code ${sendEmailResponse.response}`);
    return sendEmailResponse;
  }
}
