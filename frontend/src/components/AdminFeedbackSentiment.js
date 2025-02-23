// frontend/src/components/AdminFeedbackSentiment.js
import React, { useEffect, useState } from "react";
import { getFeedbackSentimentAnalysis } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const AdminFeedbackSentiment = ({ token }) => {
    const [sentimentData, setSentimentData] = useState([]);

    useEffect(() => {
        const fetchSentimentAnalysis = async () => {
            try {
                const response = await getFeedbackSentimentAnalysis(token);
                const data = [
                    { name: "Positive", value: response.positive },
                    { name: "Negative", value: response.negative },
                ];
                setSentimentData(data);
            } catch (error) {
                console.error("Error fetching feedback sentiment analysis:", error);
            }
        };
        fetchSentimentAnalysis();
    }, [token]);

    return (
        <div>
            <h2>Feedback Sentiment Analysis</h2>
            <BarChart width={600} height={300} data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default AdminFeedbackSentiment;