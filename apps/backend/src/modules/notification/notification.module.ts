import { Module } from "@nestjs/common";
import { createEmailTransport } from "./factories/email-transport.factory";
import { EMAIL_TRANSPORT, EmailNotificationService } from "./services/email/email-notification.service";
import { emailconfig } from "@api-assistant/configuration-be";

@Module({
    providers: [
        { provide: EMAIL_TRANSPORT, useFactory: createEmailTransport, inject: [emailconfig.KEY] },
        EmailNotificationService
    ],
    exports: [EmailNotificationService]
})
export class NotificationsModule {}