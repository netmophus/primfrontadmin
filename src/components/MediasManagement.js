import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {Card, CardMedia} from '@mui/material';


const MediasManagement = () => {
  const [categories, setCategories] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [mediaForm, setMediaForm] = useState({ name: '', url: '', type: 'image', categoryId: '' });
  const API_URL = 'http://localhost:5000'; // Assurez-vous que cette URL correspond à l'URL de votre backend

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories..."); // Log avant la requête
      const response = await axios.get(`${API_URL}/categories`);
      console.log("Catégories récupérées :", response.data); // Log pour afficher la réponse
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error); // Log pour afficher l'erreur
    }
  };
  



  const handleUpdateCategory = async () => {
    try {
      console.log('Mise à jour de la catégorie :', categoryForm);
  
      if (!categoryForm._id) {
        console.error('Aucun ID trouvé pour la catégorie à mettre à jour.');
        return;
      }
  
      // Mise à jour de la catégorie
      await axios.put(`${API_URL}/categories/${categoryForm._id}`, categoryForm);
      console.log('Catégorie mise à jour avec succès.');
  
      fetchCategories(); // Recharge la liste des catégories
      closeCategoryModal(); // Ferme la modale
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
    }
  };


  
  const handleMediaSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', mediaForm.name);
      formData.append('type', mediaForm.type);
      formData.append('categoryId', mediaForm.categoryId);
  
      if (mediaForm.file) {
        formData.append('file', mediaForm.file); // Ajoutez le fichier pour les images
      } else if (mediaForm.url) {
        formData.append('url', mediaForm.url); // Ajoutez l'URL pour les vidéos
      }
  
      // Effectuer la requête pour créer ou modifier le média
      let response;
      if (mediaForm._id) {
        response = await axios.put(`${API_URL}/media/${mediaForm._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post(`${API_URL}/media`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      // Mise à jour dynamique de la liste des médias
      if (!mediaForm._id) {
        setMediaList((prevList) => [...prevList, response.data]);
      } else {
        setMediaList((prevList) =>
          prevList.map((media) =>
            media._id === response.data._id ? response.data : media
          )
        );
      }
  
      // Réinitialiser et fermer le modal
      closeMediaModal();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du média :', error);
    }
  };
  
  
  const handleCategorySubmit = async () => {
    try {
      console.log('Création d\'une nouvelle catégorie :', categoryForm);
  
      // Création d'une nouvelle catégorie
      await axios.post(`${API_URL}/categories`, categoryForm);
      console.log('Catégorie créée avec succès.');
  
      fetchCategories(); // Recharge la liste des catégories
      closeCategoryModal(); // Ferme la modale
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
    }
  };
  
  const openCategoryModal = (category = null) => {
    if (category) {
      console.log('Ouverture de la modale pour modification :', category);
    } else {
      console.log('Ouverture de la modale pour création.');
    }
  
    setCategoryForm(category || { name: '', type: '' });
    setIsCategoryModalOpen(true);
  };
  
  

  const handleCategoryDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };



  const closeCategoryModal = () => {
    setCategoryForm({ name: '' });
    setIsCategoryModalOpen(false);
  };

  
  const handleMediaDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/media/${id}`);
      fetchMediaByCategory(mediaForm.categoryId);
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const openMediaModal = (media = null, categoryId = '', categoryType = '') => {
    setMediaForm(
      media || { name: '', url: '', type: categoryType, categoryId }
    );
    setIsMediaModalOpen(true);
  };
  

  const closeMediaModal = () => {
    setMediaForm({ name: '', url: '', type: 'image', categoryId: '' });
    setIsMediaModalOpen(false);
  };

 const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  fetchMediaByCategory(category._id);
  openMediaModal(null, category._id, category.type);
};

  

  const fetchMediaByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/media/${categoryId}`);
      setMediaList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des médias :', error);
    }
  };
  
  
  






  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Médias
      </Typography>

      {/* Category Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Catégories</Typography>
        <Button variant="contained" color="primary" onClick={() => openCategoryModal()}>
  Ajouter une catégorie
</Button>


        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Type</TableCell> {/* Nouvelle colonne pour le type */}
                <TableCell>Actions</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.type}</TableCell> {/* Affichage du type */}
                  <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => openCategoryModal(category)}
                    sx={{ mr: 1 }}
                  >
                    Modifier
                  </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCategoryDelete(category._id)}
                      sx={{ mr: 1 }}
                    >
                      Supprimer
                    </Button>

                    <Button
  variant="outlined"
  color="secondary"
  onClick={() => {
    setSelectedCategory(category);
    fetchMediaByCategory(category._id);
    openMediaModal(null, category._id, category.type);
  }}
>
  Ajouter Média
                    </Button>

                    
 





                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={isCategoryModalOpen} onClose={closeCategoryModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    }}
  >
    <IconButton
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={closeCategoryModal}
    >
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" gutterBottom>
      {categoryForm._id ? 'Modifier une Catégorie' : 'Ajouter une Catégorie'}
    </Typography>
    {/* Champ pour le nom de la catégorie */}
    <TextField
      fullWidth
      label="Nom de la catégorie"
      value={categoryForm.name}
      onChange={(e) =>
        setCategoryForm({ ...categoryForm, name: e.target.value })
      }
      sx={{ mb: 2 }}
    />
    {/* Champ pour sélectionner le type */}
    <TextField
      select
      fullWidth
      label="Type"
      value={categoryForm.type || ''}
      onChange={(e) =>
        setCategoryForm({ ...categoryForm, type: e.target.value })
      }
      sx={{ mb: 2 }}
      SelectProps={{
        native: true,
      }}
    >
      <option value="" disabled>
        Sélectionnez le type
      </option>
      <option value="image">Image</option>
      <option value="video">Vidéo</option>
    </TextField>
    {/* Bouton Enregistrer */}
       <Button
        variant="contained"
        color="primary"
        onClick={categoryForm._id ? handleUpdateCategory : handleCategorySubmit}
      >
        {categoryForm._id ? 'Mettre à jour' : 'Créer'}
      </Button>

  </Box>
</Modal>



   {/* Media Modal */}
<Modal open={isMediaModalOpen} onClose={closeMediaModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    }}
  >
    <IconButton
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={closeMediaModal}
    >
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" gutterBottom>
      {mediaForm._id ? 'Modifier un Média' : 'Ajouter un Média'}
    </Typography>
    <TextField
      fullWidth
      label="Nom"
      value={mediaForm.name}
      onChange={(e) => setMediaForm({ ...mediaForm, name: e.target.value })}
      sx={{ mb: 2 }}
    />

    {mediaForm.type === 'image' && (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Image</Typography>
        <TextField
          fullWidth
          label="URL de l'image (optionnel)"
          value={mediaForm.url || ''}
          onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setMediaForm({ ...mediaForm, file: e.target.files[0] })
          }
        />
      </Box>
    )}

    {mediaForm.type === 'video' && (
      <TextField
        fullWidth
        label="URL de la vidéo"
        value={mediaForm.url || ''}
        onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
        sx={{ mb: 2 }}
      />
    )}

    <TextField
      fullWidth
      select
      label="Type"
      value={mediaForm.type}
      onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value })}
      SelectProps={{
        native: true,
      }}
      sx={{ mb: 2 }}
    >
      <option value="image">Image</option>
      <option value="video">Vidéo</option>
    </TextField>

    <Button
  variant="contained"
  color="primary"
  onClick={handleMediaSubmit}
  disabled={!mediaForm.name || (mediaForm.type === 'image' && !mediaForm.file && !mediaForm.url) || (mediaForm.type === 'video' && !mediaForm.url)}
>
  Enregistrer
</Button>

  </Box>
</Modal>







{/* Liste des médias */}
<Box sx={{ mt: 4 }}>
  <Typography variant="h5" gutterBottom>
    Médias de la catégorie sélectionnée
  </Typography>
  {mediaList.length > 0 ? (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {mediaList.map((media) => (
        <Card key={media._id} sx={{ maxWidth: 200 }}>
          {media.type === 'image' ? (
            <CardMedia
              component="img"
              image={`http://localhost:5000${media.url}`}
              alt={media.name}
              sx={{ height: 140 }}
            />
          ) : (
            <Box sx={{ position: 'relative', height: 140 }}>
              <video
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src={`http://localhost:5000${media.url}`} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture des vidéos.
              </video>
            </Box>
          )}
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 1 }}
            gutterBottom
          >
            {media.name}
          </Typography>
        </Card>
      ))}
    </Box>
  ) : (
    <Typography>Aucun média disponible pour cette catégorie.</Typography>
  )}
</Box>


    </Box>
  );
};

export default MediasManagement;
