

import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ContentManagement = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion de Contenu
      </Typography>
      <Grid container spacing={4}>
        {/* Bouton pour Header */}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate('/content-management/header')}
          >
            Header (Bandeau & Infos)
          </Button>
        </Grid>
         {/* Bouton pour Menu */}
         <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="info"
            onClick={() => navigate('/content-management/menu')}
          >
            Menu
          </Button>
        </Grid>

         {/* Bouton pour Slider */}
         <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="info"
            onClick={() => navigate('/content-management/sliders')}
          >
            Slider
          </Button>
        </Grid>
{/* Bouton pour informations officielle */}
        <Grid item xs={12} sm={6} md={4}>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={() => navigate('/content-management/info-officielle')}
        >
          Info Officielle (Onglets & Contenus)
        </Button>
      </Grid>


      <Grid item xs={12} sm={6} md={4}>
      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={() => navigate('/content-management/media-management')}
      >
        Gestion des Médias
      </Button>
    </Grid>


    <Grid item xs={12} sm={6} md={4}>
  <Button
    fullWidth
    variant="contained"
    color="warning"
    onClick={() => navigate('/content-management/project-management')}
  >
    Gestion des Projets
  </Button>
</Grid>



 {/* Nouveau bouton pour Créer un Ministre */}
 <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="success" // Choisissez une couleur adaptée
            onClick={() => navigate('/content-management/create-minister')}
          >
            Créer un Ministre
          </Button>
        </Grid>


        {/* Ajoutez d'autres sections ici */}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate('/content-management/footer')}
          >
            Footer
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => navigate('/content-management/articles')}
          >
            Articles
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentManagement;
