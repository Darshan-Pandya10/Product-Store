
const container = document.querySelector('.container');
const companyFilter = document.querySelector('.company-filter');
const all = document.querySelector('.all');
const search = document.querySelector('.search');

async function getData(){
    
    try{
        
        const api = await fetch('data.js');
        if(api.status === 200){
            const response = await api.json();
            const makeProduct = response.map(product => {
                return `<div class='product-card'>
                <img class='product-image' src='${product.image}'/>
                <p class='product-title'>${product.title}</p>
                <p class='product-company'>${product.company}</p>
                <p class='product-price'>${product.price}</p>
                </div>`
            }).join(' ');

            container.innerHTML = makeProduct;
            
            // company list
            
            const companyList = [];
           response.forEach(product => {
            if(companyList.includes(product.company)){
                return
                // console.log('company already exist')
            }
            else
            companyList.push(product.company)
        });
        
        companyList.forEach(company => {
            const button = document.createElement('button');
            button.innerHTML = company;
            button.classList.add('company-button');
            companyFilter.appendChild(button);
            
            button.addEventListener('click', () => {
                const filterProduct = response.filter(product => product.company === button.innerText);
                
                const displayProduct = filterProduct.map(product => {
                    
                    return `<div class='product-card'>
                    <img class='product-image' src='${product.image}'/>
                    <p class='product-title'>${product.title}</p>
                    <p class='product-company'>${product.company}</p>
                    <p class='product-price'>${product.price}</p>
                    </div>`
                }).join(' ');
                
                container.innerHTML = displayProduct;
                
                
            })
            
        })

        // to display all the products after user choose filter option.
        
        all.addEventListener('click',() => {
            const makeProduct = response.map(product => {
                return `<div class='product-card'>
                <img class='product-image' src='${product.image}'/>
                <p class='product-title'>${product.title}</p>
                <p class='product-company'>${product.company}</p>
                <p class='product-price'>${product.price}</p>
                </div>`
            }).join(' ');
            
            container.innerHTML = makeProduct;
        });
        

        // to search by product name

        search.addEventListener('keyup', () => {
                // console.log(searchValue)
               const searchProduct =  response.filter(product => product.title.includes(search.value)).map(product => {
                        return `<div class='product-card'>
                        <img class='product-image' src='${product.image}'/>
                        <p class='product-title'>${product.title}</p>
                        <p class='product-company'>${product.company}</p>
                        <p class='product-price'>${product.price}</p>
                        </div>`
               }).join(' ');
               
               container.innerHTML = searchProduct;
                })
            
        
        }

        else 
        console.log('api is down');

    }

    catch(err){
        console.log(err);
    }

}

getData()
