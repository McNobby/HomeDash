declare global {
  namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: String;
        ADMIN_USERNAME: String;
        ADMIN_PASSWORD: String;
    }
  }
}
