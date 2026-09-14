import { copyFile, readFile, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { extname, join } from 'node:path'

const outputDirectoryUrl = new URL('../dist/', import.meta.url)
const outputDirectory = fileURLToPath(outputDirectoryUrl)
const projectBase = '/sishi-ancient-life'
const textExtensions = new Set(['.css', '.html', '.js'])

async function rewritePublicAssetPaths(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      await rewritePublicAssetPaths(path)
      return
    }

    if (!textExtensions.has(extname(entry.name))) return

    const source = await readFile(path, 'utf8')
    const rewritten = source.replace(
      /(?<!\/sishi-ancient-life)\/images\//g,
      `${projectBase}/images/`,
    )

    if (rewritten !== source) await writeFile(path, rewritten)
  }))
}

await rewritePublicAssetPaths(outputDirectory)
await copyFile(
  new URL('index.html', outputDirectoryUrl),
  new URL('404.html', outputDirectoryUrl),
)
