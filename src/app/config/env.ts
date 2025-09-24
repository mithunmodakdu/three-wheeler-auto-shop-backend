import dotenv from "dotenv";

dotenv.config();

interface IEnvVariables {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  BCRYPT_SALT_ROUND: string;
  JWT_WEB_SECRET: string;
}

const loadEnvVariables = (): IEnvVariables => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "JWT_WEB_SECRET"
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is missing.`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_WEB_SECRET: process.env.JWT_WEB_SECRET as string
  };
};

export const envVars: IEnvVariables = loadEnvVariables();
