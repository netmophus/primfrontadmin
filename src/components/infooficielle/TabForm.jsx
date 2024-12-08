import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TabForm = ({ isEdit = false }) => {
  const [tabData, setTabData] = useState({
    name: '',
    description: '',
    order: '',
  });

  const { tabId } = useParams();
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000'; // Utilisez le port du backend
  const token = localStorage.getItem('authToken'); // Récupère le token stocké
  
  
  
  useEffect(() => {
    if (isEdit && tabId) {
      const fetchTabData = async () => {
        try {
          const response = await axios.post(`${API_URL}/infoofficielle/onglets`, tabData);
  
          setTabData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données de l’onglet :', error);
        }
      };
      fetchTabData();
    }
  }, [isEdit, tabId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTabData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


 
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Formulaire soumis:', tabData);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
      },
    };

    if (isEdit) {
      console.log('Envoi de la requête PUT pour modifier un onglet:', tabId);
      const response = await axios.put(`${API_URL}/infoofficielle/onglets/${tabId}`, tabData, config);
      console.log('Réponse PUT:', response.data);
      alert('Onglet mis à jour avec succès !');
    } else {
      console.log('Envoi de la requête POST pour créer un onglet');
      const response = await axios.post(`${API_URL}/infoofficielle/onglets`, tabData, config);
      console.log('Réponse POST:', response.data);
      alert('Onglet créé avec succès !');
    }
    navigate('/content-management/info-officielle');
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
};


 
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" sx={{ color: '#004080', marginBottom: '20px', textAlign: 'center' }}>
        {isEdit ? 'Modifier Onglet' : 'Créer un Onglet'}
      </Typography>

      <TextField
        fullWidth
        label="Nom de l'Onglet"
        name="name"
        value={tabData.name}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={tabData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
      />

      <TextField
        fullWidth
        label="Ordre"
        name="order"
        value={tabData.order}
        onChange={handleChange}
        margin="normal"
        required
        type="number"
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
      >
        {isEdit ? 'Mettre à jour' : 'Créer'}
      </Button>
    </Box>
  );
};

export default TabForm;
