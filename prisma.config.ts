import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://bantukos:BantuKos2026!@bantukos-postgres:5432/bantukos_reports?schema=public",
  },
});
