// controllers/postController.js
import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    let posts;
    const { page = 1, limit = 10, search, category, tag, isPublished } = req.query;

    // Build query
    const query = {};

    // Filter by published status (default to published only for public access)
    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    } else {
      query.isPublished = true;
    }

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
 
    // Execute query with pagination
    else{
    posts = await Post.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);}

      if(!posts){
        return res.status(404).json({message:"No posts found 🥲🥲"})
      }

    const count = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
     
      count: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .populate('comments.user', 'name avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .populate('comments.user', 'name avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    await post.incrementViewCount();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private/Creator
export const createPost = async (req, res) => {
  try {
    // Add user as author
    req.body.author = req.user.id;

    const post = await Post.create(req.body);

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name avatar')
      .populate('category', 'name slug');

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private/Creator
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Make sure user is post author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('author', 'name avatar')
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Creator
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Make sure user is post author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      data:post});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.addComment(req.user.id, req.body.content);

    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .populate('comments.user', 'name avatar');

    res.status(201).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete comment from post
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Make sure user is comment owner or post author
    if (
      comment.user.toString() !== req.user.id &&
      post.author.toString() !== req.user.id
    ) {
      return res.status(401).json({ message: 'Not authorized to delete this comment' });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get posts by author
// @route   GET /api/posts/author/:userId
// @access  Public
export const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.params.userId,
      isPublished: true,
    })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get my posts (for logged in creator)
// @route   GET /api/posts/me/posts
// @access  Private/Creator
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Publish/Unpublish post
// @route   PATCH /api/posts/:id/publish
// @access  Private/Creator
export const togglePublish = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Make sure user is post author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to modify this post' });
    }

    post.isPublished = !post.isPublished;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get popular posts
// @route   GET /api/posts/popular
// @access  Public
export const getPopularPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const posts = await Post.find({ isPublished: true })
      .sort({ viewCount: -1 })
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get related posts
// @route   GET /api/posts/:id/related
// @access  Public
export const getRelatedPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const limit = parseInt(req.query.limit) || 5;

    // Find posts with same category or tags
    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      isPublished: true,
      $or: [
        { category: post.category },
        { tags: { $in: post.tags } },
      ],
    })
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: relatedPosts.length,
      data: relatedPosts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};