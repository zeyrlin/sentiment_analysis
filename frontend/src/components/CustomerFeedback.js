import React, { useState } from "react";
import { submitFeedback } from "../services/api";
import { Form, Button } from "react-bootstrap";

const CustomerFeedback = ({ token }) => {
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.trim()) {
            setMessage("Review cannot be empty.");
            return;
        }
        try {
            const response = await submitFeedback(review, token);
            setMessage(response);
            setReview("");
        } catch (error) {
            console.error("Error submitting feedback:", error);
            if (error.response) {
                setMessage(`Error: ${error.response.data.error || "Unknown error"}`);
            } else {
                setMessage("Failed to connect to the server. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Submit Feedback</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formReview">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Enter your feedback here..."
                        required
                    />
                </Form.Group>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CustomerFeedback;