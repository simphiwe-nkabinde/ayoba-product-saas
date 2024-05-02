export function updateCartItemQty(cart, id, qty) {
    const index = cart.findIndex(i => i.id == id)
    //add product to cart
    if (index == -1 && qty > 0) return [...cart, {id, qty}]
    //remove product from cart
    if (qty == 0) return cart.toSpliced(index, 1)
    if (qty > 0) return cart.toSpliced(index, 1, {id, qty})
}

export function getCartItemQty(cart, id) {
    const index = cart.findIndex(i => i.id == id)
    if (index == -1) return 0
    return cart[index].qty
}

export function getCartTotalQty(cart) {
    return cart.reduce((total, product) => total + product.qty, 0)
}

export function getCartTotalCost(cart, products) {
    return cart.reduce((total, currProduct) => {
        const index = products.findIndex(i => i.id == currProduct.id)
        return total + (products[index].attributes.price * currProduct.qty)
    }, 0)
}