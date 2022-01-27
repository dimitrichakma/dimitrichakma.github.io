let carts = document.querySelectorAll('.add-cart')
let productList = document.querySelector('#product-list')
document.addEventListener('DOMContentLoaded', onLoadCartNumbers)
document.addEventListener('DOMContentLoaded', displayCart)
productList.addEventListener('click', removeProduct)
let products = [
    {
        name: 'Women T Shirt',
        tag: 'womentshirt',
        price: 25,
        inCart: 0
    },
    {
        name: 'Men T Shirt',
        tag: 'mentshirt',
        price: 35,
        inCart: 0
    },
    {
        name: 'Black T Shirt',
        tag: 'blacktshirt',
        price: 45,
        inCart: 0
    },
    {
        name: 'White T Shirt',
        tag: 'whitetshirt',
        price: 55,
        inCart: 0
    }

]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        CartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function CartNumbers(product) {
    //this.product = products;
    //console.log('The product clicked is', product)

    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }
    //console.log("Inside of set item function")
    //console.log('My product is', product)



    localStorage.setItem('productsInCart', JSON.stringify(cartItems))

}


function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem('totalCost', product.price)


    }

}

function displayCart(e) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('#product-list')
    let cartCost = localStorage.getItem('totalCost');

    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <tr>
        <td> ${item.name}</td>
        <td> $${item.price}.00</td>
        <td> 
        <ion-icon class='decrease' name="caret-back-circle"></ion-icon> ${item.inCart} <ion-icon class='increase' name="caret-forward-circle"></ion-icon> </td>
        <td> $${item.price * item.inCart}.00</td>
        <td><a href = '#'class='delete'> Remove </a> </td>
        </tr>`
    })
    productContainer.innerHTML += `
    <div class ='basketTotalContainer'>
    <h5 class= 'basketTotalTitle'>
    Basket Total  = </h5>
    <h5 class'basketTotal>
    $${cartCost}.00 </h5>
    </div>`
}

function removeProduct(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let ele = e.target.parentElement.parentElement
            ele.remove()
            removefromLs(ele)

            //console.log(ele)

        }

    }



}

function removefromLs() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (let i = 0; i < cartItems.length; i++) {
        localStorage.removeItem(cartItems[i])
    }




}


