// frontend/src/components/AdminOrderManagement.js
import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/api";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import moment from "moment";

const AdminOrderManagement = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders(token, currentPage - 1, 10);
                setOrders(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, [token, currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setShowModal(true);
    };

    const handleUpdateOrder = async () => {
        try {
            await updateOrderStatus(editingOrder.id, editingOrder, token);
            setShowModal(false);
            setEditingOrder(null);
            // Refresh orders
            const response = await getAllOrders(token, currentPage - 1, 10);
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <div>
            <h2>Order Management</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                    <th>Redeemed Loyalty Points</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.items.join(", ")}</td>
                        <td>${order.totalAmount}</td>
                        <td>{order.redeemedLoyaltyPoints ? "Yes" : "No"}</td>
                        <td>{moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditOrder(order)}>
                                Edit
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination className="mt-3" count={totalPages} page={currentPage} onChange={(_, value) => handleChange(_, value)} />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCustomerName">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingOrder?.customerName}
                                onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formItems">
                            <Form.Label>Items</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingOrder?.items.join(", ")}
                                onChange={(e) => setEditingOrder({ ...editingOrder, items: e.target.value.split(",").map((item) => item.trim()) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTotalAmount">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={editingOrder?.totalAmount}
                                onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: parseFloat(e.target.value) })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRedeemedLoyaltyPoints">
                            <Form.Label>Redeemed Loyalty Points</Form.Label>
                            <Form.Check
                                type="switch"
                                checked={editingOrder?.redeemedLoyaltyPoints}
                                onChange={(e) => setEditingOrder({ ...editingOrder, redeemedLoyaltyPoints: e.target.checked })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateOrder}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminOrderManagement;