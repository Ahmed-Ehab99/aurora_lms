import { Role } from "@/prisma/generated/prisma/enums";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { prisma } from "./db";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

// Uncomment this to use admin emails to assign admin role
// const getAdminEmails = (): string[] => {
//   if (!env.ADMIN_EMAILS) return [];

//   // Trim whitespace and convert to lowercase
//   const trimmedEmails = env.ADMIN_EMAILS.trim();

//   // If no commas, it's a single email
//   if (!trimmedEmails.includes(",")) {
//     return [trimmedEmails.toLowerCase()];
//   }

//   // Multiple emails - split, trim, and lowercase each
//   return trimmedEmails
//     .split(",")
//     .map((email) => email.trim().toLowerCase())
//     .filter((email) => email.length > 0); // Remove empty strings
// };

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  // Uncomment this to use admin emails to assign admin role
  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (user) => {
  //         const adminEmails = getAdminEmails();
  //         const userEmail = user.email?.toLowerCase();

  //         // If user email is in admin list, assign Admin role
  //         if (userEmail && adminEmails.includes(userEmail)) {
  //           return {
  //             data: {
  //               ...user,
  //               role: Role.Admin,
  //             },
  //           };
  //         }

  //         return { data: user };
  //       },
  //     },
  //   },
  // },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Automatically assign Admin role to all new users
          return {
            data: {
              ...user,
              role: Role.admin,
            },
          };
        },
      },
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "AuroraLMS <onboarding@resend.dev>",
          to: [email],
          subject: "AuroraLMS - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
});
