// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ArticlesManagementPage = () => {
//   const { cardId } = useParams(); // ID de la carte depuis l'URL
//   const [articles, setArticles] = useState([]); // Liste des articles
//   const [currentArticle, setCurrentArticle] = useState({ title: '', content: '', videos: [], images: [] }); // Article en cours d'ajout/modification
//   const [isEdit, setIsEdit] = useState(false); // Indicateur pour savoir si on est en mode modification
//   const API_URL = 'http://localhost:5000';
//   const navigate = useNavigate();

//   // Récupérer les articles associés à une carte
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const response = await axios.get(`${API_URL}/infoofficielle/articles/${cardId}`, config);
//         setArticles(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des articles :', error);
//       }
//     };

//     fetchArticles();
//   }, [cardId]);

//   // Réinitialiser le formulaire
//   const resetForm = () => {
//     setCurrentArticle({ title: '', content: '', videos: [], images: [] });
//     setIsEdit(false);
//   };

//   // Ajouter un nouvel article
//   const handleAddArticle = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.post(
//         `${API_URL}/infoofficielle/articles`,
//         { cardId, ...currentArticle },
//         config
//       );
//       setArticles((prevArticles) => [...prevArticles, response.data]);
//       resetForm();
//     } catch (error) {
//       console.error('Erreur lors de l’ajout de l’article :', error);
//     }
//   };

//   // Mettre à jour un article existant
//   const handleUpdateArticle = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.put(
//         `${API_URL}/infoofficielle/articles/${currentArticle._id}`,
//         currentArticle,
//         config
//       );
//       setArticles((prevArticles) =>
//         prevArticles.map((article) =>
//           article._id === response.data._id ? response.data : article
//         )
//       );
//       resetForm();
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de l’article :', error);
//     }
//   };

//   // Supprimer un article
//   const handleDeleteArticle = async (articleId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.delete(`${API_URL}/infoofficielle/articles/${articleId}`, config);
//       setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
//     } catch (error) {
//       console.error('Erreur lors de la suppression de l’article :', error);
//     }
//   };

//   return (
//     <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
//       <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
//         Gestion des Articles pour la Carte
//       </Typography>

//       {/* Formulaire d'ajout/modification */}
//       <Box sx={{ marginBottom: '20px' }}>
//         <Typography variant="h6">{isEdit ? 'Modifier un Article' : 'Ajouter un Article'}</Typography>
//         <TextField
//           fullWidth
//           label="Titre"
//           value={currentArticle.title}
//           onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Contenu"
//           value={currentArticle.content}
//           onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
//           margin="normal"
//           multiline
//           rows={4}
//         />
//         <TextField
//           fullWidth
//           label="Vidéos (URLs, séparées par des virgules)"
//           value={currentArticle.videos.join(', ')}
//           onChange={(e) =>
//             setCurrentArticle({
//               ...currentArticle,
//               videos: e.target.value.split(',').map((url) => url.trim()),
//             })
//           }
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Images (URLs, séparées par des virgules)"
//           value={currentArticle.images.join(', ')}
//           onChange={(e) =>
//             setCurrentArticle({
//               ...currentArticle,
//               images: e.target.value.split(',').map((url) => url.trim()),
//             })
//           }
//           margin="normal"
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={isEdit ? handleUpdateArticle : handleAddArticle}
//           >
//             {isEdit ? 'Mettre à jour' : 'Ajouter'}
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={resetForm}>
//             Réinitialiser
//           </Button>
//         </Box>
//       </Box>

//       {/* Tableau des articles */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Titre</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {articles.map((article) => (
//               <TableRow key={article._id}>
//                 <TableCell>{article.title}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="info"
//                     onClick={() => {
//                       setCurrentArticle(article);
//                       setIsEdit(true);
//                     }}
//                     sx={{ marginRight: '10px' }}
//                   >
//                     Modifier
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteArticle(article._id)}
//                   >
//                     Supprimer
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Button variant="outlined" color="secondary" onClick={() => navigate(-1)} sx={{ marginTop: '20px' }}>
//         Retour
//       </Button>
//     </Box>
//   );
// };

