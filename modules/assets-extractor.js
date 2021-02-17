import path from 'path'
import fs from 'fs'
import util from 'util'
import getUrls from 'get-urls'
import consola from 'consola'
import slugify from '@sindresorhus/slugify'
import saveRemoteAsset from './save-remote-asset'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const DEFAULT_OPTIONS = {
  path: '/_assets',
  extensions: ['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg', 'mp4'],
  hostnames: [''],
}

export function getOptions(options) {
  return { ...DEFAULT_OPTIONS, ...options }
}

export function getAssetsDir(baseDir, assetPath) {
  return path.join(baseDir, assetPath)
}

export function replaceAll(string, search, replacement) {
  const escapedSearch = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regexSearch = new RegExp(escapedSearch, 'g')
  return string.replace(regexSearch, replacement)
}

export function slugifyPathname(pathname) {
  const { dir, ext, name } = path.parse(pathname)
  return path.join(dir, `${slugify(name)}${ext}`)
}

export async function processAssets(
  data,
  extensions,
  hostnames,
  assetsDir,
  assetsPath
) {
  const remoteUrls = extractAssetsUrls(data, extensions, hostnames)

  await Promise.all(
    remoteUrls.map(async (raw) => {
      try {
        const url = new URL(raw)
        const pathname = slugifyPathname(url.pathname)
        const assetPath = path.join(assetsDir, pathname)
        const assetUrl = path.join(assetsPath, pathname)
        await saveRemoteAsset(raw, assetPath)
        data = replaceAll(data, raw, assetUrl)
      } catch (e) {
        consola.warn(`Unable to extract asset "${raw}"`)
        consola.error(e)
      }
    })
  )

  return data
}

export function extractAssetsUrls(payload, extensions = [], hostnames = []) {
  const urls = getUrls(payload, {
    normalizeProtocol: false,
    stripAuthentication: false,
    stripWWW: false,
    removeTrailingSlash: false,
    removeSingleSlash: false,
    sortQueryParameters: false,
  })

  return [...urls].filter((raw) => {
    try {
      const url = new URL(raw)
      const isHostname = hostnames.includes(url.hostname)
      const isExtension = extensions.some(
        (ext) => `.${ext}` === path.extname(url.pathname)
      )
      return isExtension && isHostname
    } catch (e) {
      return false
    }
  })
}

export default function extract(moduleOptions) {
  const options = getOptions(moduleOptions)
  const assetsDir = getAssetsDir(this.options.generate.dir, options.path)

  this.nuxt.hook('generate:distCopied', () => {
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir)
    }
  })

  this.nuxt.hook('generate:page', async (page) => {
    try {
      page.html = await processAssets(
        page.html,
        options.extensions,
        options.hostnames,
        assetsDir,
        options.path
      )
    } catch (e) {
      consola.warn(`Failed to extract asset links for route "${page.route}"`)
      consola.error(e)
    }
    return page
  })

  this.nuxt.hook('generate:routeCreated', async ({ route }) => {
    const payloadPath = path.join(
      this.options.generate.dir,
      this.options.generate.staticAssets.versionBase,
      route || '/',
      'payload.js'
    )

    try {
      const payload = await readFile(payloadPath, 'utf8')
      const escapedPayload = replaceAll(payload, '\\u002F', '/')

      const newPayload = await processAssets(
        escapedPayload,
        options.extensions,
        options.hostnames,
        assetsDir,
        options.path
      )

      await writeFile(payloadPath, newPayload, 'utf8')
    } catch (e) {
      consola.warn(`Failed to extract asset links for route "${route}"`)
      consola.error(e)
    }
  })
}
