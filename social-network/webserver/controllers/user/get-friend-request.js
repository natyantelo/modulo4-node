'use strict';

const UserModel = require('../../../models/user-model');

async function getFriendRequests(req, res, next) {
  const { uuid } = req.claims;

  /**
   * buscamos los ids de mis amigos/posibles amigos
   *
   */

  try {

    const filter = {
      uuid,
    };

    const projection = {
      friends: 1,
      _id: 0,
    };

    const friendsResult = await UserModel.findOne(filter, projection);
    console.log(friendsResult);
    const friendsUuids = friendsResult.friends.map(f => f.uuid); // [uuid1,uuid2,...,uuidn]


    const filterFriendData = {
      $and: [
        {
          uuid: {
            $in: friendsUuids,
          },
          $and: [
            {
              'friends.confirmedAt': null,
            },
            {
              'friends.rejectedAt': null,
            },
          ],
        }],
    };

    const projectionFriendsData = {
      uuid: 1,
      avatarUrl: 1,
      fullName: 1,
      _id: 0,
    };





    const users = await UserModel.find(filterFriendData, projectionFriendsData).lean();


    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}


module.exports = getFriendRequests;