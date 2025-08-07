import { PrismaClient } from "@prisma/client";

// In your prisma.ts file - add connection pooling
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Add this for better connection management
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
