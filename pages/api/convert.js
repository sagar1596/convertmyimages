import sharp from "sharp";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    },
    responseLimit: '50mb'
  }
};

const post = async (req, res) => {
  try {

    const file = req.body.file,
    targetFormat = req.body.tf || "image/png";

    // Read the image
    let img = await sharp(Buffer.from(file.split("base64,")[1], 'base64'));


    // Create a buffer based on required format
    switch(targetFormat) {
      case "image/png":
        img = await img.png();
        break;
      case "image/jpeg":
      case "image/jpg":
        img = await img.jpeg();
        break;
      case "image/bmp":
        break;
    }


    const bufferConverted = await img.toBuffer();
    const base64Data = bufferConverted.toString('base64');

    res.status(202).json({ b64Data: base64Data, contentType: targetFormat, extension:targetFormat.split('/')[1]});
  } catch(err) {
    console.log(err);
    res.status(404).end();
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