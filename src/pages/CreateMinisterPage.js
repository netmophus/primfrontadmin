import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateMinisterPage = () => {
  const [ministerData, setMinisterData] = useState({
    name: '',
    portfolio: '',
    image: null,
    facebook: '',
    twitter: '',
    linkedin: '',
    website: ''
  });

  const [ministers, setMinisters] = useState([]);  // Liste des ministres
  const [error, setError] = useState('');

  // Gérer la modification de l'état du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinisterData({
      ...ministerData,
      [name]: value
    });
  };

  // Gérer l'upload d'image
  const handleImageChange = (e) => {
    setMinisterData({
      ...ministerData,
      image: e.target.files[0]
    });
  };

  // Soumettre le formulaire pour créer un ministre
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in ministerData) {
      formData.append(key, ministerData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/ministre/api/ministers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMinisters([...ministers, response.data]);  // Ajouter le ministre créé à la liste
      setMinisterData({
        name: '',
        portfolio: '',
        image: null,
        facebook: '',
        twitter: '',
        linkedin: '',
        website: ''
      });
      setError('');
    } catch (error) {
      setError('Une erreur est survenue lors de la création du ministre');
    }
  };

  // Supprimer un ministre
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ministre/api/ministers/${id}`);
      setMinisters(ministers.filter(minister => minister._id !== id));  // Retirer le ministre de la liste
    } catch (error) {
      setError('Une erreur est survenue lors de la suppression du ministre');
    }
  };

  // Modifier un ministre
  const handleEdit = (minister) => {
    setMinisterData({
      name: minister.name,
      portfolio: minister.portfolio,
      image: null,  // Optionnellement, gérer l'image
      facebook: minister.facebook,
      twitter: minister.twitter,
      linkedin: minister.linkedin,
      website: minister.website
    });
    setMinisters(ministers.filter(m => m._id !== minister._id));  // Retirer temporairement le ministre de la liste
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Formulaire de création */}
      <Typography variant="h4" gutterBottom>Créer un Ministre</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          name="name"
          value={ministerData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Portefeuille Ministériel"
          name="portfolio"
          value={ministerData.portfolio}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Facebook"
          name="facebook"
          value={ministerData.facebook}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Twitter"
          name="twitter"
          value={ministerData.twitter}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="LinkedIn"
          name="linkedin"
          value={ministerData.linkedin}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Site Web"
          name="website"
          value={ministerData.website}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: 3 }}>
          Ajouter Ministre
        </Button>
      </form>

      {/* Affichage des ministres créés */}
      <Typography variant="h5" gutterBottom>Liste des Ministres</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {ministers.map((minister) => (
          <Grid item xs={12} sm={6} md={4} key={minister._id}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h6">{minister.name}</Typography>
                <Typography variant="body2">{minister.portfolio}</Typography>
                {minister.image && <img src={`http://localhost:5000/${minister.image}`} alt={minister.name} width="100%" />}
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                <IconButton onClick={() => handleEdit(minister)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(minister._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreateMinisterPage;
