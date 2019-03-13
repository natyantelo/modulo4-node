'use strict';

const PostModel = require('../../../models/post-model');
const WallModel = require('../../../models/wall-model');


async function getUserWall(req, res, next) {
  const { uuid } = req.claims;

  const filter = {
    uuid,
  };

  const projection = {
    _id: 0,
    posts: 1,
  };

  try {
    const wall = await WallModel.findOne(filter, projection).lean();
    if (!wall) {
      return {
        data: [],
      };
    }
    const posts = await getPostsById(wall.posts);
    const response = {
      data: posts,
    };

    db.collection.updateMany(
      <filter>,
      <update>,
      {
            upsert: <boolean>,
        writeConcern: <document>,
        collation: <document>,
        arrayFilters: [ <filterdocument1>, ... ]
              }
           )
        
            return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
                }
              
              }
              
              
module.exports = getUserWall;