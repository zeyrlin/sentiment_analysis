// frontend/src/components/AdminTableManagement.js
import React, { useEffect, useState } from "react";
import { getAllTables, updateTableStatus } from "../services/api";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import moment from "moment";

const AdminTableManagement = ({ token }) => {
    const [tables, setTables] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingTable, setEditingTable] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await getAllTables(token, currentPage - 1, 10);
                setTables(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };
        fetchTables();
    }, [token, currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleEditTable = (table) => {
        setEditingTable(table);
        setShowModal(true);
    };

    const handleUpdateTable = async () => {
        try {
            await updateTableStatus(editingTable.id, editingTable, token);
            setShowModal(false);
            setEditingTable(null);
            // Refresh tables
            const response = await getAllTables(token, currentPage - 1, 10);
            setTables(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error updating table:", error);
        }
    };

    return (
        <div>
            <h2>Table Management</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Reservation Time</th>
                    <th>Reserved By</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tables.map((table) => (
                    <tr key={table.id}>
                        <td>{table.id}</td>
                        <td>{table.status}</td>
                        <td>{moment(table.reservationTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                        <td>{table.reservedBy}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditTable(table)}>
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
                    <Modal.Title>Edit Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingTable?.status}
                                onChange={(e) => setEditingTable({ ...editingTable, status: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formReservationTime">
                            <Form.Label>Reservation Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={moment(editingTable?.reservationTime).format("YYYY-MM-DDTHH:mm:ss")}
                                onChange={(e) => setEditingTable({ ...editingTable, reservationTime: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formReservedBy">
                            <Form.Label>Reserved By</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingTable?.reservedBy}
                                onChange={(e) => setEditingTable({ ...editingTable, reservedBy: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTable}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminTableManagement;