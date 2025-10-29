// context/PostContext.js - Post Data Context
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      title: "9 Half-up/half-down Hairstyles for Long and Medium Hair",
      excerpt: "Discover the perfect balance between casual and elegant with these versatile hairstyles that work for any occasion.",
      author: { name: "Emma Wilson", avatar: "https://picsum.photos/seed/emma/40/40.jpg" },
      category: "Lifestyle",
      readTime: 5,
      likes: 142,
      comments: 23,
      date: "2023-11-15",
      image: "https://picsum.photos/seed/hairstyles/800/500.jpg",
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      title: "11 Work From Home Part-Time Jobs You Can Do Now",
      excerpt: "Looking for flexible work options? These remote opportunities offer great work-life balance while maintaining your income.",
      author: { name: "Alex Johnson", avatar: "https://picsum.photos/seed/alex/40/40.jpg" },
      category: "Business",
      readTime: 8,
      likes: 98,
      comments: 15,
      date: "2023-11-14",
      image: "https://picsum.photos/seed/workfromhome/800/500.jpg",
      liked: false,
      bookmarked: false
    },
    {
      id: 3,
      title: "The Future of Sustainable Technology",
      excerpt: "How innovative green technologies are reshaping our world and creating a more sustainable future for generations to come.",
      author: { name: "Sam Rivera", avatar: "https://picsum.photos/seed/sam/40/40.jpg" },
      category: "Technology",
      readTime: 10,
      likes: 187,
      comments: 42,
      date: "2023-11-13",
      image: "https://picsum.photos/seed/sustainable/800/500.jpg",
      liked: false,
      bookmarked: false
    },
    {
      id: 4,
      title: "Healthy Meal Prep Ideas for Busy Professionals",
      excerpt: "Save time and eat well with these simple meal prep strategies that fit into your hectic schedule.",
      author: { name: "Jordan Taylor", avatar: "https://picsum.photos/seed/jordan/40/40.jpg" },
      category: "Food",
      readTime: 6,
      likes: 124,
      comments: 18,
      date: "2023-11-12",
      image: "https://picsum.photos/seed/mealprep/800/500.jpg",
      liked: false,
      bookmarked: false
    },
    {
      id: 5,
      title: "Mindfulness Practices for Better Sleep",
      excerpt: "Improve your sleep quality with these simple mindfulness techniques that calm your mind before bedtime.",
      author: { name: "Casey Morgan", avatar: "https://picsum.photos/seed/casey/40/40.jpg" },
      category: "Health",
      readTime: 7,
      likes: 156,
      comments: 31,
      date: "2023-11-11",
      image: "https://picsum.photos/seed/mindfulness/800/500.jpg",
      liked: false,
      bookmarked: false
    },
    {
      id: 6,
      title: "Building a Personal Brand in the Digital Age",
      excerpt: "Stand out in a crowded digital landscape with these authentic personal branding strategies.",
      author: { name: "Taylor Kim", avatar: "https://picsum.photos/seed/taylor/40/40.jpg" },
      category: "Business",
      readTime: 9,
      likes: 203,
      comments: 27,
      date: "2023-11-10",
      image: "https://picsum.photos/seed/personalbrand/800/500.jpg",
      liked: false,
      bookmarked: false
    }
  ];

  const categories = ["All", "Technology", "Lifestyle", "Health", "Food", "Business", "Culture", "Travel"];

  useEffect(() => {
    // Simulate fetching posts from API
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.success(post.liked ? 'Post unliked' : 'Post liked!');
    }
  };

  const handleBookmark = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
    );
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.success(post.bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');
    }
  };

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const value = {
    posts,
    filteredPosts,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
    handleLike,
    handleBookmark
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};