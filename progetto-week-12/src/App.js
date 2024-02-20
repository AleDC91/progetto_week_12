import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavbarComponent from './components/NavbarComponent';
import SinglePostPage from './pages/SinglePostPage';
import AuthorPage from './pages/AuthorPage';
import CategoryPage from './pages/CategoryPage';
import TagPage from './pages/TagPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/author/:authorId' element={<AuthorPage />} />
          <Route path='/article/:articleId' element={<SinglePostPage />} />
          <Route path='/category/:categoryId' element={<CategoryPage />} />
          <Route path='/tag/:tagId' element={<TagPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
