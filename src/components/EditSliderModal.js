import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
const EditSliderModal = ({ open, handleClose, slider, handleUpdate }) => {
  const [slides, setSlides] = useState(slider ? slider.slides : []);

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

    handleUpdate(slider._id, formPayload);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, padding: 3, backgroundColor: '#fff', margin: '100px auto', borderRadius: '10px' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Mise à jour du Slider
        </Typography>
        <form onSubmit={handleSubmit}>
          {slides.map((slide, index) => (
            <Box key={index} sx={{ marginBottom: '20px' }}>
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
            Mettre à jour
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditSliderModal;
