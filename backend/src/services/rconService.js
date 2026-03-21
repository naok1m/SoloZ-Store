import { Rcon } from 'rcon-client'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

export const executeCommand = async (playerNickname, commandTemplate) => {
  const command = commandTemplate.replace('{player}', playerNickname)
  const rcon = await Rcon.connect({
    host: env.RCON_HOST,
    port: env.RCON_PORT,
    password: env.RCON_PASSWORD,
  })

  try {
    const result = await rcon.send(command)
    logger.info('RCON command executed', { command, result })
    return result
  } finally {
    await rcon.end()
  }
}
