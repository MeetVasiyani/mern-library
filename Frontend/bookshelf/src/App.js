import './App.css';
import ShowBookList from "./Components/ShowBookList";
import ShowBookDetails from "./Components/ShowBookDetails";
import UpdateBookInfo from "./Components/UpdateBookInfo";
import CreateBook from "./Components/CreateBook";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowBookList />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/show-book/:id" element={<ShowBookDetails />} />
        <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;