import {menuArray} from "/data.js"


const form = document.getElementById('form')
const allOrders = []
let formData = ''

// HANDLE FORM AND PURCHASE COMPLETE

form.addEventListener('submit', function(e){
    e.preventDefault()
    formData = new FormData(form)
    let completePurchaseHtml = `<h2 id="purchase-complete">${formData.get('name')}, for your purchase, your order is on it's way</h2>`
    document.getElementById('order').innerHTML = completePurchaseHtml
    document.getElementById('modal').style.display = "none"
})

// SHOW MODAL FORM AND HIDE ADD BTN
document.getElementById('completedOrderBtn').addEventListener('click', () =>{
    if(allOrders.length > 0) {
        document.querySelector('.modal-container').style.display = "block"
        const allIconsBtn = document.querySelectorAll('.add-order-icon')
        allIconsBtn.forEach(icon => {
            icon.style.display = "none"
        })
    } else {
        return false
    }
})

// EVENT LISTENERS
document.getElementById('menu-list').addEventListener('click', (e) => {
    if(e.target.id){
        addToOrder(e.target.id)
    }
})
document.getElementById('order').addEventListener('click', function(e){
    if(e.target.id === 'total-price'){
        e.target.id = false
    }
    if(e.target.id && e.target.classList.contains('remove-item')) {
        removeFromOrders(e.target.id)
    }
})

// REMOVE ITEMS FROM LIST, AND TAKE AWAY PRICE FROM TOTAL PRICE FUNCTIONS
function removeFromOrders(itemId){
    const itemToRemove = allOrders.filter(item => {
        return item.id === parseInt(itemId)
    })
    allOrders.splice(itemToRemove, 1)
    calculateTotalPrice()
    document.getElementById(itemId).parentElement.remove()
    render()
}

// ADD ORDER TO ORDERLIST, SUM PRICE AND TO TOTAL FUNCTIONS

function addToOrder(itemId) {
    const targetMenuItem = menuArray.filter(item => {
       return item.id === parseInt(itemId)
    })[0]
    allOrders.unshift(targetMenuItem)
    console.log(allOrders)
    renderOrder(targetMenuItem)
    calculateTotalPrice()
}

function renderOrder(order){
    let html = ''
    html = `
    <div class="item-container">
        <h4 class="item-title">${order.name}</h4>
        <p class="remove-item" id="${order.uuid}">remove</p>
        <p id="price" class="item-price">$${order.price}</p>
    </div>
    `
    document.getElementById('ordered-items').innerHTML += html
}

function calculateTotalPrice(){

    let total = 0
    for(let i = 0; i < allOrders.length; i++){
        total += allOrders[i].price
    }
    document.getElementById('total-price').textContent = `$${total}`
    return total
}

// CREATE HTML MENU ITEMS

function menuItemsHtml () {
    let html = ''
    menuArray.forEach(item => {
        let ingredients = ''
        if(item.ingredients.length > 0){
            item.ingredients.forEach(ingredient => {
                ingredients += `<div class="ingredients"><span>${ingredient}</span></div>`
            })
        }
         html += `<div class="food-item">
            <div alt="burger" class="food-img">${item.emoji}</div>
            <div class="food-items">
                <h3 class="food-type">${item.name}</h3>
                ${ingredients}
                <p><strong>$${item.price}</strong></p>
            </div>
            <i class="add-order-icon fa fa-thin fa-circle-plus"  data-${item.name}="${item.id}" id="${item.id}"></i>
        </div> `
    })
    return html
}

// RENDER HTML ITEMS TO THE DOM

function render(){
    document.getElementById('menu-list').innerHTML = menuItemsHtml()
}

render()