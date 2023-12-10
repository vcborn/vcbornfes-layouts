const fs = require('fs')
const path = require('path')

if (process.argv[2] === undefined) {
  console.log('音源のURLを指定してください')
  process.exit(1)
}

if (process.argv[2].startsWith('https://soundeffect-lab.info/sound/')) {
  const url = process.argv[2]
  const filename = url.split('/').pop()
  if (filename === undefined) {
    console.log('ファイル名を取得できませんでした')
    process.exit(1)
  }
  const dir = path.join(__dirname, '../graphics/effects')
  const writeStream = fs.createWriteStream(path.join(dir, filename))
  fetch(url).then(res => {
    return res.arrayBuffer()
  }).then(buffer => {
    writeStream.write(Buffer.from(buffer))
    writeStream.end()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })
}