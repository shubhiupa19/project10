import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
  <Router>
    <Navbar onSearch={handleSearch} />
    <Routes>
    <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
    <Route path="/post/:id" element={<PostPage />} />
    <Route path="/create-post" element={<CreatePostPage />} />

    </Routes>
  </Router>

  );
}

export default App;
