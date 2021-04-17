import path from 'path'
import fs from 'fs'

const FILE_TYPE_OPTIONS = ['txt', 'json', 'jpg', 'exe']
const SIZE_OPTIONS = ['1M', '5M', '10M', '20M', '50M', '100M']

const cwd = process.cwd()

/** loop over all lab directory */
export function forEachDirectory(
  cb: (path: string, fileType?: string, size?: string) => void,
) {
  FILE_TYPE_OPTIONS.forEach((fileType) => {
    SIZE_OPTIONS.forEach((size) => {
      const targetPath = path.join(cwd, 'labs', 'lab1', fileType, size)
      cb(targetPath, fileType, size)
    })
  })
}

/** print all objects id and file size in a git repository */
export function printObjectsSize(repoPath: string) {
  const gitPath = path.join(repoPath, '.git')
  if (!fs.existsSync(gitPath)) {
    console.error(`ERROR: ${repoPath} is not a git repository`)
    process.exit(1)
  }

  const objectsPath = path.join(gitPath, 'objects')

  const objects: {
    id: string
    size: number
  }[] = []

  fs.readdirSync(objectsPath).forEach((dir) => {
    const subDirPath = path.join(objectsPath, dir)
    if (dir.length === 2 && fs.statSync(subDirPath).isDirectory()) {
      fs.readdirSync(subDirPath).forEach((file) => {
        if (file.length === 38) {
          objects.push({
            id: `${dir}${file}`,
            size: fs.statSync(path.join(subDirPath, file)).size,
          })
        }
      })
    }
  })

  objects
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .forEach((obj) => {
      console.log(`${obj.id}\t${obj.size}`)
    })

  return objects
}
