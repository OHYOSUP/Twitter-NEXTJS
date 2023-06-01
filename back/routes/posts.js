const express = require("express");
const router = express.Router();
const { Post, Image, User, Comment } = require("../models");

router.get("/", async (req, res, next) => {
  // GET/ posts
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: ['createdAt', 'DESC']
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        }
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
