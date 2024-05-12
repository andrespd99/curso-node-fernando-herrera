import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asUrlString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  SECRET_KEY: get('SECRET_KEY').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asUrlString(),
  DISABLE_MAILING: get('DISABLE_MAILING').default('false').asBool(),

}



