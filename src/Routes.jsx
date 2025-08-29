import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebLayout } from "./layout/WebLayout";
import { HomePage, ProdutoCategoriaPage, ProdutoPage, CartPage, LoginPage } from './pages';
import { CartProvider } from './contexts/CartContext';
import { CardItem } from './components';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <CartProvider>

    <WebLayout>

      <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path={`categoria/:categoria`} element={<ProdutoCategoriaPage />} />
          <Route path={`produto/:nome`} element={<ProdutoPage />} />
          <Route path={`login`} element={<LoginPage/>}/>
          <Route path={`carrinho`} element={<CartPage/>}/>
      </Routes>
    </WebLayout>
    </CartProvider>
    </BrowserRouter>
  );
};
