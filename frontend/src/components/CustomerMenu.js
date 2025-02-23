import React, { useEffect, useState } from "react";
import { getAllMenuItems } from "../services/api";
import { Card, Button } from "react-bootstrap";

const CustomerMenu = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await getAllMenuItems(token);
                setMenuItems(response.content);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuItems();
    }, [token]);

    return (
        <div>
            <h2>Menu</h2>
            <div className="d-flex flex-wrap">
                {menuItems.map((item) => (
                    <Card key={item.id} style={{ width: "18rem", margin: "10px" }}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>Price: ${item.price}</Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CustomerMenu;