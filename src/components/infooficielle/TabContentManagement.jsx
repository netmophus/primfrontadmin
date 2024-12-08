import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabContentManagement = () => {
  const { tabId } = useParams(); // Récupère l'ID de l'onglet depuis l'URL
  const [cards, setCards] = useState([]); // État pour stocker les cartes
  const [modalOpen, setModalOpen] = useState(false); // État pour le modal
  const [currentCard, setCurrentCard] = useState(null); // Carte sélectionnée pour modification ou ajout
  const API_URL = 'http://localhost:5000'; // URL de base de l'API
  const navigate = useNavigate();

 
  // Récupérer les cartes associées à un onglet
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/infoofficielle/cards/${tabId}`, config);
        setCards(response.data); // Met à jour les cartes récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error);
      }
    };

    fetchCards();
  }, [tabId]);

  // Ouvrir le modal pour ajouter ou modifier une carte
  const openModal = (card = null) => {
    setCurrentCard(card);
    setModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setCurrentCard(null);
    setModalOpen(false);
  };

  // Ajouter ou modifier une carte
 
  // Supprimer une carte
  const handleDelete = async (cardId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/infoofficielle/cards/${cardId}`, config);
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId)); // Mise à jour après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte :', error);
    }
  };



  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const formData = new FormData();
      formData.append('tabId', tabId);
      formData.append('description', currentCard.description);
      if (currentCard.image instanceof File) {
        formData.append('image', currentCard.image);
      }
  
      const response = await axios.post(`${API_URL}/infoofficielle/cards`, formData, config);
      setCards((prevCards) => [...prevCards, response.data]);
  
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la création de la carte :', error);
    }
  };
  
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const formData = new FormData();
      formData.append('description', currentCard.description);
      if (currentCard.image instanceof File) {
        formData.append('image', currentCard.image);
      }
  
      const response = await axios.put(
        `${API_URL}/infoofficielle/cards/${currentCard._id}`,
        formData,
        config
      );
  
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === response.data._id ? response.data : card
        )
      );
  
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte :', error);
    }
  };
  



 

  


  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion des Cartes pour l’Onglet
      </Typography>

      {/* Bouton pour ouvrir le modal d'ajout */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => openModal()}
        sx={{ marginBottom: '20px' }}
      >
        Ajouter une Carte
      </Button>

      {/* Tableau des cartes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card._id}>
                <TableCell>
                  <img
                    src={card.image}
                    alt="Carte"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{card.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => openModal(card)}
                    sx={{ marginRight: '10px' }}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(card._id)}
                  >
                    Supprimer
                  </Button>
                  <Button
  variant="outlined"
  color="secondary"
  onClick={() => navigate(`/content-management/info-officielle/articles/${card._id}`)} // Utilisez card._id
  sx={{ marginRight: '10px' }}
>
  Ajouter un article
</Button>



                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal pour ajouter ou modifier une carte */}
      <Modal
  open={modalOpen}
  onClose={closeModal}
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  <Box
    sx={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
    }}
  >
    <Typography variant="h6" sx={{ marginBottom: '20px', textAlign: 'center' }}>
      {currentCard?._id ? 'Modifier la Carte' : 'Ajouter une Carte'}
    </Typography>

    {/* Aperçu de l'image existante */}
    {currentCard?.image && (
      <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
        <Typography variant="subtitle1">Image actuelle :</Typography>
        <img
          src={currentCard.image}
          alt="Carte actuelle"
          style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
      </Box>
    )}

    {/* Champ pour uploader une nouvelle image */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setCurrentCard({ ...currentCard, image: e.target.files[0] })
      }
      style={{ marginBottom: '20px' }}
    />

    {/* Champ pour la description */}
    <TextField
      fullWidth
      label="Description"
      value={currentCard?.description || ''}
      onChange={(e) =>
        setCurrentCard({ ...currentCard, description: e.target.value })
      }
      margin="normal"
      multiline
      rows={4}
    />

    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <Button variant="contained" color="primary" onClick={currentCard?._id ? handleUpdate : handleCreate}>
        {currentCard?._id ? 'Mettre à jour' : 'Ajouter'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={closeModal}>
        Annuler
      </Button>
    </Box>
  </Box>
</Modal>




    </Box>
  );
};

export default TabContentManagement;
