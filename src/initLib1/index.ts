import path from 'path'
import fs from 'fs'
import cp from 'child_process'

import { FILE_TYPE_OPTIONS, SIZE_OPTIONS } from './config'

const cwd = process.cwd()

function initLib1() {
  // create dir libs/lib1
  const lib1Path = path.join(cwd, 'libs', 'lib1')
  fs.mkdirSync(lib1Path, { recursive: true })

  FILE_TYPE_OPTIONS.forEach((fileType) => {
    // create dir libs/lib1/${fileType}
    const fileTypePath = path.join(lib1Path, fileType)
    fs.mkdirSync(fileTypePath)

    SIZE_OPTIONS.forEach((size) => {
      // create dir libs/lib1/${fileType}/${size}
      const sizePath = path.join(fileTypePath, size)
      fs.mkdirSync(sizePath)

      // git init
      cp.spawnSync('git', ['init'], { cwd: sizePath })
    })
  })
}

initLib1()
