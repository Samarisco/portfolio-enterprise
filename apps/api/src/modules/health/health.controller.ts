import { Controller, Get } from "@nestjs/common";

interface HealthResponse {
  readonly status: "ok";
  readonly service: "portfolio-api";
  readonly timestamp: string;
}

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: "ok",
      service: "portfolio-api",
      timestamp: new Date().toISOString(),
    };
  }
}
