import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const port = process.env.PORT || 3000;
export const environment = process.env.NODE_ENV || 'development';
export const mongoURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiration = process.env.JWT_EXPIRATION || '1d';
export const githubClient = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET,
};
