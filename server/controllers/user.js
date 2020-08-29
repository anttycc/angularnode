const UserModel = require('../models/user');
const { throwError } = require('rxjs');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const body = req.body;
      let user = await UserModel.findOne({ email: body.email });
      if (!user) {
        user = await UserModel.create(body);
        res.status(200).json({ status: true });
      } else {
        throw { statusCode: 409, message: 'User already exist.' }
      }
    } catch (e) {
      next(e);
    }

  },
  updateUser: async (req, res, next) => {
    try {
      const body = req.body;
      let user = await UserModel.findOne({ email: body.email, _id: { $ne: req.params.id } });
      if (!user) {
        user = await UserModel.findOneAndUpdate({ _id: req.params.id }, { $set: { ...body } }, { new: true });
        res.status(200).json({ status: true, user });
      } else {
        throw { statusCode: 409, message: 'User already exist.' }
      }
    } catch (e) {
      next(e);
    }

  },
  getAllUser: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1, 10);
      const limit = parseInt(req.query.limit || 5, 10);
      const skip = (page - 1) * limit;
      console.log(page, limit, skip)
      const totalRecords = await UserModel.count({});
      const users = await UserModel.find({}).sort({ firstname: -1 }).skip(skip).limit(limit);
      res.status(200).json({ status: true, items: users, totalRecords });
    } catch (e) {
      next(e);
    }

  },
  getUser: async (req, res, next) => {
    try {
      const users = await UserModel.findOne({ _id: req.params.id });
      res.status(200).json({ status: true, user: users });
    } catch (e) {
      next(e);
    }

  },
  deleteUser: async (req, res, next) => {
    try {
      const users = await UserModel.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: true });
    } catch (e) {
      next(e);
    }

  },

  uploadImage: async (req, res, next) => {
    try {
      const users = await UserModel.findOneAndUpdate({ _id: req.params.id }, { $set: { profileImage: req.body.imageUrl } });
      res.status(200).json({ status: true });
    } catch (e) {
      next(e);
    }

  }

}