import { parseCommand } from '../utils'
import init from './init'

const { params } = parseCommand(process.argv)

const COMMANDS = [
  /** mkdir & git init */
  'init',
  /** git commit sample.* */
  'commit',
  /** append content after sample.* */
  'append',
  /** git gc */
  'gc',
]

if (!params.length) {
  console.error('ERROR: please provide a sub command')
  process.exit(1)
}

const command = params[0]

if (!COMMANDS.includes(command)) {
  console.error(`ERROR: no such sub command: ${command}`)
  console.log(`Available sub command: ${COMMANDS.join(', ')}`)
  process.exit(1)
}

switch (command) {
  case 'init':
    init()
    break
  default:
    break
}
