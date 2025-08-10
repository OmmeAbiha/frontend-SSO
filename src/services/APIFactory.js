import { createApiInstance } from "./APIRepositories";

export const sso = createApiInstance(process.env.NEXT_PUBLIC_BACKEND_SSO);