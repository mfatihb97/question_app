import React, { useEffect, useState } from 'react'
import UserService from '../Service/UserService';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {

    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            console.log(response)
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    }
    return (
        <div className='container'>
            <ListGroup>
                <h2>Profile Information</h2>
                <ListGroup.Item>Name:{profileInfo.name}</ListGroup.Item>
                <ListGroup.Item>Email:{profileInfo.email}</ListGroup.Item>
                <ListGroup.Item>City:{profileInfo.city}</ListGroup.Item>
                {profileInfo.role === "ADMIN" && (
                    <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
                )}
            </ListGroup>
        </div>
    )
}
