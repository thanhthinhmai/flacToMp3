const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const exec = require('child_process').exec;
const shell = require('shelljs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

exports.Convert = class {

    constructor(){
       this.arrayFile = [];
        this.arrayFlac = [];
        this.arrayFolder = [];
        this.arrayInputFile = [];
        this.arrayInputFolder = [];
        this.arrayInputFlac = [];
    }
      outputFolder(arrayFolder, srcPath, targetPath){
          let folder = path.basename(srcPath), mkdir = exec(`cd "${targetPath}" && mkdir "${folder}"`)
          async.mapSeries(arrayFolder, (file, cb) =>{
            if(!fs.existsSync(file)){
              let mkdirChild = exec(`cd "${path.dirname(file)}" && mkdir "${path.basename(file)}"`)
              mkdirChild.on('close', code => {
                cb();
              })
            }
          }, err => {
            if(err)
            console.log(err);
          })
      }

      outputFile(arrayInputFile, arrayFile){
        if(arrayInputFile.length === arrayFile.length){
          for(let i = 0; i < arrayInputFile.length; i++){
            let cpChild = exec(`cp -rf "${arrayInputFile[i]}" "${arrayFile}"`)
          }
        }else{
          throw 'somethings seriously wrong'
        }
      }

      convertFlac(bitRate, arrayInputFlac, arrayFlac){
        if(arrayInputFlac.length ===  arrayFlac.length){
            async.mapLimit(arrayFlac, (inputFlac, cb) => {
                console.log(`Converting "${path.basename(inputFlac)}":`)

                let i = arrayInputFlac.indexOf(inputFlac)
				        let ffmpeg = exec(`ffmpeg -y -i "${inputFlac}" -ab ${bitRate} -map_metadata 0 -id3v2_version 3 "${arrayOfOutputFlacs[i].replace('.flac', '.mp3')}" `)

                ffmpeg.stdout.on('data', (data) =>{
                  console.log(data);
                })
                ffmpeg.stderr.on('data', (data) => {
					        console.log(data)
                })

                ffmpeg.on('close', (code) => {
                  console.log(` Done\n`) // khi hoàn thành thì log ra done
                  cb()// callback để thực hiện child-process tiếp theo
                })
            }, err => {
              if(err){
                console.log(err)
              }else{
                console.log('Completed!')

              }
            })
        }else{
          throw 'something wrong'
        }
    }

    convertFile(bitRate, inputFile, outputFile){
      console.log(`Converting ${path.basename(inputFile)}`)

      let targetFile = outputFile + '/' + path.basename(inputFile).replace('.flac', '.mp3')
    //khởi tạo child-process để convert file flac sang mp3
      let ffmpeg = exec(`time ffmpeg -y -i "${inputFile}" -ab ${bitRate} -map_metadata 0 -id3v2_version 3 "${targetFile}"`)

      ffmpeg.stdout.on("data", data => {
        console.log(data)
      })
      ffmpeg.stderr.on("data", data => {
        console.log(data)
      })
      ffmpeg.on('close', (code) => {
        console.log(' Done\n')// close process-child
      })
	}
    
}