import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    let savedUsers = [];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });

          // Get all users who saved the post
          savedUsers = await prisma.savedPost.findMany({
            where: { postId: id },
            include: {
              user: {
                select: {
                  username: true,
                  avatar: true,
                },
              },
            },
          });

          // Prepare a list of users who saved the post
          const usersWhoSaved = savedUsers.map((save) => save.user);

          // Send the response with post details and the users who saved it
          return res
            .status(200)
            .json({
              ...post,
              isSaved: saved ? true : false,
              savedBy: usersWhoSaved,
            });
        } else {
          console.log("Token verification failed");
        }
      });
    } else {
      // Send the response if no token is provided
      return res.status(200).json({ ...post, isSaved: false, savedBy: [] });
    }
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to get post" });
    }
  }
};

export const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId;

  try {
    // Validation (optional)
    if (!postData || !postData.title || !postData.price) {
      return res.status(400).json({ message: "Post data is incomplete" });
    }

    // Prisma post creation
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        // Only create postDetail if it's provided
        ...(postDetail && {
          postDetail: {
            create: postDetail,
          },
        }),
      },
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
