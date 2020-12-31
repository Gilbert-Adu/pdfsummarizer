const fs = require('fs');
const tr = require('textrank');
const parser = require('pdf-parse');
const path = require('path');



//new packages
const Manager = require('node-summarizer').SummarizerManager;





/**
 * const file = fs.readFileSync('bundesliga.pdf');

 * parser(file).then((data) => {
    const textRank = new tr.TextRank(data.text)
    console.log(textRank.summarizedArticle)
})

 */

function newDirectory(name) {

    try{
        if (fs.existsSync(`./${name}`)) {
          console.log('working with existing directory');
          
          //removeDirectory(name);
          
            
        }else {
            fs.mkdir(`./${name}`, (err) => {
                if (err) {
                    console.log(err)
                }else {
                    console.log("New directory created")
                }
            })
        }

    } catch(e) {
        console.log("An error occurred!")

    }
}
    
function removeDirectory(name) {
  if (fs.existsSync(`./${name}`)) {
    const files = fs.readdirSync(`./${name}`)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(`./${name}`+ "/" + filename).isDirectory()) {
          removeDir(`./${name}` + "/" + filename)
          console.log(filename, 'removed.')
        } else {
          fs.unlinkSync(`./${name}` + "/" + filename)
        }
      })
      fs.rmdirSync(`./${name}`)
      console.log('directory removed')
    } else {
      fs.rmdirSync(`./${name}`)
    }
  } else {
    console.log("Directory path not found.")
  }
}

//copy file
    function copyPDF(source,name) {
        const sourceFile = './'+source;
        const destFile = `./dist/${name}`;
        try {
            fs.copyFileSync(
            sourceFile,
            destFile,
            fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE
        );
        console.log("file was copied to new directory");
        } catch (error) {
        console.error(error);
        }

      }


function summarizer(filePath) {
  const file = fs.readFileSync(filePath);
  let textRank = new tr.TextRank(file);
  let result = textRank.summarizedArticle;
  return result;
}
      
        /**
         * 
         * 
         * function summarizer(filePath) {
        const file = fs.readFileSync(filePath);
        parser(file).then((data) => {
          let Returned = new Manager(data, 3);
          Returned.getSummaryByFrequency().then((data) => {
            return data;
          }).catch(err => {
            console.log('an error occurred')
          }) 
          
    
        })
        
    
    
         * let result = {}
        parser(file).then((data) => {
        const textRank = new tr.TextRank(data.text)
        result.text = textRank.summarizedArticle;
        //console.log('Result is: ',result)
        //return result;
        }).then((result) => {
          return result;
        })
        
         */
        
    
    
    

function fileAppend(content) {
  fs.appendFile('./result.html', content, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('content appended')
  })

}
module.exports.newDirectory = newDirectory;
module.exports.copyPDF = copyPDF;
module.exports.removeDirectory = removeDirectory;
module.exports.summarizer = summarizer;
module.exports.fileAppend = fileAppend;

//removeDirectory();