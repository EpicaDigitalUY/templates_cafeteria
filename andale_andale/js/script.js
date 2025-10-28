const catContainer = document.getElementById("categoriasContainer");
const headerMenu = document.getElementById("headerMenu");

//lista inicial de categorias
let categorias = [];

//llamada al menu
fetch('/json/menu.json')
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            catContainer.innerHTML = `<p>UPS, tenemos un problema, pide un menú físico</p>`
        } else {
            // recorre la listas de platos
            data.forEach(plato => {
                if (!categorias.includes(plato.categoria)) {
                    //guarda las categorias
                    categorias.push(plato.categoria)
                }
            });
            //recorre la lista de categorias
            categorias.forEach(c => {
                //Arranca renderizando todas las categorias
                allCat(c);


                //Mostrar los productos que pertenecen a determinada categoria
                function prodPorCat(c, data) {
                    catContainer.innerHTML = '';

                    //Boton de regreso
                    const divReturn = document.createElement('div');
                    divReturn.classList.add('volver-cat');
                    divReturn.innerHTML = '← Volver'

                    headerMenu.appendChild(divReturn)


                    //renderizacion de los productos
                    data.forEach(p => {
                        if (p.categoria === c) {

                            // Card de Platillo
                            const divPlato = document.createElement('div');
                            divPlato.classList.add('platillo');
                            divPlato.innerHTML = `
                                <img src="${[p.imagen]}" alt="${p.nombre_comida}"/>
                                <h4>${[p.nombre_comida]}</h4>
                                <p class="precio">$${p.precio}</p>
                            `
                            catContainer.appendChild(divPlato)
                        }
                    });

                    //Boton de regreso(parte inferior)

                    //Funcionalidad de btn regresar
                    divReturn.addEventListener("click", () => {
                        catContainer.innerHTML = ''
                        categorias.forEach(c => allCat(c))
                        headerMenu.innerHTML = '<h2>Menú</h2> <hr>'
                    })
                }

                //Mostrar todas las categorias disponibles
                function allCat(c) {
                    const div = document.createElement('div')
                    div.classList.add('categoria');
                    div.innerHTML = `
                    <h3>${c}</h3>
                    `
                    catContainer.appendChild(div);

                    //muestra los platos por categoria seleccionada
                    div.addEventListener('click', () => prodPorCat(c, data))
                }
            });
        }
    }
    );

