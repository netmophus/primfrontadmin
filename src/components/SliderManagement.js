import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Modal,
} from '@mui/material';
import axios from 'axios';


const SliderManagement = () => {
  const [slides, setSlides] = useState([
    { type: 'image', src: null, text: '' }, // Slide 1
    { type: 'image', src: null, text: '' }, // Slide 2
  ]);

  const [sliders, setSliders] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');




 
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const handleFileChange = (index, file) => {
    const updatedSlides = [...slides];
    updatedSlides[index].src = file;
    setSlides(updatedSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = new FormData();
    slides.forEach((slide, index) => {
      formPayload.append(`type${index}`, slide.type);
      formPayload.append(`text${index}`, slide.text || '');
      if (slide.type === 'image') {
        formPayload.append(`image${index}`, slide.src);
      } else {
        formPayload.append(`src${index}`, slide.src);
      }
    });
  
    try {
      const response = await axios.post('http://localhost:5000/sliders', formPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Ajoutez le token ici
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Réponse du backend :', response.data);
    } catch (err) {
      console.error('Erreur lors de la création du slider :', err.message);
    }
  };
  
  useEffect(() => {
  const fetchSliders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sliders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setSliders(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des sliders :', err.message);
      setError('Erreur lors du chargement des sliders.');
    }
  };
  fetchSliders();
}, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/sliders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    setSliders(sliders.filter((slider) => slider._id !== id));
    setMessage('Slider supprimé avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression du slider :', err.message);
    setError('Erreur lors de la suppression du slider.');
  }
};




// Charger les sliders
useEffect(() => {
  const fetchSliders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sliders/front');
      setSliders(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des sliders :', err.message);
      setError('Impossible de charger les sliders.');
    }
  };
  fetchSliders();
}, []);

// Ouvrir le modal pour éditer un slider
const handleOpenModal = (slider) => {
  setSelectedSlider(slider);
  setIsModalOpen(true);
};

// Fermer le modal
const handleCloseModal = () => {
  setSelectedSlider(null);
  setIsModalOpen(false);
};



const handleUpdate = async (formPayload, id) => {
  console.log('Payload envoyé :', [...formPayload.entries()]); // Log des données envoyées
  try {
    const response = await axios.put(`http://localhost:5000/sliders/${id}`, formPayload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    setSliders((prev) =>
      prev.map((slider) =>
        slider._id === id ? response.data.data : slider
      )
    );
    setMessage('Slider mis à jour avec succès.');
    handleCloseModal();
  } catch (err) {
    console.error('Erreur lors de la mise à jour du slider:', err.message);
    setError('Erreur lors de la mise à jour du slider.');
  }
};

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion des Sliders
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ marginBottom: '20px' }}>
          {slides.map((slide, index) => (
            <Box key={index} sx={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <Typography variant="h6">Slide {index + 1}</Typography>
              <TextField
                label="Texte / Description"
                value={slide.text}
                onChange={(e) => handleSlideChange(index, 'text', e.target.value)}
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              <TextField
                select
                label="Type"
                value={slide.type}
                onChange={(e) => handleSlideChange(index, 'type', e.target.value)}
                fullWidth
                SelectProps={{ native: true }}
                sx={{ marginBottom: '10px' }}
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </TextField>
              {slide.type === 'image' ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  required
                />
              ) : (
                <TextField
                  label="URL de la Vidéo"
                  value={slide.src || ''}
                  onChange={(e) => handleSlideChange(index, 'src', e.target.value)}
                  fullWidth
                  required
                />
              )}
            </Box>
          ))}

          <Button type="submit" variant="contained" color="primary">
            Ajouter Slider
          </Button>
        </Stack>
      </form>


      <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', height: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#004080', marginBottom: '20px' }}>
        Gestion des Sliders
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Zone d'affichage */}
      <Typography variant="h5" sx={{ marginTop: '20px', color: '#004080' }}>
        Liste des Sliders
      </Typography>
      <Stack spacing={3}>
        {sliders.map((slider) => (
          <Box
            key={slider._id}
            sx={{
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#fff',
            }}
          >
            <Stack direction="row" spacing={2}>
              {slider.slides.map((row, index) =>
                row.map((slide, slideIndex) => (
                  <Box
                    key={slideIndex}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '10px',
                    }}
                  >
                    {slide.type === 'image' ? (
                      <img
                        src={`http://localhost:5000/${slide.src}`}
                        alt={slide.text}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="body1">Vidéo : {slide.text}</Typography>
                    )}
                    <Typography>{slide.text}</Typography>
                  </Box>
                ))
              )}
            </Stack>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenModal(slider)}
            >
              Mise à jour
            </Button>

              {/* Bouton pour supprimer le slider */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(slider._id)}
          >
            Supprimer
          </Button>
          </Box>
        ))}
      </Stack>

   {/* Modal */}
{selectedSlider && (
  <Modal open={isModalOpen} onClose={handleCloseModal}>
    <Box
      sx={{
        width: 400,
        padding: 3,
        backgroundColor: '#fff',
        margin: '100px auto',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Mise à jour du Slider
      </Typography>
     
<form
  onSubmit={(e) => {
    e.preventDefault();
    const formPayload = new FormData();
    selectedSlider.slides.flat().forEach((slide, index) => {
      formPayload.append(`type${index}`, slide.type);
      formPayload.append(`text${index}`, slide.text || '');
      if (slide.type === 'image' && typeof slide.src !== 'string') {
        formPayload.append(`image${index}`, slide.src); // Ajoute le fichier image si modifié
      } else {
        formPayload.append(`src${index}`, slide.src); // Ajoute le chemin si inchangé
      }
    });
    handleUpdate(formPayload, selectedSlider._id);
  }}
>





        {selectedSlider.slides.flat().map((slide, index) => (
          <Box key={index} sx={{ marginBottom: '20px' }}>
            {/* Afficher l'image ou l'URL */}
            {slide.type === 'image' ? (
              <Box>
                <img
                  src={
                    typeof slide.src === 'string'
                      ? `http://localhost:5000/${slide.src}`
                      : URL.createObjectURL(slide.src)
                  }
                  alt={slide.text}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const updatedSlides = [...selectedSlider.slides];
                    updatedSlides.flat()[index].src = e.target.files[0];
                    setSelectedSlider({ ...selectedSlider, slides: updatedSlides });
                  }}
                />
              </Box>
            ) : (
              <TextField
                label="URL de la vidéo"
                value={slide.src}
                onChange={(e) => {
                  const updatedSlides = [...selectedSlider.slides];
                  updatedSlides.flat()[index].src = e.target.value;
                  setSelectedSlider({ ...selectedSlider, slides: updatedSlides });
                }}
                fullWidth
              />
            )}

            {/* Modifier la description */}
            <TextField
              label="Texte / Description"
              value={slide.text}
              onChange={(e) => {
                const updatedSlides = [...selectedSlider.slides];
                updatedSlides.flat()[index].text = e.target.value;
                setSelectedSlider({ ...selectedSlider, slides: updatedSlides });
              }}
              fullWidth
              sx={{ marginTop: '10px' }}
            />
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Mettre à jour
        </Button>
      </form>






    </Box>
  </Modal>
)}

    </Box>



    </Box>
  );
};

export default SliderManagement;
