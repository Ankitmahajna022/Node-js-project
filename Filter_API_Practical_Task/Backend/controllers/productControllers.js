import Product from "../models/productModels.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products.length) return res.json({ message: "No products found" })
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) return res.json({ message: "No product found" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const searchByName = async (req, res) => {
    try {
        const products = await Product.findById({
            productName: { $regex: req.query.name, $options: "i" }
        })

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const searchByBrand = async (req, res) => {
    try {
        const products = await Product.findById({
            brand: req.params.brand
        })
    } catch (error) {

    }
}

export const searchMultipleFields = async (req, res) => {
    try {
        const { productName, brand, category } = req.query
        const products = await Product.find({
            productName: { $regex: productName, $options: "i" },
            brand,
            category

        })

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category })

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const priceRangeFilter = async (req, res) => {
    try {
        const { max, min } = req.query

        const products = await Product.find({
            price: { $gte: min || 0, $lte: max || 99999 }
        })

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const ratingFilter = async (req, res) => {
    try {
        const products = Product.find({
            rating: { $gte: req.query.rating || 0 }
        })

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const sortProducts = async (req, res) => {
    try {
        const sortOrder = req.query.order === "decs" ? -1 : 1;
        const products = await Product.find().sort(sortOrder)

        if (!products.length) return res.json({ message: "No products found" });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const paginateProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit)

        const products = await Product.find().skip(skip).limit(limit);

        if (!products.length)
            return res.json({ message: "No products found" });

        res.json({ totalProducts, totalPages, currentPage: page, products });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const advancedFilter = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, rating, sort, page, limit } = req.query;
        const query = {}

        if (category) query.category = category
        if (rating) query.rating = { $gte: rating }
        if (minPrice || maxPrice) query.price = { $gte: minPrice || 0, $lte: maxPrice || 99999 };

        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 10
        const skip = (pageNum - 1) * limitNum;
        let sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);
        if (!products.length)
            return res.json({ message: "No products found" });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
