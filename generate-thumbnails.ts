import * as fs from 'fs/promises'
import * as path from 'path'
import sharp from 'sharp'

const WALLPAPER_DIR = './wallpapers'
const THUMBNAIL_DIR = './thumbnails'
const README_FILE = './README.md'

async function main() {
  await fs.mkdir(THUMBNAIL_DIR, { recursive: true })

  const imageFiles = await fs.readdir(WALLPAPER_DIR)

  let markdown = `# Zat Wallpapers
These are just some cool images that you can use as awesome wallpapers I found on the internet.

### How to add Wallpapers
- Add your wallpaper image file to the \`wallpapers\` directory.
- Run the following commands to generate thumbnails and update the README:

\`\`\`
npm install
npm run generate
\`\`\`

# Previews

`

  for (const file of imageFiles) {
    const inputPath = path.join(WALLPAPER_DIR, file)
    const outputPath = path.join(THUMBNAIL_DIR, file)

    await sharp(inputPath)
      .resize({ height: 128 })
      .toFile(outputPath)

    markdown += `### \`${file}\`\n\n`
    markdown += `![image](./thumbnails/${file})\n\n`
    markdown += `<a href="https://github.com/zacharytyhacz/zat-wallpapers/blob/master/wallpapers/${file}">\n`
    markdown += `  View Full Size\n</a>\n\n<hr>\n\n`
  }

  await fs.writeFile(README_FILE, markdown)
  console.log('Done')
}

main().catch(console.error)
