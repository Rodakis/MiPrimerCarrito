
//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarBotonBtm = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //caundo agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito con el boton
    vaciarBotonBtm.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el carrito

        limpiarCarrito();//eliminamos todo el HTML

    })
}
//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
        }
}

//elimina un curso del carrito

function eliminarCurso(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
       const cursoId = e.target.getAttribute('data-id');


       //elimiar del arreglo articulosCarrito por el data-id

       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
       console.log(articulosCarrito);
       carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}
   
///funcion q lee contenido HTML alque le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
//console.log(curso);

//crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }

//revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if (existe){
    //agregamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actualizado
        }else{
            return curso;//retorna el objeto que no son duplicados
        }
    })
}else{
    //agregamos el curso al arrito
//agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}
    
    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compra en el HTML

function carritoHTML(){

    //limpiar HTML
    limpiarCarrito()

    //recorre el carrito y genera HTML
    articulosCarrito.forEach( (curso) => {
        
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
           <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

        `;

        //agrega el HTML al carrito en el tbody

        contenedorCarrito.appendChild(row);

    })
}

    //elimina los cursos del tbody 
    
function limpiarCarrito(){
    //forma lenta
  //  contenedorCarrito.innerHTML = '';
//}

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}
