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

    const file = req.body.file,
    targetFormat = req.body.tf || "image/png",
    greyScale = req.body.gs || false,
    fixedSize = req.body.fixedSize || {},
    scaleInfo = req.body.scaleInfo || {},
    quality = parseInt(req.body.quality) || 100;

    // Read the image
    let img = await jimp.read(Buffer.from(file.split("base64,")[1], 'base64'));
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
    }



    const bufferConverted = await img.getBufferAsync(formatMIME);

    const base64Data = bufferConverted.toString('base64');
    res.status(202).json({ b64Data: base64Data, contentType: targetFormat, extension:targetFormat.split('/')[1]});
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