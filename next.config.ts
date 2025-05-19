// import type { NextConfig } from "next";

// const withNextIntl = require('next-intl/plugin')();

// require('dotenv').config({ path: `.env.${process.env.ENV_NAME}` })
// console.info( `=> ENV: ${process.env.ENV_NAME}` );

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default withNextIntl(nextConfig);


import type { NextConfig } from "next";
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });
const envName = process.env.ENV_NAME || "local";

dotenv.config({ path: `.env.${envName}` });
console.info(`=> ENV: ${envName}`);

const withNextIntl = require("next-intl/plugin")();


const nextConfig: NextConfig = {
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);