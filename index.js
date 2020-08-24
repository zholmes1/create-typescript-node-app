const { exec } = require('child_process')
const fs = require('fs')

const dir = process.argv[2]

fs.mkdirSync(dir)

const child = exec(`cd ${dir} && yarn init -y && yarn add ts-node typescript && yarn add -D nodemon && yarn tsc --init`, () => {
  const pkgFile = `./${dir}/package.json`
  const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
  fs.writeFileSync(pkgFile, JSON.stringify({
    ...pkg,
    nodemonConfig: {
      ext: 'ts',
      exec: 'yarn start'
    },
    scripts: {
      dev: 'nodemon',
      start: 'ts-node src'
    }
  }, null, '  '))
  fs.mkdirSync(`./${dir}/src`)
  fs.writeFileSync(`./${dir}/src/index.ts`, 'console.log(\'Hello, world!\')')
})

child.on('data', data => console.log(data.toString()))


