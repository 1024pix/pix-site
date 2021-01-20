import fs from 'fs'
import fsExtra from 'fs-extra'

import fetch from 'node-fetch'

export default async function saveRemoteAsset(url, path) {
  const exists = await fsExtra.pathExists(path)
  if (exists) return

  await fsExtra.ensureFile(path)

  const res = await fetch(url)

  const fileStream = fs.createWriteStream(path)
  return await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', (err) => {
      reject(err)
    })
    fileStream.on('finish', () => {
      resolve()
    })
  })
}
