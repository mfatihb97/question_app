import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import UserService from '../Service/UserService';
import { Link } from 'react-router-dom';


export const UserManagementPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllUsers(token);
            setUsers(response.ourUsersList);
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const deleteUser = async (userId) => {
        try {
            const confrimDelete = window.confirm('Are you sure you want to delet this user?');
            const token = localStorage.getItem('token')

            if (confrimDelete) {
                await UserService.deleteUser(userId, token);
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }
    return (
        <div className='container'>
            <h2>Kullanıcı Yönetim Sayfası</h2>
            <button type='button' className='btn btn-outline-success'><Link to='/signup'>Yeni Kullanıncı Ekle </Link></button>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='btn btn-outline-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                    <button className='btn btn-outline-warning'><Link to={`/update-user/${user.id}`}>Update</Link></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
