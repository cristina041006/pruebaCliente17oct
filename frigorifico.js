//Capturamos los campos necesarios del frigorifico y la lista para comenzar
const formFrigo = document.getElementById('frigo');
const listFrigo = document.getElementById('listaFrigo');

const formShop = document.getElementById('compra');
const listShop = document.getElementById('listaCompra');

//Creamos las variables donde se almacenaran los objetos
const frigo = JSON.parse(localStorage.getItem('frigo')) || {};
const list = JSON.parse(localStorage.getItem('list')) || {};

//Funcion para poder crear un elemento de una lista con su respectivo boton
function createLi (product){
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.textContent="Borrar";
    li.textContent = `${product}:`;  
    li.appendChild(deleteButton);
    return li;
}

//Funcion para añadir el elemento li a la lista del frigorifico
function addListFrigo(product){
    const li = createLi(product);
    listFrigo.appendChild(li);
}

//Funcion para añadir el elemento li a la lista de la compra
function addListShop(product){
    const li = createLi(product);
    listShop.appendChild(li);
}

//Funcion para borrar producto del frigorifico
function deleteProductFrigo(e){
    if(e.target.classList.contains("delete")){//Comprobamos que lo que hemos pulsado de la lista sea un boton con la clase añadida anteriormente
        const li = e.target.parentElement; //Capturamos cual es el padre del boton
        const product = li.textContent.split(":")[0]; //Array necesario para separar el producto del boton (nos quedamos con el producto)
        delete frigo[product] //Borramos de la lista de objetos del frigorifico el producto identificandolo con su id
        listFrigo.removeChild(li); //Borramos el producto de la lista de frigorifico
        localStorage.setItem('frigo', JSON.stringify(frigo)); //Recargamos esa lista al almacenamiento

        if(!list.hasOwnProperty(product)){
            addDeleteProduct(product); //Hacemos que nuestro producto borrado se añada a la lista de la compra con esta funcion
        }else{
            alert("producto esta en la cesta");
        }
        
    }
}

//Funcion para borrar producto de la lista de la compra
function deleteProductShop(e){
    if(e.target.classList.contains("delete")){
        const li = e.target.parentElement;
        const product = li.textContent.split(":")[0];
        delete list[product]
        listShop.removeChild(li);
        localStorage.setItem('list', JSON.stringify(list));
    }
}

//Funcion para que el producto borrado en el frigorifico aparezca en la lista de la compra
function addDeleteProduct (product){
    addListShop(product);
    list[product] = {product};
    localStorage.setItem('list', JSON.stringify(list));
}

//Cuando añadimos un producto al frigorifico
formFrigo.addEventListener('submit', (e)=>{
    e.preventDefault();
    const product = document.getElementById('productoFrigo').value; //Capturamos el producto
    if(product && !frigo.hasOwnProperty(product)){//Comprobamos que el producto no este vacio
        addListFrigo(product); //Añadimos a la lista de firgorifico
        frigo[product] = {product}; //Lo añadimos a la lista de objetos del frigorifico con su propio nombre como identificador
        localStorage.setItem('frigo', JSON.stringify(frigo)); //Enviamos la lista al almacenamiento
        formFrigo.reset();
    }else{
        alert("Añade un producto");
        formFrigo.reset();
    }
    
})

//Cuando añadimos un producto a la lista de la compra
formShop.addEventListener('submit', (e)=>{
    e.preventDefault();
    const product = document.getElementById('productoLista').value; //Capturamos el producto
    if(product && !list.hasOwnProperty(product)){
        addListShop(product); //Añadimos a la lista de la compra
        list[product] = {product}; //Lo añadimos a la lista de objetos de la compra con su propio nombre como identificador
        localStorage.setItem('list', JSON.stringify(list)); //Enviamos la lista al almacenamiento
        formShop.reset();
    }else{
        alert("Añade un producto");
    }
    
})


//Cuando queremos borrar un producto del frigorifico
listFrigo.addEventListener('click', (e)=>{
    deleteProductFrigo(e); //llamamos a la funcion correspondiente
})

//Cuando queremos borrar un producto de la compra
listShop.addEventListener('click', (e)=>{
    deleteProductShop(e); //llamamos a la funcion correspondiente
})

//Cargamos los datos del almacenamiento del frigorifico para que estos no se pierdan al recargar la pagina
for(const p in frigo){
    const product = frigo[p].product;
    addListFrigo(product);
}

//Cargamos los datos del almacenamiento de la lista de la compra para que estos no se pierdan al recargar la pagina
for(const l in list){
    const product = list[l].product;
    addListShop(product);
}