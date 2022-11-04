import { v4 as uuidv4 } from "uuid";

export const imageUpload = async (req, res, next) => {
  if (req.files) {
    const image = req.files;
    console.log(image);
    const imageName = `${uuidv4()}_${image.name}`;
    image.mv(`../images/${imageName}`);

    res.status(201).json({
      name: imageName,
      url: `/images/${imageName}`,
    });
  } else {
    console.log("da ist was schiefgelaufen bim UploadImage");
  }
  next();
};
