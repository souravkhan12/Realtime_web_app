import Noty from 'noty'
import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res =>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type : 'success',
            timeout : 100,
            progressBar : false,
            text : 'Item added to cart'
        }).show()
    }).catch(err=>{
        new Noty({
                type : 'error',
                timeout : 100,
                progressBar : false,
                text : 'something went wrong'
        }).show()
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{

        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})

