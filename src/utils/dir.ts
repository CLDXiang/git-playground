import fs from 'fs'
import cp from 'child_process'

/** current working directory */
export const cwd = process.cwd()

/** mkdir & git init */
export function initGitDir(path: string) {
  // create dir
  fs.mkdirSync(path, { recursive: true })

  // git init
  cp.spawnSync('git', ['init'], { cwd: path })
}
