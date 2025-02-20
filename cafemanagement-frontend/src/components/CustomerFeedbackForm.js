import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const CustomerFeedbackForm = () => {
    const [review, setReview] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.trim()) {
            setMessage('Review cannot be empty.');
            return;
        }
        try {
            const response = await submitFeedback(review);
            setMessage(response);
            setReview('');
        } catch (error) {
            console.error('Axios Error:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
                setMessage(`Error: ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                // No response received from the server
                console.error('No response received:', error.request);
                setMessage('Failed to connect to the server. Please try again.');
            } else {
                // Something else went wrong
                console.error('Error Message:', error.message);
                setMessage('An unexpected error occurred. Please try again.');
            }
        }
    };  

    return (
        <div>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Enter your feedback here..."
                    rows="4"
                    cols="50"
                    required
                />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CustomerFeedbackForm;