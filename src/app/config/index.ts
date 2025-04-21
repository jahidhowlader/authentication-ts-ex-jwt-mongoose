import dotenv from 'dotenv';

interface IConfig {
    PORT: string;
    DATABASE_URL: string;
    BCRIPT_SALT: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

dotenv.config();

const config: IConfig = {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BCRIPT_SALT: process.env.BCRIPT_SALT as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};

export default config;