import React, { useEffect, useState } from 'react';
import { getFeedbackData } from '../services/api';
import SentimentChart from './SentimentChart';

const AdminDashboard = () => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const data = await getFeedbackData();
                setFeedbackData(data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };
        fetchFeedbackData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <SentimentChart feedbackData={feedbackData} />
            {/* Add more admin-specific features here */}
        </div>
    );
};

export default AdminDashboard;