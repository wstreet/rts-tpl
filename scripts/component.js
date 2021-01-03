const fs = require('fs');
const path = require('path')
const inquirer = require('inquirer');
const ejs = require('ejs')
const _ = require('lodash')
const chalk = require('chalk')

const errLog = msg => chalk.red(msg)
const success = msg => chalk.green(msg)
const resolve = dir => path.resolve(__dirname, dir)
const componentsPath = resolve('../src/components')
const tplPath = resolve('../config/component-tpl')



/*
* 思路
  命令行交互，输入组件名称，校验组件是否存在
  读取模板内容，渲染模板
  将渲染的内容写入文件>src/components目录下
*/ 

inquirer.prompt([
  {
    type: 'input',
    name: 'component',
    message: '请输入组件名称:',
    validate(input) {
      const done = this.async()
      // 校验逻辑
      const folderName = _.camelCase(input);
      const stats = fs.lstatSync(resolve(`../src/components/${folderName}`))
      if (stats.isDirectory()){
        done(`${folderName}文件夹已存在`, false)
      }
      done(null, true)
    }
  }
]).then(({ component }) => {
  const componentName = _.capitalize(component);
  const folderName = _.camelCase(component);
  const componentFolder = fs.mkdirSync(resolve(`${componentsPath}/${folderName}`))
  const tplFiles = fs.readdirSync(tplPath)
  tplFiles.forEach(file => {
    // 读取模板文件并渲染
    const fileName = file.match(/(.*)\.ejs/)[0]
    const fileContent = fs.readFileSync(resolve(`${tplPath}/${file}`), 'utf-8')
    const componentContent = ejs.render(
      fileContent,
      {
        componentName,
        folderName
      }
    )
    
    // 写入src/components目录下
    const writeFileName = getWriteFileName(fileName, componentName)
    const writePath = `${componentFolder}/${writeFileName}`
    console.log(writePath)
    fs.writeFile(
      writePath,
      componentContent,
      (err) => {
        if (err) {
          errLog('异常')
        };
        success(writeFileName)
      }
    )
  })
})

function getWriteFileName(fileName, componentName) {
  switch(fileName) {
    case 'component': 
      return `${componentName}.tsx`
    default:
      return 'index.tsx'
  }
}