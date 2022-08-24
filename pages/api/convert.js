import formidable from "formidable";
import fs from "fs";
import jimp from 'jimp';
import { quality } from "jimp";

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
    targetFormat = req.body.tf || "image/png";

    // Read the image
    const img = await jimp.read(Buffer.from(file.split("base64,")[1], 'base64'));

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
    // const cb = (bufferConverted) => {
    //   if(bufferConverted) {
    //     const base64Data = bufferConverted.toString('base64');
    //     res.status(202).json({ b64Data: base64Data, contentType: targetFormat, extension:targetFormat.split('/')[1]});
    //   }
    // }
    // img.getBuffer(formatMIME, cb);

    // res.status(202).json({ "sagar": "awesome"});

    // const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {

    //   const targetFormat = fields.tf || "image/png";


    //   // Read the image
    //   const img = await jimp.read(files.file.filepath);

    //   // Create a buffer based on required format
    //   let formatMIME = jimp.MIME_PNG;
    //   switch(targetFormat) {
    //     case "image/png":
    //       formatMIME = jimp.MIME_PNG;
    //       break;
    //     case "image/jpeg":
    //     case "image/jpg":
    //       formatMIME = jimp.MIME_JPEG;
    //       break;
    //     case "image/bmp":
    //       formatMIME = jimp.MIME_BMP;
    //       break;
    //   }
    //   const cb = (bufferConverted) => {
    //     const base64Data = bufferConverted.toString('base64');
    //     res.status(202).json({ b64Data: base64Data, contentType: targetFormat, extension:targetFormat.split('/')[1]});
    //   }
    //   // const bufferConverted = await img.getBufferAsync(formatMIME);
    //   image.getBuffer(mime, cb);
      

      
    // });
  } catch(err) {
    console.log(err);
    res.status(404).end();
  }

  
};

const _convertToPng = (file) => {
  
}

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
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