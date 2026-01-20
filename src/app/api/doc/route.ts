import { createSwaggerSpec } from 'next-swagger-doc';
import { NextResponse } from 'next/server';

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'VerifyLive Forensic API',
        version: '1.0.0',
        description: 'API documentation for the VerifyLive Biometric Liveness System',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [],
    },
  });
  return NextResponse.json(spec);
}
