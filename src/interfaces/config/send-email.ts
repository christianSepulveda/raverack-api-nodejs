import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  SendSmtpEmailSender,
  SendSmtpEmailToInner,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";
import { IncomingMessage } from "http";
import { Error } from "../../domain/entities/Error";

type Props = {
  subject: string;
  htmlContent: string;
  sender: SendSmtpEmailSender;
  to: SendSmtpEmailToInner[];
};

export default async function SendEmail(
  props: Props
): Promise<IncomingMessage | Error> {
  try {
    const apiInstance = new TransactionalEmailsApi();
    const sendSmtpEmail = new SendSmtpEmail();

    apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY ?? ""
    );

    sendSmtpEmail.subject = props.subject;
    sendSmtpEmail.htmlContent = props.htmlContent;
    sendSmtpEmail.sender = props.sender;
    sendSmtpEmail.to = props.to;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    if (
      response.response.statusCode === 200 ||
      response.response.statusCode === 201
    ) {
      console.log("Email sent to: " + props.to[0].email);
      return response.response;
    } else {
      return { message: response.response.statusMessage } as Error;
    }
  } catch (error) {
    console.log(error);
    return { message: "error" } as Error;
  }
}
