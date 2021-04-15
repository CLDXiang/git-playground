/** generate a git object
 *
 * yarn generate-object <inputFilePath> [-t]
 *
 * -t - execute test with git cat-file -p <SHA-1>
 */

import { deflateSync } from 'zlib'
import { createHash } from 'crypto'
import path from 'path'
import fs from 'fs'
import cp from 'child_process'
import { cwd, initGitDir, parseCommand } from '../utils'

const libPath = path.join(cwd, 'libs', 'generateObject')

async function generateObject(content: string) {
  const header = `blob ${content.length}\0`
  const store = header + content
  const sha1 = createHash('sha1').update(store).digest('hex')
  try {
    const zlibContent = deflateSync(store)
    const objectDirPath = `.git/objects/${sha1.slice(0, 2)}`

    fs.mkdirSync(path.join(libPath, objectDirPath), { recursive: true })
    fs.writeFileSync(
      path.join(libPath, objectDirPath, `${sha1.slice(2, 40)}`),
      zlibContent,
    )
  } catch (err) {
    console.error(`can't generate object: `, err)
    process.exitCode = 1
  }
  return sha1
}

function test(sha1: string) {
  console.log(`execute "git cat-file -p ${sha1}" in lib directory:`)
  console.log('▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾')
  cp.spawnSync('git', ['cat-file', '-p', sha1], {
    cwd: libPath,
    stdio: 'inherit',
  })
  // FIXME: tricky, if output nothing, maybe should use cp.spawn and ChildProcess.on('close') event
  console.log('\n▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴')
}

{
  const { params, options } = parseCommand(process.argv)

  if (!params.length) {
    console.error('Error: please provide a file path as input')
    process.exit(1)
  }
  const inputFilePath = path.isAbsolute(params[0])
    ? params[0]
    : path.join(cwd, params[0])

  // read input file
  const input = fs.readFileSync(inputFilePath).toString()

  initGitDir(libPath)
  generateObject(input).then((sha1) => {
    if (options.includes('-t')) {
      test(sha1)
    }
  })
}
