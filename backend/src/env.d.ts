declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;

      SERVER_URL: string;
      CLIENT_URL: string;

      DB_PORT: number;
      DB_HOST: number;
      DB_DATABASE: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;

      SESSION_SECRET: string;
      SESSION_EXPIRE: number;

      REMEMBER_ME_SECRET: string;
      REMEMBER_ME_EXPIRE: number;

      JWT_SECRET: string;

      NODEMAILER_USER: string;
      NODEMAILER_PASS: string;

      BASE_LATITUDE: number;
      BASE_LONGITUDE: number;

      FILE_UPLOAD: string;
      STATIC_FOLDER: string;
    }
  }
}

export {};
