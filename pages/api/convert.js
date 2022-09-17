import formidable from "formidable";
import fs from "fs";
import jimp from 'jimp';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    },
    responseLimit: '27mb'
  }
};

const post = async (req, res) => {
  try {

    const files = req.body.files,
    targetFormat = req.body.tf || "image/png",
    greyScale = req.body.gs || false,
    fixedSize = req.body.fixedSize || {},
    scaleInfo = req.body.scaleInfo || {},
    quality = parseInt(req.body.quality) || 100,
    flip = req.body.flip || {},
    rotateAngle = req.body.rotateAngle || 0;

    

    const returnData = await Promise.all(files.map(async file => {
      // Read the image
      let img = await jimp.read(Buffer.from(file.base64.split("base64,")[1], 'base64'));
      img = await img.quality(quality);
      if(greyScale) {
        img = await img.greyscale();
      }
      if(fixedSize.hasOwnProperty('width') || fixedSize.hasOwnProperty('height')) {
        img = await img.resize( fixedSize.width || jimp.AUTO, fixedSize.height || jimp.AUTO )
      }

      if(scaleInfo.width || scaleInfo.height) {
        img = await img.scaleToFit(scaleInfo.width || jimp.AUTO, scaleInfo.height || jimp.AUTO);
      } else if(scaleInfo.scaleFactor) {
        img = await img.scale( scaleInfo.scaleFactor );
      }

      if(flip.hasOwnProperty("horizontal") || flip.hasOwnProperty("vertical") ) {
        img = await img.flip(flip.horizontal, flip.vertical);
      }

      if(rotateAngle) {
        img = await img.rotate(rotateAngle);
      }



      // Create a buffer based on required format
      let formatMIME = jimp.MIME_PNG;
      switch(targetFormat) {
        case "image/png":
          formatMIME = jimp.MIME_PNG;
          break;
        case "image/jpeg":
        case "image/jpg":
          formatMIME = jimp.MIME_JPEG;
          break;
        case "image/bmp":
          formatMIME = jimp.MIME_BMP;
          break;
        case "image/base64":
          formatMIME = img._originalMime;
          break;
      }
      const bufferConverted = await img.getBufferAsync(formatMIME);

      return Promise.resolve({ file: bufferConverted.toString('base64'), fileName: file.fileName});

    })
    );
    
    res.status(202).json({ filesData: returnData, contentType: targetFormat, extension:targetFormat.split('/')[1]});
  } catch(err) {
    console.log(err);
    res.status(404).json({message: err.message}).end();
  }

  
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};