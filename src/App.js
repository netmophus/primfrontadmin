// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginAdmin from './components/LoginAdmin';
// import RegisterAdmin from './components/RegisterAdmin';
// import AdminDashboard from './components/AdminDashboard';
// import InfoRedBannerManagement from './components/InfoRedBannerManagement';

// const App = () => {
//   const isAuthenticated = !!localStorage.getItem('authToken'); // Vérifie si l'utilisateur est connecté

//   return (
//     <Router>
//       <Routes>
//         {/* Route pour l'inscription */}
//         <Route path="/register" element={<RegisterAdmin />} />

//         {/* Route pour la connexion */}
//         <Route path="/login" element={<LoginAdmin />} />

//         {/* Route pour le tableau de bord, protégée */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             isAuthenticated ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdmin from './components/LoginAdmin';
import RegisterAdmin from './components/RegisterAdmin';
import AdminDashboard from './components/AdminDashboard';
//import InfoRedBannerManagement from './components/InfoRedBannerManagement'; // Importez le composant
import HeaderManagement from './components/HeaderManagement';
import ContentManagement from './components/ContentManagement';
import TabsManagementPage from './components/infooficielle/TabsManagementPage'; // Page principale pour la gestion des onglets
import TabForm from './components/infooficielle/TabForm'; // Formulaire pour créer ou modifier un onglet
import { TabsProvider } from './context/TabsContext'; // Chemin vers le fichier TabsContext.js

import SliderManagement from './components/SliderManagement';
import TabContentManagement from './components/infooficielle/TabContentManagement';
import ArticlesManagementPage from './components/infooficielle/ArticlesManagementPage';
import ProjectManagement from './components/ProjectManagement';
import MediasManagement from './components/MediasManagement';
import CreateMinisterPage from './pages/CreateMinisterPage';
const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Vérifie si l'utilisateur est connecté

  return (
    <TabsProvider>
    <Router>
      <Routes>
        {/* Route pour l'inscription */}
        <Route path="/register" element={<RegisterAdmin />} />

        {/* Route pour la connexion */}
        <Route path="/login" element={<LoginAdmin />} />

        {/* Route pour le tableau de bord, protégée */}
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

<Route
  path="/content-management"
  element={
    isAuthenticated ? (
      <ContentManagement />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route
  path="/content-management/header"
  element={
    isAuthenticated ? (
      <HeaderManagement />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

 {/* Route pour la gestion des sliders */}
 <Route
          path="/content-management/sliders"
          element={
            isAuthenticated ? (
              <SliderManagement />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />



<Route
  path="/content-management/info-officielle"
  element={
    isAuthenticated ? (
      <TabsManagementPage />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route
  path="/content-management/info-officielle/new-tab"
  element={
    isAuthenticated ? (
      <TabForm />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route
  path="/content-management/info-officielle/edit-tab/:tabId"
  element={
    isAuthenticated ? (
      <TabForm isEdit={true} />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


<Route
  path="/content-management/info-officielle/tab-content/:tabId"
  element={
    isAuthenticated ? (
      <TabContentManagement />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

<Route
  path="//content-management/info-officielle/articles/:cardId"
  element={
    isAuthenticated ? (
      <ArticlesManagementPage />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


<Route
          path="/content-management/media-management"
          element={
            isAuthenticated ? (
              <MediasManagement />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

<Route
          path="/content-management/project-management"
          element={
            isAuthenticated ? (
              <ProjectManagement />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />



 {/* Route pour la page de création de ministre */}
 <Route
          path="/content-management/create-minister"
          element={
            isAuthenticated ? (
              <CreateMinisterPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


      </Routes>
      







    </Router>
    </TabsProvider>
  );
};

export default App;