// export default ArticlesManagementPage;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticlesManagementPage = () => {
  const { cardId } = useParams(); // ID de la carte depuis l'URL
  const [articles, setArticles] = useState([]); // Liste des articles
  const [currentArticle, setCurrentArticle] = useState({
    title: '',
    content: '',
    videos: [{ url: '', description: '' }],
    images: [{ url: '', description: '' }],
  });
  const [isEdit, setIsEdit] = useState(false); // Indicateur pour savoir si on est en mode modification
  const API_URL = 'http://localhost:5000';
  const navigate = useNavigate();
 
  // Récupérer les articles associés à une carte
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/infoofficielle/articles/${cardId}`, config);
        setArticles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    };

    fetchArticles();
  }, [cardId]);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCurrentArticle({
      title: '',
      content: '',
      videos: [{ url: '', description: '' }],
      images: [{ url: '', description: '' }],
    });
    setIsEdit(false);
  };

  // Ajouter un nouvel article
  
  // const handleAddArticle = async () => {
  //   try {
  //     console.log("Données envoyées :", { cardId, ...currentArticle }); // Log des données envoyées
  
  //     const token = localStorage.getItem("authToken");
  //     const config = { headers: { Authorization: `Bearer ${token}` } };
  //     const response = await axios.post(
  //       `${API_URL}/infoofficielle/articles`,
  //       { cardId, ...currentArticle },
  //       config
  //     );
  
  //     setArticles((prevArticles) => [...prevArticles, response.data]);
  //     resetForm();
  //   } catch (error) {
  //     console.error("Erreur lors de l’ajout de l’article :", error);
  //   }
  // };


  const handleAddArticle = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      console.log("Card ID transmis :", cardId); // Ajoutez ce log
  
      const response = await axios.post(
        `${API_URL}/infoofficielle/articles`,
        { cardId, ...currentArticle },
        config
      );
      setArticles((prevArticles) => [...prevArticles, response.data]);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l’ajout de l’article :", error);
    }
  };
  
  
  // Mettre à jour un article existant
  const handleUpdateArticle = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(
        `${API_URL}/infoofficielle/articles/${currentArticle._id}`,
        currentArticle,
        config
      );
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === response.data._id ? response.data : article
        )
      );
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’article :', error);
    }
  };

  // Supprimer un article
  const handleDeleteArticle = async (articleId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/infoofficielle/articles/${articleId}`, config);
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l’article :', error);
    }
  };

  // Ajouter une vidéo
  const addVideo = () => {
    setCurrentArticle((prev) => ({
      ...prev,
      videos: [...prev.videos, { url: '', description: '' }],
    }));
  };

  // Ajouter une image
  const addImage = () => {
    setCurrentArticle((prev) => ({
      ...prev,
      images: [...prev.images, { url: '', description: '' }],
    }));
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion des Articles pour la Carte
      </Typography>

      {/* Formulaire d'ajout/modification */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">{isEdit ? 'Modifier un Article' : 'Ajouter un Article'}</Typography>
        <TextField
          fullWidth
          label="Titre"
          value={currentArticle.title}
          onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contenu"
          value={currentArticle.content}
          onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
          margin="normal"
          multiline
          rows={4}
        />

        {/* Gestion des vidéos */}
        <Typography variant="h6" sx={{ marginTop: '20px' }}>Vidéos</Typography>
        {currentArticle.videos.map((video, index) => (
          <Box key={index} sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <TextField
              fullWidth
              label="URL de la vidéo"
              value={video.url}
              onChange={(e) => {
                const newVideos = [...currentArticle.videos];
                newVideos[index].url = e.target.value;
                setCurrentArticle({ ...currentArticle, videos: newVideos });
              }}
            />
            <TextField
              fullWidth
              label="Description"
              value={video.description}
              onChange={(e) => {
                const newVideos = [...currentArticle.videos];
                newVideos[index].description = e.target.value;
                setCurrentArticle({ ...currentArticle, videos: newVideos });
              }}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addVideo} sx={{ marginBottom: '10px' }}>
          Ajouter une Vidéo
        </Button>

        {/* Gestion des images */}
        <Typography variant="h6" sx={{ marginTop: '20px' }}>Images</Typography>
        {currentArticle.images.map((image, index) => (
          <Box key={index} sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <TextField
              fullWidth
              label="URL de l'image"
              value={image.url}
              onChange={(e) => {
                const newImages = [...currentArticle.images];
                newImages[index].url = e.target.value;
                setCurrentArticle({ ...currentArticle, images: newImages });
              }}
            />
            <TextField
              fullWidth
              label="Description"
              value={image.description}
              onChange={(e) => {
                const newImages = [...currentArticle.images];
                newImages[index].description = e.target.value;
                setCurrentArticle({ ...currentArticle, images: newImages });
              }}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addImage}>
          Ajouter une Image
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={isEdit ? handleUpdateArticle : handleAddArticle}
          >
            {isEdit ? 'Mettre à jour' : 'Ajouter'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={resetForm}>
            Réinitialiser
          </Button>
        </Box>
      </Box>

      {/* Tableau des articles */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setCurrentArticle(article);
                      setIsEdit(true);
                    }}
                    sx={{ marginRight: '10px' }}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteArticle(article._id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="outlined" color="secondary" onClick={() => navigate(-1)} sx={{ marginTop: '20px' }}>
        Retour
      </Button>
    </Box>
  );
};

export default ArticlesManagementPage;
