import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentChart = ({ feedbackData }) => {
    const sentimentCounts = feedbackData.reduce(
        (acc, feedback) => {
            acc[feedback.sentiment] = (acc[feedback.sentiment] || 0) + 1;
            return acc;
        },
        {}
    );

    const chartData = {
        labels: Object.keys(sentimentCounts),
        datasets: [
            {
                label: 'Sentiment Count',
                data: Object.values(sentimentCounts),
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h2>Sentiment Analysis Results</h2>
            <Bar data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Sentiment Analysis Results',
                    },
                },
            }} />
        </div>
    );
};

export default SentimentChart;