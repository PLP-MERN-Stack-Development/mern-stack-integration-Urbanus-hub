// controllers/categoryController.js
import Category from '../models/Category.js';
import Post from '../models/Post.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Creator
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Creator
export const updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Creator
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if there are posts using this category
    const postsCount = await Post.countDocuments({ category: req.params.id });
    if (postsCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. ${postsCount} post(s) are using this category`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get posts by category
// @route   GET /api/categories/:id/posts
// @access  Public
export const getCategoryPosts = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const posts = await Post.find({ category: req.params.id, isPublished: true })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      category: category.name,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get category statistics
// @route   GET /api/categories/:id/stats
// @access  Public
export const getCategoryStats = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const totalPosts = await Post.countDocuments({ category: req.params.id });
    const publishedPosts = await Post.countDocuments({
      category: req.params.id,
      isPublished: true,
    });

    // Get total views for all posts in this category
    const posts = await Post.find({ category: req.params.id });
    const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);

    res.status(200).json({
      success: true,
      data: {
        category: category.name,
        totalPosts,
        publishedPosts,
        draftPosts: totalPosts - publishedPosts,
        totalViews,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};