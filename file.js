const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const exec = require('child_process').exec;
const shell = require('shelljs');
const readChunk = require('read-chunk');
const fileType = require('file-type');

exports.Scan = class  { 
    constructor(){
        this.arrayFile = [];
        this.arrayFlac = [];
        this.arrayFolder = [];
        this.arrayInputFile = [];
        this.arrayInputFolder = [];
        this.arrayInputFlac = [];
    }
    getFiles(dir) {
        // files_ = files_ || [];
        let files_ = '';
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let files_ = dir + '/' + files[i];
            if (fs.statSync(files_).isDirectory()) {
                this.arrayFolder.push(files_);
                this.getFiles(files_);
            } else {
                let read = readChunk.sync(files_, 0, 400)
                if(fileType(read) && fileType(read).ext === 'flac'){
                    this.arrayFlac.push(files_);
                }else{
                    this.arrayFile.push(files_);
                }
                // files_.push(name);
            }
        }
        // return files_;
    }

    // checkFlac(file) {
    //     return path.extname(file) === '.flac' ?  true : false;
    // }
    getOutput(srcFolder, targetFolder){
        this.arrayInputFolder.forEach(data =>{
            this.arrayFolder.push(targetFolder + '/' + data.substring(data.indexOf(path.basename(srcFolder))))
        })

        this.arrayInputFile.forEach(data =>{
            this.arrayFile.push(targetFolder + '/' + data.substring(data.indexOf(path.basename(srcFolder))))
        })
        this.arrayInputFlac.forEach(data => {
            this.arrayFlac.push(targetFolder + '/' + data.substring(data.indexOf(path.basename(srcFolder))))
        })
    }
    // addFlac(dir,check) {
    //     return new Promise((resolve, reject) => {
    //         let allFiles = this.getFiles(dir);
    //         var flacFiles = [];
    //         allFiles.forEach(file => {
    //             if(check(file)){
    //                 // console.log(allFiles);
    //                 flacFiles.push(file);
    //                 console.log(file)
    //             }
    //         });
    //         resolve(flacFiles);
            
    //     });
    // }

    // async listAllFlac(dir) {
    //     try {
    //       let arrFlac = await this.addFlac(dir,this.checkFlac);   
    //       console.log(arrFlac);
    //         await this.convertFlac(arrFlac)
    //     } catch (error) {
    //       return Promise.reject(error +'');
    //     }
    // }

//     convertFlac(arrFlac, output, options, done){
//        arrFlac.forEach((file)=>{ 
//             // let temp = output.replace("/", path.basename(output), '');
//             // shell.mkdir('-p', temp);
//             let child =  exec(`ffmpeg -y -i "${file}" "${file.replace('.flac','.mp3')}"`)
//             child.stdout.on('data',(data)=>{
//                 console.log(data)
//             })
//             child.stderr.on('data',(data) => {
//                 console.log(data)
//             })
//             child.on('close',(code) =>{
//                 console.log('close',code)
//             })
//        })
//     }
// }
// let scan = new Scan();

// // scan.listAllFlac(__dirname)
// scan.getOutput()
