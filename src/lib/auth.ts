import { betterAuth } from "better-auth";
import { checkout, polar, portal } from "@polar-sh/better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db"
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "115dce16-2939-4968-96ee-770dd86d98c3",
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Automatr-Pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,
                }),
                portal()
            ]
        })
    ]
});