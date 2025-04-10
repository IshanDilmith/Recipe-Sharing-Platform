import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
    const { loginHandler } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (email === '' || password === '') {
            setError('Email and Password are required');
            setLoading(false);
            return;
        }

        try {
            const response = await loginHandler(email, password);

            if (response) {
                window.location.href = '/home';
                console.log('Login successful:', response);
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Login failed: ' + err.message);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div>loading..</div>
        );
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                Login
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    required
                    variant="outlined"
                />
                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Box>
        </Container>
    );
};

export default LoginForm;
