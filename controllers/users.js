import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const updateProfile = async (req, res) => {
  const {id: _id} = req.params;
  const {name, about, tags} = req.body;

  //   console.log("updateprofilebody" + req.body);
  //   console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {$set: {name: name, about: about, tags: tags}},
      {new: true}
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({message: error.message});
  }
};

export const follow = async (req, res) => {
  console.log("from follow");
  console.log(req.body.id);
  if (req.body.id !== req.params.id) {
    // console.log("Hello");
    try {
      //   console.log("Hello World");
      const user = await users.findById(req.params.id);
      const currentUser = await users.findById(req.body.id);
      // console.log(user);
      // console.log(currentUser);
      // console.log(req.body);
      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({$push: {followers: req.body.id}});
        await currentUser.updateOne({$push: {followings: req.params.id}});
        res.status(200).json("user has been followed");
      } else {
        console.log("You already follow this user");
        res.status(402).json("you already follow this user");
      }
    } catch (err) {
      res.status(505).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

export const unfollow = async (req, res) => {
  console.log("from unfollow ");
  console.log(req.body);
  if (req.body.id !== req.params.id) {
    // console.log("Hello");
    try {
      console.log("Hello World");
      const user = await users.findById(req.params.id);
      const currentUser = await users.findById(req.body.id.Luserid);
      console.log(user);
      console.log(currentUser);
      // console.log(req.body);
      if (!user.followers.includes(req.body.id.LuserId)) {
        await user.updateOne({$pull: {followers: req.body.id.Luserid}});
        await currentUser.updateOne({$pull: {followings: req.params.id}});
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(505).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};
