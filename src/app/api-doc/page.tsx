import { createSwaggerSpec } from 'next-swagger-doc';
import ReactSwagger from '@/components/ReactSwagger';

export default async function IndexPage() {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'VerifyLive Forensic API',
        version: '1.0.0',
        description: 'API documentation for the VerifyLive Biometric Liveness System',
      },
    },
  });
  return (
    <section className="container mx-auto p-4 bg-white dark:bg-zinc-900 min-h-screen">
      <ReactSwagger spec={spec} />
    </section>
  );
}
