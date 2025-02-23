import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

// User-related functions
export const registerUser = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { username, password, role });
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

// Customer-related functions
export const getAllMenuItems = async (token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/menu?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
};

export const placeOrder = async (orderDetails, token) => {
    try {
        await axios.post(`${API_BASE_URL}/user/order/place`, orderDetails, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

export const submitFeedback = async (review, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/feedback/submit`, { review }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
    }
};

// Admin-related functions
export const getAllMenuItemsAdmin = async (token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/menu?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
};

export const addMenuItem = async (menuItem, token) => {
    try {
        await axios.post(`${API_BASE_URL}/admin/menu/add`, menuItem, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error adding menu item:", error);
        throw error;
    }
};

export const updateMenuItem = async (id, menuItem, token) => {
    try {
        await axios.put(`${API_BASE_URL}/admin/menu/update/${id}`, menuItem, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error updating menu item:", error);
        throw error;
    }
};

export const deleteMenuItem = async (id, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/admin/menu/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        throw error;
    }
};

export const getAllOrders = async (token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/orders?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

export const updateOrderStatus = async (id, order, token) => {
    try {
        await axios.put(`${API_BASE_URL}/admin/orders/update/${id}`, order, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};

export const getAllTables = async (token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/tables?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tables:", error);
        throw error;
    }
};

export const updateTableStatus = async (id, table, token) => {
    try {
        await axios.put(`${API_BASE_URL}/admin/tables/update/${id}`, table, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error updating table status:", error);
        throw error;
    }
};

export const createPromotion = async (promotionDetails, token) => {
    try {
        await axios.post(`${API_BASE_URL}/admin/promotion`, promotionDetails, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error creating promotion:", error);
        throw error;
    }
};

export const getFeedbackSentimentAnalysis = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/feedback/sentiment`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching feedback sentiment analysis:", error);
        throw error;
    }
};