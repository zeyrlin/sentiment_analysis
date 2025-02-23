import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { getAllOrders, addOrder, updateOrder, deleteOrder } from '../services/api';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [newOrder, setNewOrder] = useState({ customerName: '', items: [], totalAmount: 0 });
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders(currentPage - 1, 10); // Adjust page number for 0-based index
                setOrders(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleAddOrder = async () => {
        try {
            await addOrder(newOrder);
            setShowModal(false);
            setNewOrder({ customerName: '', items: [], totalAmount: 0 });
            // Refresh orders
            const response = await getAllOrders(currentPage - 1, 10);
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setNewOrder({ customerName: order.customerName, items: order.items, totalAmount: order.totalAmount });
        setShowModal(true);
    };

    const handleUpdateOrder = async () => {
        try {
            await updateOrder(editingOrder.id, newOrder);
            setShowModal(false);
            setNewOrder({ customerName: '', items: [], totalAmount: 0 });
            setEditingOrder(null);
            // Refresh orders
            const response = await getAllOrders(currentPage - 1, 10);
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await deleteOrder(id);
            // Refresh orders
            const response = await getAllOrders(currentPage - 1, 10);
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error deleting order:', error);
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
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.items.join(', ')}</td>
                        <td>{order.totalAmount}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditOrder(order)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination className="mt-3" count={totalPages} page={currentPage} onChange={handleChange} />
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Order</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingOrder ? 'Edit Order' : 'Add Order'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCustomerName">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newOrder.customerName}
                                onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formItems">
                            <Form.Label>Items</Form.Label>
                            <Form.Control
                                type="text"
                                value={newOrder.items.join(', ')}
                                onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value.split(',').map(item => item.trim()) })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTotalAmount">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={newOrder.totalAmount}
                                onChange={(e) => setNewOrder({ ...newOrder, totalAmount: parseFloat(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editingOrder ? handleUpdateOrder : handleAddOrder}>
                        {editingOrder ? 'Save Changes' : 'Add Order'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderManagement;