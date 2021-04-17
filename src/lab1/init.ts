import fs from 'fs'
import cp from 'child_process'
import { forEachDirectory } from './utils'

export default function init() {
  forEachDirectory((targetPath) => {
    /** mkdir */
    fs.mkdirSync(targetPath, { recursive: true })
    // git init
    cp.spawnSync('git', ['init'], { cwd: targetPath })
    console.log(`mkdir and git init in ${targetPath}`)
  })
}
