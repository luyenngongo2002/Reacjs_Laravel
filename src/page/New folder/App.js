import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import EditCar from './pages/EditCar';
import AddCarPage from './pages/AddCarPage';
import CarList from './pages/CarList';
import CarList2 from './pages/car2bang/CarList2';
function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} /> 
              <Route path="cars" element={<CarList />}/> 
              <Route path="cars/add" element={<AddCarPage />}/> 
              <Route path="cars2" element={<CarList2 />}/> 
           </Route>
          </Routes>
        </BrowserRouter>
      );
}
// react-router-dom chỉ cho định tuyến giữa các component nội bộ bên trong component đang định nghĩa chứ ko liên kết ra bên ngoài,
// nếu muốn liên kết ra ngoài thì dùng  thẻ a=href chứ ko dùng thẻ Link
// xem thêm về định tuyến react-router-dom tại
// https://www.youtube.com/watch?v=5jYlY4y5Dfs


export default App;