import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Contrôle du modal
  const [isEditing, setIsEditing] = useState(false); // Indique si on édite ou ajoute
  const [selectedProject, setSelectedProject] = useState(null); // Projet sélectionné
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: null,
    details: '',
  });

  // Charger les projets depuis le backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/project`);
        setProjects(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error.message);
      }
    };

    fetchProjects();
  }, []);

  // Ouvrir le modal
  const handleOpenModal = (project = null) => {
    setIsEditing(!!project); // Si un projet est passé, on édite
    setSelectedProject(project);
    setNewProject(
      project || {
        title: '',
        description: '',
        image: null,
        details: '',
      }
    );
    setOpenModal(true);
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewProject({ title: '', description: '', image: null, details: '' });
  };

  // Ajouter un projet
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append('title', newProject.title);
  //     formData.append('description', newProject.description);
  //     if (newProject.image) {
  //       formData.append('image', newProject.image);
  //     }
  //     const details = {
  //       text: newProject.details,
  //       images: [],
  //       videos: [],
  //     };
  //     formData.append('details', JSON.stringify(details));

  //     const response = await axios.post(`${API_URL}/project`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     setProjects([...projects, response.data]); // Ajouter le projet à la liste
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout du projet :', error.message);
  //   }
  // };

  // // Modifier un projet
  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append('title', newProject.title);
  //     formData.append('description', newProject.description);
  //     if (newProject.image) {
  //       formData.append('image', newProject.image);
  //     }
  //     const details = {
  //       text: newProject.details,
  //       images: [],
  //       videos: [],
  //     };
  //     formData.append('details', JSON.stringify(details));

  //     const response = await axios.put(`${API_URL}/project/${selectedProject._id}`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     setProjects((prevProjects) =>
  //       prevProjects.map((project) =>
  //         project._id === selectedProject._id ? response.data : project
  //       )
  //     );
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error('Erreur lors de la modification du projet :', error.message);
  //   }
  // };

  // // Supprimer un projet
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

  //   try {
  //     await axios.delete(`${API_URL}/project/${id}`);
  //     setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
  //     console.log(`Projet avec l'ID ${id} supprimé avec succès.`);
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression du projet :', error.message);
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    if (newProject.image) {
      formData.append('image', newProject.image);
    }
    const details = {
      text: newProject.details,
      images: [],
      videos: [],
    };
    formData.append('details', JSON.stringify(details));

    const response = await axios.post(`${API_URL}/project`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setProjects((prevProjects) => [...prevProjects, response.data]); // Ajouter au state
    handleCloseModal();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du projet :', error.message);
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    if (newProject.image) {
      formData.append('image', newProject.image);
    }
    const details = {
      text: newProject.details,
      images: [],
      videos: [],
    };
    formData.append('details', JSON.stringify(details));

    const response = await axios.put(`${API_URL}/project/${selectedProject._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === selectedProject._id ? response.data : project
      )
    );
    handleCloseModal();
  } catch (error) {
    console.error('Erreur lors de la modification du projet :', error.message);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
  try {
    await axios.delete(`${API_URL}/project/${id}`);
    setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id)); // Supprimer du state
  } catch (error) {
    console.error('Erreur lors de la suppression du projet :', error.message);
  }
};


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestion des Projets
      </Typography>

      {/* Bouton Ajouter un Projet */}
      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Ajouter un Projet
        </Button>
      </Box>

      {/* Zone d'Affichage */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Détails</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <img
                    src={`${API_URL}${project.image}`}
                    alt={project.title}
                    style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                  />
                </TableCell>
                <TableCell>{project.details?.text || 'Aucun détail disponible'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(project)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(project._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal pour Ajouter ou Modifier */}
      <Modal open={openModal} onClose={handleCloseModal}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isEditing ? 'Modifier le Projet' : 'Ajouter un Nouveau Projet'}
          </Typography>
          <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
            <TextField
              label="Titre"
              fullWidth
              margin="dense"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
            />
            <TextField
              label="Détails"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              value={newProject.details}
              onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
              style={{ marginTop: '10px' }}
            />
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button variant="outlined" onClick={handleCloseModal} sx={{ mr: 2 }}>
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Modifier' : 'Ajouter'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectManagement;
