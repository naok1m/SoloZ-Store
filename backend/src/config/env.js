import dotenv from 'dotenv'

dotenv.config()

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'MP_ACCESS_TOKEN',
  'RCON_HOST',
  'RCON_PORT',
  'RCON_PASSWORD',
]

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`)
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
  RCON_HOST: process.env.RCON_HOST,
  RCON_PORT: Number(process.env.RCON_PORT),
  RCON_PASSWORD: process.env.RCON_PASSWORD,
  PORT: Number(process.env.PORT || 4000),
  WEBHOOK_TOKEN: process.env.WEBHOOK_TOKEN || process.env.JWT_SECRET,
}
