// api.js - API service using native fetch API with cookie-based auth

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// 🧠 Helper: fetch wrapper
async function request(url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // ✅ crucial: send cookies automatically
    });

    // Handle authentication errors globally
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }

    // Parse JSON
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

//
// 📝 Post Service
//
export const postService = {
  getAllPosts: (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    return request(url, { method: "GET" });
  },

  getPost: (idOrSlug) => request(`/posts/${idOrSlug}`, { method: "GET" }),

  createPost: (postData) =>
    request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    }),

  updatePost: (id, postData) =>
    request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    }),

  deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),

  addComment: (postId, commentData) =>
    request(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    }),

  searchPosts: (query) => request(`/posts/search?q=${query}`, { method: "GET" }),
};

//
// 🗂️ Category Service
//
export const categoryService = {
  getAllCategories: () => request("/categories", { method: "GET" }),

  createCategory: (categoryData) =>
    request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    }),
};

//
// 🔐 Auth Service (using cookies, not localStorage)
//
export const authService = {
  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: async (credentials) => {
    // Backend sets cookie automatically
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return data;
  },

  logout: async () => {
    await request("/auth/logout", { method: "POST" }); // your backend should clear the cookie
  },

  getCurrentUser: async () => {
    // Backend reads cookie, returns user info
    const data = await request("/auth/me", { method: "GET" });
    return data.user;
  },
};

export default request;
