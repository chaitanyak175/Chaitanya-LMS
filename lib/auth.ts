import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
        },
    },

    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                // implement sending the email to the user

                await resend.emails.send({
                    from: "Chaitanya LMS <onboarding@resend.dev>",
                    to: [email],
                    subject: "Chaitanya LMS - Verify you email",
                    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
                });
            },
        }),
        admin(),
    ],
});
