import { parseCommand } from '../utils'
import init from './init'
import commit from './commit'
import copyMid from './copyMid'

const { params } = parseCommand(process.argv)

const COMMANDS = [
  /** mkdir & git init */
  'init',
  /** git commit sample. */
  'commit',
  /** copy middle 512KB content and insert it into sample file */
  'copyMid',
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
  case 'commit':
    if (!params[1]) {
      console.error(
        'ERROR: please provide a commit message like this: commit first',
      )
      process.exit(1)
    }
    commit(params[1])
    break
  case 'copyMid':
    copyMid()
    break
  default:
    break
}
