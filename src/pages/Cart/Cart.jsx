import { useCart } from "../../contexts/CartContext";
import style from './CartPage.module.css'; // Crie um arquivo CSS para estilizar

export const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => {
        return total + item.produto.preco * item.quantidade;
    }, 0);

    return (
        <div className={style.containerCartPage}>
            <h2>Seu Carrinho</h2>
            {cart.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className={style.cartList}>
                        {cart.map((item, index) => (
                            <li key={index} className={style.cartItem}>
                                <img src={`/images/${item.produto.imagemUrl}`} alt={item.produto.nome} className={style.itemImage} />
                                <div className={style.itemDetails}>
                                    <h3>{item.produto.nome}</h3>
                                    <p>Cor: {item.cor}</p>
                                    <p>Tamanho: {item.tamanho}</p>
                                    <p>Quantidade: {item.quantidade}</p>
                                    <p>Preço: R${(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                                </div>
                                <button onClick={() => removeFromCart(index)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                    <div className={style.cartSummary}>
                        <h3>Total: R${totalPrice.toFixed(2).replace('.', ',')}</h3>
                        <button>Finalizar Compra</button>
                    </div>
                </>
            )}
        </div>
    );
};