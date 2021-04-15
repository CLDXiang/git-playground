export function parseCommand(argv: string[]) {
  const argvIn = argv.slice(2)
  return {
    params: argvIn.filter((arg) => !arg.startsWith('-')),
    options: argvIn.filter((arg) => arg.startsWith('-')),
  }
}
