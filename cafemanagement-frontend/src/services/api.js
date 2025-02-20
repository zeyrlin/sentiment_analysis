import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

export const submitFeedback = async (review) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/feedback/submit`, { review });
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};

export const getFeedbackData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/feedback/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback data:', error);
        throw error;
    }
};