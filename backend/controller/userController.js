import UserModel from "../models/UserModel.js";

export const createUser = async (req, res) => {
  try {
    const newUserData = await UserModel.create(req.body);
    res.status(201).send(newUserData);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const getUserByID = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    res.status(302).send(getUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
export const deleteUserByID = async (req, res) => {
  try {
    const deleteUser = await UserModel.deleteOne({ _id: req.params.id });
    res.status(202).send(deleteUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
export const updateUserByID = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    await UserModel.updateOne({ _id: req.params.id }, req.body);
    res.status(206).send(`user: ${getUser.userName} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
