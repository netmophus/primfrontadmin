import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

const HeaderManagement = () => {
  const [formData, setFormData] = useState({
    redBannerText: '',
    phoneNumbers: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0); // 0 = Mise à jour, 1 = Création




  const [flashNewsList, setFlashNewsList] = useState([]); // Liste des flash news
const [flashFormData, setFlashFormData] = useState({
  text: '',
  startDate: '',
  endDate: '',
}); // Formulaire pour saisir un flash news



  useEffect(() => {
    if (tab === 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/inforedbanner', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
  
          setFormData({
            redBannerText: response.data.redBannerText || '',
            phoneNumbers: response.data.phoneNumbers?.join(', ') || '',
            address: response.data.address || '',
          });
  
          setFlashNewsList(response.data.newsFlash || []); // Charger les flash news
        } catch (err) {
          setError('Erreur lors du chargement des données.');
        }
      };
  
      fetchData();
    } else {
      setFormData({
        redBannerText: '',
        phoneNumbers: '',
        address: '',
      });
      setFlashFormData({ text: '', startDate: '', endDate: '' }); // Réinitialiser le formulaire de création
    }
  }, [tab]);
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      tab === 0
        ? 'http://localhost:5000/inforedbanner' // Mise à jour
        : 'http://localhost:5000/inforedbanner'; // Création
    const method = tab === 0 ? 'put' : 'post'; // Déterminer le type de requête

    try {
      const payload = {
        ...formData,
        phoneNumbers: formData.phoneNumbers.split(',').map((num) => num.trim()),
      };
      await axios[method](url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // En-tête avec token
        },
      });
      setMessage(tab === 0 ? 'Mise à jour réussie' : 'Création réussie');
      setError('');
    } catch (err) {
      setError('Erreur lors de la soumission');
      setMessage('');
    }
  };

  const handleAddFlashNews = async () => {
    if (!flashFormData.text.trim()) {
      setError('Veuillez entrer un texte pour le flash news.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/inforedbanner/news-flash',
        {
          text: flashFormData.text,
          startDate: flashFormData.startDate,
          endDate: flashFormData.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
  
      setFlashNewsList(response.data); // Met à jour la liste localement
      setFlashFormData({ text: '', startDate: '', endDate: '' }); // Réinitialise le formulaire
      setMessage('Flash news ajouté avec succès.');
      setError('');
    } catch (err) {
      setError('Erreur lors de l’ajout du flash news.');
    }
  };

  

  const handleDeleteFlashNews = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/inforedbanner/news-flash/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
  
      setFlashNewsList(flashNewsList.filter((news) => news._id !== id));
      setMessage('Flash news supprimé avec succès.');
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression du flash news.');
    }
  };

  




  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion du Header
      </Typography>

      {/* Tabs pour changer entre mise à jour et création */}
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Mise à jour" />
        <Tab label="Création" />
      </Tabs>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ marginTop: '20px' }}>
          <TextField
            label="Texte du RedBanner"
            value={formData.redBannerText}
            onChange={(e) =>
              setFormData({ ...formData, redBannerText: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Numéros de Téléphone (séparés par des virgules)"
            value={formData.phoneNumbers}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumbers: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Adresse"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {tab === 0 ? 'Mettre à jour' : 'Créer'}
          </Button>
        </Stack>
      </form>

      <Box mt={4}>
  <Typography variant="h6">Flash News</Typography>
  <Stack spacing={2}>
  {/* Vérification et affichage de la liste des flash news */}
  {Array.isArray(flashNewsList) && flashNewsList.length > 0 ? (
    flashNewsList.map((flash) => (
      <Box
        key={flash._id}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: '1px solid #ddd', paddingBottom: 1, marginBottom: 1 }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {flash.text}
          </Typography>
          {flash.startDate && (
            <Typography variant="body2" color="text.secondary">
              Début : {new Date(flash.startDate).toLocaleDateString()}
            </Typography>
          )}
          {flash.endDate && (
            <Typography variant="body2" color="text.secondary">
              Fin : {new Date(flash.endDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteFlashNews(flash._id)}
        >
          Supprimer
        </Button>
      </Box>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      Aucun flash news disponible.
    </Typography>
  )}

  {/* Formulaire pour ajouter un flash news */}
  <Box display="flex" flexDirection="column" gap={2} sx={{ marginTop: 2 }}>
    <TextField
      label="Texte du Flash News"
      name="text"
      value={flashFormData.text}
      onChange={(e) =>
        setFlashFormData({ ...flashFormData, text: e.target.value })
      }
      fullWidth
      required
    />
    <TextField
      label="Date de début"
      type="date"
      name="startDate"
      value={flashFormData.startDate}
      onChange={(e) =>
        setFlashFormData({ ...flashFormData, startDate: e.target.value })
      }
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
    <TextField
      label="Date de fin"
      type="date"
      name="endDate"
      value={flashFormData.endDate}
      onChange={(e) =>
        setFlashFormData({ ...flashFormData, endDate: e.target.value })
      }
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddFlashNews}
      sx={{ alignSelf: 'flex-end' }}
    >
      Ajouter le Flash News
    </Button>
  </Box>
</Stack>

</Box>

    </Box>
  );
};

export default HeaderManagement;
