import { mailtrapClient, sender } from "./mailtrap.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email Sent Successfully", response);
    } catch (error) {
        console.log(`Error Sending verification email: ${error}`);
        throw new Error(`Error Sending verification email ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "c5d2b943-0849-48d4-b246-860c25b83fe5",
            template_variables: {
                company_info_name: "Secure Pass",
                name: name
            }
        })

        console.log("Welcome email sent successfully. ", response);
        
    } catch (error) {
        console.log(`Error Sending welcome email: ${error}`);
        throw new Error(`Error Sending welcome email ${error}`)
    }
}