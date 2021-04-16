import path from 'path'
import fs from 'fs'
import { inflateSync } from 'zlib'
import { cwd, parseCommand } from '../utils'

function unzip(input: Buffer) {
  return inflateSync(input)
}

{
  const { params } = parseCommand(process.argv)

  if (!params.length) {
    console.error('ERROR: please provide a file path as input')
    process.exit(1)
  }
  const inputFilePath = path.isAbsolute(params[0])
    ? params[0]
    : path.join(cwd, params[0])

  const input = fs.readFileSync(inputFilePath)

  console.log(`input data length: ${input.byteLength}`)
  const output = unzip(input)
  console.log(`output data length: ${output.byteLength}`)

  if (params[1]) {
    const outputFilePath = path.isAbsolute(params[1])
      ? params[1]
      : path.join(cwd, params[1])

    fs.writeFileSync(outputFilePath, output)
  }
}
