import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { forEachDirectory } from './utils'

export default function copyMid() {
  forEachDirectory((targetPath, fileType) => {
    console.log(`handle repo ${targetPath}:`)
    console.log('▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾▾')

    // read file
    const rawFileContent = readFileSync(
      path.join(targetPath, `sample.${fileType}`),
    )
    console.log('raw file byte size:', rawFileContent.byteLength)

    // copy middle 512KB
    const middleContent = rawFileContent.slice(
      (rawFileContent.length >> 1) - 256000,
      (rawFileContent.length >> 1) + 256000,
    )

    // insert copied content into middle
    const newFileContent = Buffer.from([
      ...rawFileContent.slice(0, (rawFileContent.length >> 1) + 25600),
      ...middleContent,
      ...rawFileContent.slice((rawFileContent.length >> 1) + 256000),
    ])
    writeFileSync(path.join(targetPath, `sample.${fileType}`), newFileContent)
    console.log('new file byte size:', newFileContent.byteLength)

    console.log('▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴▴')
  })
}
