import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.path : null,
      author: req.user.id
    });

    res.json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, author: req.user.id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.updatedAt = Date.now();

    // If a new image is uploaded, remove the old one
    if (req.file) {
      if (blog.image) {
        fs.unlink(blog.image, (err) => {
          if (err) console.log("Error deleting old image:", err);
        });
      }
      blog.image = req.file.path;
    }

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete image if exists
    if (blog.image) {
      fs.unlink(blog.image, (err) => {
        if (err) console.log("Error deleting image:", err);
      });
    }

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "name email");
  res.json(blogs);
};

export const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name");
  res.json(blog);
};
