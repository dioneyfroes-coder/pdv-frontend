import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import PDVLayout from './PdvLayout';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-[1366px] h-[768px] mx-auto ...">
                <PDVLayout />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App
