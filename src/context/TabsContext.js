import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const TabsContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useTabs = () => useContext(TabsContext);

// Fournisseur du contexte
export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]); // État pour stocker les onglets

  // Fonction pour ajouter un nouvel onglet
  const addTab = (newTab) => {
    setTabs((prevTabs) => [...prevTabs, newTab]);
  };

  return (
    <TabsContext.Provider value={{ tabs, setTabs, addTab }}>
      {children}
    </TabsContext.Provider>
  );
};
