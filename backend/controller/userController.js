import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);
    const newUserData = await UserModel.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      disabilities: req.body.disabilities,
      email: req.body.email,
      password: hashedSaltyPassword,
      location: req.body.location,
    });

    res.status(201).send(newUserData);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const userLogin = async (req, res) => {
  const loginUser = await UserModel.findOne({ userName: req.body.userName });
  if (!loginUser) {
    return res.send({ error: "user/password combination not found" });
  }
  const isRightPassword = await bcrypt.compare(
    req.body.password,
    loginUser.password
  );

  if (!isRightPassword) {
    return res.send({ error: "user/password combination not found" });
  }

  const expiresInSec = 1 * 60 * 60 * 24; // 1 h * 24 => 24h

  const token = jwt.sign(
    {
      userName: loginUser.userName,
      userId: loginUser._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: expiresInSec }
  );

  res.cookie("jwt", token, { httpOnly: true, maxAge: expiresInSec * 1000 });

  const expireDate = new Date().getTime() + expiresInSec * 1000;

  res.cookie("isLogged", expireDate, {
    httpOnly: false,
    maxAge: expiresInSec * 1000,
  });

  return res.send({
    msg: "successfully logged in",
    userName: loginUser.userName,
    userId: loginUser._id,
  });
};

export const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("isLogged");
  return res.status(200).json({ msg: "successfully logged out" });
};

export const getUserByID = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id)
      .populate("myEvents")
      .populate("watchedEvents")
      .populate("bookedEvents");

    res.status(200).send(getUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const getUser = await UserModel.find({userName: req.params.username})
      .populate("myEvents")
      .populate("watchedEvents")
      .populate("bookedEvents");

    res.status(200).send(getUser);
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

    if (req.body.password) {
      const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);

      await UserModel.updateOne(
        { _id: req.params.id },
        { password: hashedSaltyPassword }
      );
    } else {
      await UserModel.updateOne({ _id: req.params.id }, req.body);
    }
    res.status(206).send(`user: ${getUser.userName} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    getUser.comments.push(req.body)
    await getUser.save()
    res.status(206).send(`user: ${getUser.userName} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const addToWatchList = async (req, res) => {
  try {
    const passedToken = req.cookies.jwt;
    const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET);
    console.log(req.params.id);
    const getUser = await UserModel.findOne({ _id: decodedToken.userId });
    console.log(getUser);
    console.log(req.body.watchedEvents);
    getUser.watchedEvents.push(req.body.watchedEvents);

    await getUser.save();
    res.send(getUser);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.username });
    res.status(200).send(user.userName);
  } catch (error) {
    res.status(204).send(false);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    res.status(200).send(user.email);
  } catch (error) {
    res.status(204).send(false);
  }
};
