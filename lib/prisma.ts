import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined
}

const DB_URL = process.env.DATABASE_URL
if (!DB_URL) throw new Error('DATABASE_URL environment variable is required')

function getClient(): PrismaClient {
  if (!global._prisma) {
    const pool = new pg.Pool({ connectionString: DB_URL })
    const adapter = new PrismaPg(pool)
    global._prisma = new PrismaClient({ adapter } as never)
  }
  return global._prisma
}

// Lazy proxy — only instantiated on first DB call, safe at build time
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    return Reflect.get(getClient(), prop)
  },
})
