import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined
}

function getClient(): PrismaClient {
  if (!global._prisma) {
    global._prisma = new PrismaClient()
  }
  return global._prisma
}

// Lazy proxy — PrismaClient is only constructed on first actual DB call,
// not at module import time (avoids build-time crash when DATABASE_URL is absent)
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    return Reflect.get(getClient(), prop)
  },
})
