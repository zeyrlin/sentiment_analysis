// frontend/src/components/AdminPromotions.js
import React, { useState } from "react";
import { createPromotion } from "../services/api";
import { Form, Button } from "react-bootstrap";

const AdminPromotions = ({ token }) => {
    const [promotionDetails, setPromotionDetails] = useState({
        description: "",
        pointsRequired: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPromotion(promotionDetails, token);
            alert("Promotion created successfully!");
            setPromotionDetails({ description: "", pointsRequired: 0 });
        } catch (error) {
            console.error("Error creating promotion:", error);
            alert("Failed to create promotion. Please try again.");
        }
    };

    return (
        <div>
            <h2>Create Promotion</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter promotion description"
                        value={promotionDetails.description}
                        onChange={(e) =>
                            setPromotionDetails({
                                ...promotionDetails,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formPointsRequired">
                    <Form.Label>Points Required</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter points required"
                        value={promotionDetails.pointsRequired}
                        onChange={(e) =>
                            setPromotionDetails({
                                ...promotionDetails,
                                pointsRequired: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    />
                </Form.Group>
                <br />
                <Button type="submit">Create Promotion</Button>
            </Form>
        </div>
    );
};

export default AdminPromotions;