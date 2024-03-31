const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// create a new post
router.post("/posts", async (req, res) => {
  try {
    const { title, description, maker, images, date } = req.body;
    const newPost = await Post.create({
      title,
      description,
      maker,
      images,
      date,
      likes,
      dislikes,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
