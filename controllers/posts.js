import mongoose from "mongoose";
// import {CommunityPosts as posts} from "../models/CommunityPosts";
import post from "../models/CommunityPosts.js";

// Create a post
export const CreatePost = async (req, res) => {
  const postData = req.body;
  const userId = req.userId;
  // console.log("From CreatePost");
  // console.log(postData);
  const newPost = new post({...postData, userId});
  try {
    await newPost.save();
    // console.log("POST CREATED");
    // return res.send({name: "LAKSHMAN"});
    res.status(200).json("Created a post successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't create a post");
  }
};

// Update a post
// Delete a post
export const deletePost = async (req, res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    await post.findByIdAndRemove(_id);
    res.status(200).json({message: "successfully deleted..."});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const votePost = async (req, res) => {
  const {id: _id} = req.params;
  const {value} = req.body;
  const userId = req.userId;
  // console.log(id);
  // console.log(value);
  // console.log(userId);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const currpost = await post.findById(_id);
    const upIndex = currpost.upVote.findIndex((id) => id === String(userId));
    const downIndex = currpost.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        currpost.downVote = currpost.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        currpost.upVote.push(userId);
      } else {
        currpost.upVote = currpost.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        currpost.upVote = currpost.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        currpost.downVote.push(userId);
      } else {
        currpost.downVote = currpost.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await post.findByIdAndUpdate(_id, currpost);
    res.status(200).json({message: "voted successfully..."});
  } catch (error) {
    res.status(404).json({message: "id not found"});
  }
};

// Like a post
//  get a post

//  get all posts
export const getAllPosts = async (req, res) => {
  try {
    const postsList = await post.find();
    res.status(200).json(postsList);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};
