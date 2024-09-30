import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './components/List';
import Create from './components/Create';
import Layout from './components/Layout';
import SearchResults from './components/SearchResults'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    
<Router>
<Routes Routes>
  <Route element={<Layout />}>
      <Route path="/" element={<List />} />
      <Route path="/search" element={<SearchResults />} />
  </Route>
  <Route path="/create" element={<Create/>} />
  </Routes>
</Router>
  );
}

export default App;
