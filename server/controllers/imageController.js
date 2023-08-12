const Image = require("../models/Image");

exports.getImage = async (req, res) => {
  try {
    const data = await Image.find();
    res.json({data: data})
  } catch (err) {
    console.log(err)
  }
};

exports.createImage = async (req, res) => {
  const { base64 } = req.body;
  try {
    await Image.create({image:base64})
    res.status(201).json({Upload:"อัพโหลดสำเร็จ"})

  } catch (err) {
    res.json(err)
    console.log(err)
  }
};
