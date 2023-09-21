import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contain productToAdd
    const existingCartItem = cartItems.find(cartitem => cartitem.id === productToAdd.id)
    // if found, increment quantity
    if(existingCartItem) {
        console.log(productToAdd)
        return cartItems.map(cartitem => cartitem.id === productToAdd.id ? {
            ...cartitem, quantity: cartitem.quantity + 1
        }: cartitem)
    }
    // return new array with modifed cartitems/ new cart items
    console.log('new: ', [...cartItems, {...productToAdd, quantity:1}])
    return [...cartItems, {...productToAdd, quantity:1}]

}




export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>  total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}

    return  <CartContext.Provider value={value}>{children}</CartContext.Provider>
}