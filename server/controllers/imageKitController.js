const dotenv = require('dotenv').config();// Load environment variables

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// get endPoints
const getEndPoints = async (req,res) => {
    const result=imagekit.getAuthenticationParameters();
    res.json(result)
}

module.exports = {
  getEndPoints
};