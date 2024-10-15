import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(username, password)
            if (userData.token) {
                localStorage.setItem('token', userData.token)
                localStorage.setItem('role', userData.role)
                navigate('/profile')
            } else {
                setError(userData.message)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
            setTimeout(() => {
                setError('');
            }, 5000)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className='container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-body-secondary'>
                <div className='border border-primary rounded p-5'>
                    {error && <p>{error}</p>}
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className='d-flex gap-3'>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Button href='/signup' variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
