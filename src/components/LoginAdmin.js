import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData); // Endpoint de connexion
      localStorage.setItem('authToken', response.data.token); // Stocke le token JWT
      setMessage('Connexion réussie');
      navigate('/admin-dashboard'); // Redirige vers le tableau de bord admin
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Connexion Administrateur
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <TextField
          type="password"
          label="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Se connecter
        </Button>
      </Box>
      {message && (
        <Typography
          sx={{ color: message.includes('réussie') ? 'green' : 'red', mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginAdmin;
