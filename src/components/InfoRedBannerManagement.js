import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import API from '../services/api'; // Assurez-vous d’avoir un fichier API configuré pour les appels backend

const InfoRedBannerManagement = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    redBannerText: '',
    phoneNumbers: '',
    address: '',
  });
  const [message, setMessage] = useState('');


  const [newsFlash, setNewsFlash] = useState([]);
  const [newFlashText, setNewFlashText] = useState('');
  



  // Récupérer les données existantes du backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await API.get('/inforedbanner'); // Appel à l'endpoint GET
  //       setFormData({
  //         redBannerText: res.data.redBannerText || '',
  //         phoneNumbers: res.data.phoneNumbers?.join(', ') || '', // Transformer en chaîne
  //         address: res.data.address || '',
  //       });
  //     } catch (error) {
  //       setMessage('Erreur lors du chargement des données.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/inforedbanner');
        setFormData({
          redBannerText: res.data.redBannerText || '',
          phoneNumbers: res.data.phoneNumbers?.join(', ') || '',
          address: res.data.address || '',
        });
        setNewsFlash(res.data.newsFlash || []); // Charger les flash news
      } catch (error) {
        setMessage('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  
  const handleAddFlashNews = async () => {
    if (!newFlashText.trim()) {
      setMessage('Veuillez entrer un texte pour le flash news.');
      return;
    }
  
    try {
      setLoading(true);
      const res = await API.post('/inforedbanner/news-flash', { text: newFlashText });
      setNewsFlash(res.data); // Met à jour la liste des flash news
      setNewFlashText(''); // Réinitialise le champ
      setMessage('Flash news ajoutée avec succès.');
    } catch (error) {
      setMessage('Erreur lors de l’ajout du flash news.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteFlashNews = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/inforedbanner/news-flash/${id}`);
      setNewsFlash(newsFlash.filter((flash) => flash._id !== id)); // Mise à jour locale
      setMessage('Flash news supprimée avec succès.');
    } catch (error) {
      setMessage('Erreur lors de la suppression du flash news.');
    } finally {
      setLoading(false);
    }
  };
  

  // Gérer la soumission du formulaire pour mettre à jour les données
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put('/inforedbanner', {
        redBannerText: formData.redBannerText,
        phoneNumbers: formData.phoneNumbers.split(',').map((num) => num.trim()), // Transformer en tableau
        address: formData.address,
      });
      setMessage('Mise à jour réussie.');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (

<Box p={3}>
  <Typography variant="h5" gutterBottom>
    Gestion de la Bannière Rouge et des Flash News
  </Typography>

  {/* Affichage des messages d'état */}
  {message && (
    <Typography
      color={message.includes('réussie') ? 'green' : 'red'}
      sx={{ mb: 2 }}
    >
      {message}
    </Typography>
  )}

  {/* Formulaire principal */}
  <form onSubmit={handleSubmit}>
    <Stack spacing={2}>
      {/* Texte principal de la bannière */}
      <TextField
        label="Texte de la bannière"
        name="redBannerText"
        value={formData.redBannerText}
        onChange={handleChange}
        fullWidth
      />

      {/* Numéros de téléphone */}
      <TextField
        label="Numéros de téléphone (séparés par des virgules)"
        name="phoneNumbers"
        value={formData.phoneNumbers}
        onChange={handleChange}
        fullWidth
      />

      {/* Adresse */}
      <TextField
        label="Adresse"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
      />

      <Typography variant="h6" gutterBottom>
        Ajouter un Flash News
      </Typography>

      {/* Champ pour ajouter un nouveau flash news */}
      <TextField
        label="Texte du Flash News"
        name="flashText"
        value={formData.flashText}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Date de début"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <TextField
        label="Date de fin"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddFlashNews}
      >
        Ajouter ce Flash News
      </Button>

      <Button type="submit" variant="contained" color="primary">
        Mettre à jour la Bannière
      </Button>
    </Stack>
  </form>

  {/* Affichage des Flash News */}
  <Box mt={4}>
    <Typography variant="h6">Flash News Actuels</Typography>
    <Stack spacing={2}>
      {newsFlash.map((flash) => (
        <Box
          key={flash._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="body1">{flash.text}</Typography>
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
      ))}
    </Stack>
  </Box>
</Box>




  );
};

export default InfoRedBannerManagement;
