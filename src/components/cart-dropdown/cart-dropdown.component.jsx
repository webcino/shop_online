import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {

    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckout = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckout}>TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown