import React, { useEffect, useState } from "react";

const InventoryManagement = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch menu items from the backend API
        fetch("http://localhost:8080/api/admin/menu")
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error("Error fetching menu:", error));
    }, []);

    const handleAddMenuItem = () => {
        const newItem = {
            name: "New Item",
            description: "A new menu item",
            price: 9.99,
            available: true,
        };
        fetch("http://localhost:8080/api/admin/menu/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        })
            .then((response) => response.text())
            .then((message) => alert(message))
            .catch((error) => console.error("Error adding menu item:", error));
    };

    return (
        <div>
            <h2>Inventory Management</h2>
            <button onClick={handleAddMenuItem}>Add New Menu Item</button>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.description} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryManagement;