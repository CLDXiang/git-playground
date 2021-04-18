import cp from 'child_process'
import { forEachDirectory, printPacksInfo } from './utils'

export default function gc() {
  forEachDirectory((targetPath) => {
    console.log(`handle repo ${targetPath}:`)
    console.log('▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾')
    console.log(`# git gc --aggressive`)
    cp.spawnSync('git', ['gc', '--aggressive'], { cwd: targetPath })

    console.log('print all packs info:')
    printPacksInfo(targetPath)
    console.log('▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴')
  })
}
