import formidable from "formidable";
import fs from "fs";
import jimp from 'jimp';
import { quality } from "jimp";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
};

const post = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

      const targetFormat = fields.tf || "image/png",
      quality = parseInt(fields.quality) || 100;
      // greyscale = options["gs"] || false,
      // width = options["width"] || 0,
      // height = options["height"] || 0,
      // holdPerspective = options["hp"] || false,
      // scaleFactor = options["sf"] || 100;


      // Read the image
      const img = await jimp.read(files.file.filepath);

      // Create a buffer based on required format
      let formatMIME = jimp.MIME_PNG;
      switch(targetFormat) {
        case "image/png":
          formatMIME = jimp.MIME_PNG;
          break;
        case "image/jpeg":
          formatMIME = jimp.MIME_JPEG;
          break;
        case "image/bmp":
          formatMIME = jimp.MIME_BMP;
          break;
      }


      // const buffer = await img.getBufferAsync(formatMIME);

      // let imgConverted = await jimp.read(buffer);
      
      if(quality !== 100) {
        img.quality(quality);
      }

      // img.greyscale();

      const bufferConverted = await img.getBufferAsync(formatMIME);
      const base64Data = bufferConverted.toString('base64');

      res.status(202).json({ b64Data: base64Data, contentType: "image/png", extension:'png'});
    });
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