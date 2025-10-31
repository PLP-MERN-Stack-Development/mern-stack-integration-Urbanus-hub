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

    // Parse JSON - handle cases where response might not be JSON
    let data;
    try {
      data = await response.json();
      console.log("Response data:", data);
      console.log("Response status:", response.status, response.ok);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      // If JSON parsing fails, create a generic error object
      data = {
        success: false,
        message: `Server error: ${response.status} ${response.statusText}`,
      };
    }

    if (!response.ok) {
      console.error("Response not OK:", data);
      throw new Error(
        data.message || `Request failed with status ${response.status}`
      );
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

  searchPosts: (query) =>
    request(`/posts/search?q=${query}`, { method: "GET" }),
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
  register: async (userData) => {
    const response = await request("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return response;
  },

  login: async (credentials) => {
    // Backend sets cookie automatically
    const data = await request("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return data;
  },

  logout: async () => {
    await request("/users/logout", { method: "POST" }); // backend clears the cookie
  },

  // getCurrentUser: async () => {
  //   // Backend reads cookie, returns user info
  //   const response = await request("/users/me", { method: "GET" });
  //   // Handle the nested data structure from backend
  //   return response.data || response.user || response;
  // },
};

export default request;
