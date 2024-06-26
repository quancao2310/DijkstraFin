import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RedirectMiddleware } from "./redirect.middleware";
import { ValidationPipe } from "@nestjs/common";
import { MongooseErrorFilter } from "./mongoose-error.filter";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.enableCors();
  app.use(new RedirectMiddleware().use);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongooseErrorFilter());

  const config = new DocumentBuilder()
    .setTitle("DijkstraFin API Documentation")
    .setDescription("API for managing your finance")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  });

  await app.listen(process.env.BACKEND_PORT || 3001);
}
bootstrap();
