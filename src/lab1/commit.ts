import cp from 'child_process'
import { forEachDirectory, printObjectsSize } from './utils'

export default function commit(msg: string) {
  forEachDirectory((targetPath, fileType) => {
    console.log(`handle repo ${targetPath}:`)
    console.log('▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾')
    console.log(`# git add sample.${fileType}`)
    cp.spawnSync('git', ['add', `sample.${fileType}`], { cwd: targetPath })

    console.log(`# git commit -m "${msg}"`)
    cp.spawnSync('git', ['commit', '-m', `"${msg}"`], { cwd: targetPath })

    console.log('print all objects size:')
    printObjectsSize(targetPath)
    console.log('▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴')
  })
}
