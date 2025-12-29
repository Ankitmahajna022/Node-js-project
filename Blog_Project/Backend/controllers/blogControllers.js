import Blog from "../models/blogModel.js"

export const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create({

            title: req.body.title,
            content: req.body.content,
            image: req.file ? req.file.path : null,
            author: req.userId

        })

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate(" author", "name email")

        res.json(blogs)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) return res.status(404).json({ message: "Blog not found" })
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatedBlog = async(req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.userId },
            req.body,
            { new: true }
        )
        if (!blog)
            return res.status(404).json({ message: "Blog not found or unauthorized" });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletedBlog=async(req,res)=>{
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id, author: req.userId
        })

        if (!blog)
            return res.status(404).json({ message: "Blog not found or unauthorized" });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

