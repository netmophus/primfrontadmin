import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TextField, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTabs } from '../../context/TabsContext'; // Assurez-vous que le chemin est correct

const TabsManagementPage = () => {
 // const [tabs, setTabs] = useState([]);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(null); // Onglet actuellement sélectionné pour modification
  const API_URL = 'http://localhost:5000'; // L'adresse du backend
  const { tabs, setTabs } = useTabs();


 // Suppression d'un onglet
//  const handleDeleteTab = async (tabId) => {
//   try {
//     const token = localStorage.getItem('authToken');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     await axios.delete(`http://localhost:5000/infoofficielle/onglets/${tabId}`, config);
//     setTabs((prevTabs) => prevTabs.filter((tab) => tab._id !== tabId)); // Mise à jour locale
//   } catch (error) {
//     console.error('Erreur lors de la suppression de l’onglet :', error);
//   }
// };

// Charger les onglets depuis l'API
useEffect(() => {
  const fetchTabs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:5000/infoofficielle/onglets', config);
      setTabs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des onglets :', error);
    }
  };

  fetchTabs();
}, [setTabs]);



  // Ajouter un nouvel onglet localement


const handleAddTab = () => {
  navigate('/content-management/info-officielle/new-tab'); // Redirige simplement vers la page de création
};


const openEditModal = (tab) => {
  setCurrentTab(tab); // Charge les données dans currentTab
  setEditModalOpen(true); // Ouvre le modal
};


const closeEditModal = () => {
  setEditModalOpen(false);
  setCurrentTab(null);
};


const handleDeleteTab = async (tabId) => {
  try {
    const token = localStorage.getItem('authToken'); // Récupère le token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Inclut le token dans l'en-tête
      },
    };

    // Requête pour supprimer l'onglet
    await axios.delete(`http://localhost:5000/infoofficielle/onglets/${tabId}`, config);

    // Mise à jour locale de la liste
    setTabs((prevTabs) => prevTabs.filter((tab) => tab._id !== tabId));
  } catch (error) {
    console.error('Erreur lors de la suppression de l’onglet :', error);
    alert('Une erreur est survenue lors de la suppression.');
  }
};



  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion des Onglets (Info Officielle)
      </Typography>

      {/* Bouton pour ajouter un nouvel onglet */}
      <Button variant="contained" color="primary" onClick={handleAddTab} sx={{ marginBottom: '20px' }}>
        Ajouter un Onglet
      </Button>

     
  <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Ordre</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabs.map((tab) => (
              <TableRow key={tab._id}>
                <TableCell>{tab.name}</TableCell>
                <TableCell>{tab.description}</TableCell>
                <TableCell>{tab.order}</TableCell>
                <TableCell>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => openEditModal(tab)} // Appel de la fonction avec l'onglet sélectionné
                  sx={{ marginRight: '10px' }}
                >
                  Modifier
                </Button>

                  <Button variant="outlined" color="error" onClick={() => handleDeleteTab(tab._id)}>
                    Supprimer
                  </Button>
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/content-management/info-officielle/tab-content/${tab._id}`)}
                >
                  Gérer le contenu
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
  open={editModalOpen}
  onClose={closeEditModal}
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
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
      Modifier l’Onglet
    </Typography>

    {/* Champs de formulaire */}
    <TextField
      fullWidth
      label="Nom"
      value={currentTab?.name || ''}
      onChange={(e) => setCurrentTab({ ...currentTab, name: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Description"
      value={currentTab?.description || ''}
      onChange={(e) => setCurrentTab({ ...currentTab, description: e.target.value })}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Ordre"
      type="number"
      value={currentTab?.order || ''}
      onChange={(e) => setCurrentTab({ ...currentTab, order: e.target.value })}
      margin="normal"
    />

    {/* Boutons */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      {/* Bouton pour mettre à jour */}
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          try {
            const token = localStorage.getItem('authToken');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            console.log('ID utilisé pour la mise à jour :', currentTab._id);

            // Requête PUT pour mettre à jour l’onglet
            const response = await axios.put(`${API_URL}/infoofficielle/onglets/${currentTab._id}`, currentTab, config);
         
            // Met à jour la liste locale des onglets
            setTabs((prevTabs) =>
              prevTabs.map((tab) =>
                tab._id === response.data._id ? response.data : tab
              )
            );

            alert('Onglet mis à jour avec succès !');
            closeEditModal(); // Ferme le modal
          } catch (error) {
            console.error('Erreur lors de la mise à jour de l’onglet :', error);
            alert('Une erreur est survenue lors de la mise à jour.');
          }
        }}
      >
        Mettre à jour
      </Button>

      {/* Bouton pour fermer le modal */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={closeEditModal}
      >
        Fermer
      </Button>
    </Box>
  </Box>
</Modal>


    </Box>
  );
};



export default TabsManagementPage;



