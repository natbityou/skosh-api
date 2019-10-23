/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const sharp = require('sharp');

module.exports = {
  register: async function (req, res) {
    
    let uploadImage = () => {
      return new Promise(
        (resolve) => {

          // Verifies that the image doesn't exceed ~10 MB
          req.file('avatar').upload({ maxBytes: 10000000 }, function (err, uploadedFiles) {
            if (err) return res.badRequest(err);
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
              return res.badRequest('Missing avatar for User');
            }

            resolve(uploadedFiles[0]);
          });
        }
      );
    };

    let readImageData = (filepath) => {
      return new Promise(
        (resolve, reject) => {
          fs.readFile(filepath, function (err, fileData) {
            if (err) reject(err);

            resolve(fileData);
          });
        }
      );
    };

    let image = await uploadImage();
    let imageData = await readImageData(image['fd']);

    let compressedImageData = await sharp(imageData)
      .resize(100)
      .png()
      .toBuffer();

    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      avatar: compressedImageData,
    });

    return res.ok();
  },
};


