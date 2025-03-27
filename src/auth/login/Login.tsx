import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { email, password };
        console.log('Sending:', payload);
        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post(
                'http://api-react.test/auth/login',
                payload
            );
            localStorage.setItem('token', response.data.token);
            console.log('Token:', response.data.token);
            navigate('/');
        } catch (err) {
            setError('Login failed. Check your credentials.');
            console.error(err);
        }
    };

    const handleLoginSuccess = (response: any) => {
        console.log(response);
    };

    return (
        <div className="login-container">
            <Container className="form-login" maxWidth="sm">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        sx={{ fontWeight: 'bold', color: '$primary-color' }}
                        textAlign={'left'}
                        variant="h2"
                        gutterBottom
                    >
                        Login
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{
                                input: { color: 'white' },
                                fieldset: { borderColor: '#808080' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{
                                input: { color: 'white' },
                                fieldset: { borderColor: '#808080' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                    <GoogleOAuthProvider clientId="331635603301-kb43lmq76f6b1ee56753tfbas0b2pof8.apps.googleusercontent.com">
                        <div>
                            <h2>Login with Googles</h2>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={() => console.log('Login Failed')}
                            />
                        </div>
                    </GoogleOAuthProvider>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
