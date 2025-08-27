import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebLayout } from "./layout/WebLayout";

import { HomePage } from './pages';
import { ProdutoCategoria } from './components';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <WebLayout>

      <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path={`categoria/:categoria`} element={<ProdutoCategoria />} />
      </Routes>
    </WebLayout>
    </BrowserRouter>
  );
};
