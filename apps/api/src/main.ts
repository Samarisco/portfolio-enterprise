import "reflect-metadata";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { RequestLoggingInterceptor } from "./common/interceptors/request-logging.interceptor";
import type { EnvironmentVariables } from "./common/config/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService<EnvironmentVariables, true>);
  const logger = new Logger("Bootstrap");
  const port = config.get("API_PORT", { infer: true });

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: config.get("CORS_ORIGIN", { infer: true }),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  await app.listen(port);
  logger.log(`API listening on port ${port}`);
}

void bootstrap();
