import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contain productToAdd
    const existingCartItem = cartItems.find(cartitem => cartitem.id === productToAdd.id)
    // if found, increment quantity
    if(existingCartItem) {
        return cartItems.map(cartitem => cartitem.id === productToAdd.id ? {
            ...cartitem, quantity: cartitem.quantity + 1
        }: cartitem)
    }
    // return new array with modifed cartitems/ new cart items
    console.log('new: ', [...cartItems, {...productToAdd, quantity:1}])
    return [...cartItems, {...productToAdd, quantity:1}]

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartitem => cartitem.id === cartItemToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartitem => cartitem.id === cartItemToRemove.id ? {
        ...cartitem, quantity: cartitem.quantity - 1
    }: cartitem)
} 

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
      };

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>  total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) =>  total + (cartItem.quantity * cartItem.price), 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, clearItemFromCart, removeItemFromCart, cartItems, cartCount, cartTotal}

    return  <CartContext.Provider value={value}>{children}</CartContext.Provider>
}