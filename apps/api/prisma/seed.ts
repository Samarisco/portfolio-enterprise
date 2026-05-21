import { PrismaClient, ProjectStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.upsert({
    where: { slug: "revenue-intelligence-os" },
    update: {},
    create: {
      slug: "revenue-intelligence-os",
      title: "Revenue Intelligence OS",
      summary: "Executive analytics platform with RBAC, typed APIs and event-driven insights.",
      status: ProjectStatus.PUBLISHED,
      featured: true,
      impactScore: 94,
      stack: [
        { name: "Next.js", category: "frontend" },
        { name: "NestJS", category: "backend" },
        { name: "PostgreSQL", category: "database" },
      ],
      links: {
        github: "https://github.com",
        demo: "https://example.com",
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
