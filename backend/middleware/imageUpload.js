import { v4 as uuidv4 } from "uuid";

export const imageUpload = async (req, res, next) => {
  if (req.files) {
    const image = req.files.image;
    console.log(image);
    const imageName = `${uuidv4()}_${image.name}`;
    image.mv(`./images/${imageName}`);
    req.body.imageUrl = `/images/${imageName}`;
  } else {
    console.log("da ist etwas schief gelaufen beim UploadImage");
  }
  next();
};
