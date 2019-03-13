'use strict';

const Joi = require('joi');
const UserModel = require('../../../models/user-model');

async function validate(payload) {
  const schema = {
    uuid: Joi.string().guid({
      version: ['uuidv4'],
    }),
  };

  return Joi.validate(payload, schema);
}

async function acceptFriendRequest(req, res, next) {
  // destructuring
  const { uuid: friendUuid } = req.body;
  const { uuid: me } = req.claims;

  try {
    await validate({ uuid: friendUuid });
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * tengo que buscar en mi usuario y mi array de friends, el amigo que me hizo la peticion,
   * si se encuentra entonces actualizar el field confirmedAt
   */
  const filter = {
    uuid: me,
    'friends.uuid': friendUuid,
    'friends.confirmedAt': null,
  };

  const op = {
    $set: {
      'friends.$.confirmedAt': Date.now(),
    },
  };

  try {
    const result = UserModel.findOneAndUpdate(filter, op, {
      rawResult: true,
    });

    /***
     * Yo, MIguel , acepto a Jose como amigo entonces
     * ;MIguel en su estado como amigo tiene a jose como amigo 
     * falta poner a MIguel (me )en el listado de amigos de Jose (friend uuid)
     */
    const filter = {
      uuid: friend,
    }

    const op = {
      $push: {
        friends: {
          uuid: me,
          confirmedAt: now,
          createdAt: now,
          rejectedAt: null,
        },
      },

    };
    await UserModel.findOneAndUpdate(filter, op);

    //
    const deletedOp = {
      $pull: {
        friends: {
          uuid: me,
          confirmedAt: null,

        },
      },

    };
  } catch (e) {
    return res.status(500).send(e.message);
  }

  return res.send();
}

module.exports = acceptFriendRequest;
