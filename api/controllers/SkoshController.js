/**
 * SkoshController
 *
 * @description :: Server-side logic for managing Skosh posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const fs = require('fs');
const sharp = require('sharp');

module.exports = {
  // Upload a Skosh
  createSkosh: async function (req, res) {
  
    let uploadImage = () => {
      return new Promise(
        (resolve) => {

          // Verifies that the image doesn't exceed ~10 MB
          req.file('image').upload({ maxBytes: 10000000 }, function (err, uploadedFiles) {
            if (err) return res.badRequest(err);
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
              return res.badRequest('Missing image for Skosh');
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
      .webp()
      .toBuffer();

    await Skosh.create({
      user_id: parseInt(req.user.id, 10),
      skosh_type: parseInt(req.body.type, 10),
      caption: req.body.caption,
      image: compressedImageData,
    });
    
    return res.ok();
  },
  // Get data for Skosh cards on homepage
  listSkoshTypes: async function (req, res) {
    let litterSum = await Skosh.count({
      where: { skosh_type: 1 },
    });

    let coffeeSum = await Skosh.count({
      where: { skosh_type: 2 },
    });

    let donateSum = await Skosh.count({
      where: { skosh_type: 3 },
    });

    let result = [
      {
        'alias' : 'litter',
        'skosh_type' : 1,
        'total' : litterSum,
      },
      {
        'alias' : 'coffee',
        'skosh_type' : 2,
        'total' : coffeeSum,
      },
      {
        'alias' : 'donate',
        'skosh_type' : 3,
        'total' : donateSum,
      },
    ];

    return res.ok(result);
  },
  // Get all Skoshes for a specific Skosh type
  listSkoshes: async function (req, res) {
    // Need to use special query to avoid selecting image data
    // Also want to get User data along with the skoshes
    var SKOSH_QUERY = `
    SELECT skoshes.likes, skoshes.id, skoshes.user_id, users.username
    FROM skoshes
    JOIN users ON users.id = skoshes.user_id
    WHERE skoshes.skosh_type = $1`;
    
    let skoshTypeId = parseInt(req.params.skosh_type_id, 10);

    var results = await Skosh.getDatastore().sendNativeQuery(SKOSH_QUERY, [ skoshTypeId ]);

    return res.ok(results['rows']);
  },
  // List all Skoshes from a specific user (:user_id)
  listUserSkoshes: async function (req, res) {
    let skoshes = await Skosh.find({
      where: { user_id: req.params.user_id },
    });

    return res.ok(skoshes);
  },
}