import path from 'path'

const FILE_TYPE_OPTIONS = ['txt', 'json', 'jpeg', 'exe']
const SIZE_OPTIONS = ['1M', '5M', '10M', '20M', '50M', '100M']

const cwd = process.cwd()

/** loop over all lib directory */
export function forEachDirectory(cb: (path: string) => void) {
  FILE_TYPE_OPTIONS.forEach((fileType) => {
    SIZE_OPTIONS.forEach((size) => {
      const targetPath = path.join(cwd, 'libs', 'lib1', fileType, size)
      cb(targetPath)
    })
  })
}
