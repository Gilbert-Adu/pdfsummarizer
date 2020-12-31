/**
 * Dependent packages
 */
const express = require('express');
const app = express();
const tr = require('textrank');
const bodyParser = require('body-parser');
const multer = require("multer");
var path = require('path');
const fs = require('fs');
const parser = require('pdf-parse');
const libre = require('libreoffice-convert');
const docxParser = require('docx-parser');



require('dotenv').config();
const port = process.env.PORT || 3000;


let { newDirectory, copyPDF, fileAppend, removeDirectory } = require("./resources");


/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


/**
 * Upload configuration
 */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './copy')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});


/**
 * GET route or homepage
 */
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


/**
 * Startup directories
 */
newDirectory('copy');
newDirectory('dist');

    


/**
 * POST route
 */
app.post('/', upload.single('doc_upload'), (req,res) => {
       
    const fileExtension = path.extname(req.file.path)
    const file = fs.readFileSync(req.file.path);

    if (fileExtension == ".pdf") {

        
        copyPDF(req.file.path,req.file.filename)
    
        parser(file).then((data) => {
            try {
                const textRank =  new tr.TextRank(data.text)
                res.write(textRank.summarizedArticle)
                res.end();

            }catch(error) {
                console.log("error from .pdf")

            }
            
        
        })


    }else if (fileExtension == ".docx") {
        docxParser.parseDocx(file, async (data) => {
            try {
                const textRank = await new tr.TextRank(data)
                res.write(textRank.summarizedArticle)
                res.end();

            }catch(error) {
                console.log("an error from .docx")

            }
               

    })


    }
    
    
});

/**
 * server
 */
app.listen(port, () => {
    console.log('Up and running on', port)
})


