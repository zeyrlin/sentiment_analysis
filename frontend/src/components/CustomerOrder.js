import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/api";
import { Form, Button } from "react-bootstrap";

const CustomerOrder = ({ token }) => {
    const [orderDetails, setOrderDetails] = useState({
        customerName: "",
        items: [],
        totalAmount: 0,
        redeemedLoyaltyPoints: false,
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!orderDetails.customerName || orderDetails.items.length === 0 || orderDetails.totalAmount <= 0) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await placeOrder(orderDetails, token);
            alert("Order placed successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <div>
            <h2>Place an Order</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCustomerName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={orderDetails.customerName}
                        onChange={(e) =>
                            setOrderDetails({ ...orderDetails, customerName: e.target.value })
                        }
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formItems">
                    <Form.Label>Items (comma-separated)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter items (e.g., Coffee, Sandwich)"
                        value={orderDetails.items.join(", ")}
                        onChange={(e) =>
                            setOrderDetails({
                                ...orderDetails,
                                items: e.target.value.split(",").map((item) => item.trim()),
                            })
                        }
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formTotalAmount">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Enter total amount"
                        value={orderDetails.totalAmount}
                        onChange={(e) =>
                            setOrderDetails({
                                ...orderDetails,
                                totalAmount: parseFloat(e.target.value),
                            })
                        }
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formRedeemedLoyaltyPoints">
                    <Form.Label>Redeem Loyalty Points</Form.Label>
                    <Form.Check
                        type="switch"
                        checked={orderDetails.redeemedLoyaltyPoints}
                        onChange={(e) =>
                            setOrderDetails({
                                ...orderDetails,
                                redeemedLoyaltyPoints: e.target.checked,
                            })
                        }
                    />
                </Form.Group>
                <br />
                <Button type="submit">Place Order</Button>
            </Form>
        </div>
    );
};

export default CustomerOrder;