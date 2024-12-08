// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';

// const AdminDashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Supprime le token
//     window.location.reload(); // Rafraîchit la page pour revenir à /login
//   };

//   return (
//     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       {/* Bandeau */}
//       <Box
//         sx={{
//           backgroundColor: '#004080',
//           color: '#fff',
//           padding: '10px 20px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Typography variant="h5">Bienvenue sur le Tableau de Bord</Typography>
//         {/* Bouton de déconnexion */}
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleLogout}
//         >
//           Déconnexion
//         </Button>
//       </Box>

//       {/* Contenu principal */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#f9f9f9',
//         }}
//       >
//         <Typography variant="h6">
//           Gérez vos ressources ici. Utilisez le menu pour naviguer.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Supprime le token
    window.location.reload(); // Rafraîchit la page pour revenir à /login
  };

  const handleNavigation = (path) => {
    navigate(path); // Redirige vers la route spécifiée
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Bandeau */}
      <Box
        sx={{
          backgroundColor: '#004080',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Bienvenue sur le Tableau de Bord</Typography>
        {/* Bouton de déconnexion */}
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Déconnexion
        </Button>
      </Box>

      {/* Contenu principal */}
      <Box
        sx={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Grid container spacing={4}>
          {/* Carte pour la gestion des utilisateurs */}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleNavigation('/user-management')}
            >
              Gestion des Utilisateurs
            </Button>
          </Grid>

          {/* Carte pour la gestion de contenu */}
          <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleNavigation('/content-management')}
          >
            Gestion de Contenu
          </Button>
        </Grid>


          {/* Carte pour les paramètres */}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleNavigation('/settings')}
            >
              Paramètres
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
