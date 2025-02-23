import React, { useEffect, useState } from "react";
import { getAllMenuItemsAdmin, addMenuItem, updateMenuItem, deleteMenuItem } from "../services/api";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import moment from "moment";

const AdminMenuManagement = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [newItem, setNewItem] = useState({ name: "", description: "", price: 0, available: false });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await getAllMenuItemsAdmin(token, currentPage - 1, 10);
                setMenuItems(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuItems();
    }, [token, currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleAddItem = async () => {
        try {
            await addMenuItem(newItem, token);
            setShowModal(false);
            setNewItem({ name: "", description: "", price: 0, available: false });
            // Refresh menu items
            const response = await getAllMenuItemsAdmin(token, currentPage - 1, 10);
            setMenuItems(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setNewItem({ name: item.name, description: item.description, price: item.price, available: item.available });
        setShowModal(true);
    };

    const handleUpdateItem = async () => {
        try {
            await updateMenuItem(editingItem.id, newItem, token);
            setShowModal(false);
            setNewItem({ name: "", description: "", price: 0, available: false });
            setEditingItem(null);
            // Refresh menu items
            const response = await getAllMenuItemsAdmin(token, currentPage - 1, 10);
            setMenuItems(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error updating menu item:", error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteMenuItem(id, token);
            // Refresh menu items
            const response = await getAllMenuItemsAdmin(token, currentPage - 1, 10);
            setMenuItems(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error deleting menu item:", error);
        }
    };

    return (
        <div>
            <h2>Menu Management</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        <td>{item.available ? "Yes" : "No"}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditItem(item)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteItem(item.id)} className="ml-2">
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination className="mt-3" count={totalPages} page={currentPage} onChange={(_, value) => handleChange(_, value)} />
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Item
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAvailable">
                            <Form.Label>Available</Form.Label>
                            <Form.Check
                                type="switch"
                                checked={newItem.available}
                                onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editingItem ? handleUpdateItem : handleAddItem}>
                        {editingItem ? "Save Changes" : "Add Item"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminMenuManagement;