const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const exec = require('child_process').exec;
const shell = require('shelljs');

class Scan { 
    getFiles(dir, files_) {
        files_ = files_ || [];
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                this.getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }

    checkFlac(file) {
        return path.extname(file) === '.flac' ?  true : false;
    }
  
    addFlac(dir,check) {
        return new Promise((resolve, reject) => {
            let allFiles = this.getFiles(dir);
            var flacFiles = [];
            allFiles.forEach(file => {
                if(check(file)){
                    // console.log(allFiles);
                    flacFiles.push(file);
                    console.log(file)
                }
            });
            // resolve(flacFiles);
            
        });
    }

    async listAllFlac(dir) {
        try {
          let arrFlac = await this.addFlac(dir,this.checkFlac);   
          console.log(arrFlac);
            await this.convertFlac(arrFlac)
        } catch (error) {
          return Promise.reject(error +'');
        }
    }

    convertFlac(arrFlac){
       arrFlac.forEach((file)=>{ 
            let child =  exec(`ffmpeg -y -i "${file}" "${file.replace('.flac','.mp3')}"`)
            child.stdout.on('data',(data)=>{
                console.log(data)
            })
            child.stderr.on('data',(data) => {
                console.log(data)
            })
            child.on('close',(code) =>{
                console.log('close',code)
            })
       })
    }
}
let scan = new Scan();
let dirname = '/home/dom/Desktop/NodeJS/flacToMp3/Adele'
scan.listAllFlac(dirname)
