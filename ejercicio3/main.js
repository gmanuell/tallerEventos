let arrayNotas = []; //Crear un array donde vamos a guardar las notas
let id = 0; //Crear una variable idGlobal e inicializala en el mismo valor del ultimo id que creaste manualmente, usaremos esto como control de las notas.
const contenedorNotas = document.getElementById("infoCard");
const searchNota = document.getElementById("searchNota");

function guardarNota() { 
    id +=1
    let tituloNota = document.getElementById("tituloNota").value;
    let descripcionNota = document.getElementById("descripcionNota").value;
    let realizada = false 
    let nuevaNota = {
        id:id,
        titulo:tituloNota,
        texto:descripcionNota,
        realizada:realizada
    }
    arrayNotas.push(nuevaNota); //Agregar un par de notas de prueba como la siguiente
    console.log(arrayNotas);
    actualizarNotas();
}

function borrarNota(id) {
    arrayNotas = arrayNotas.filter(item=>item.id!==id)
    actualizarNotas();
    
}

function actualizarNotas() {
    contenedorNotas.innerHTML = '';
    arrayNotas.forEach(nota=>{
        const carta = document.createElement("div");
        carta.className = "card m-2";
        carta.innerHTML = `
        <div class="card-body">
                <h5 class="card-title">${nota.titulo}</h5>
              <p class="card-text">${nota.texto}</p>
              <button onclick="borrarNota(${nota.id})" class="btn btn-primary">borrar nota</button>
            </div>
        `;
        contenedorNotas.appendChild(carta);
    })
}

searchNota.addEventListener('keyup',(event)=>{
    const titulo = event.target.value
    console.log(titulo);
    
    const notasFiltradas = arrayNotas.filter(item=>item.titulo.toLowerCase().includes(titulo.toLowerCase()))
    if (notasFiltradas.length>0) {
       contenedorNotas.innerHTML = "" 
        notasFiltradas.forEach(nota=>{
            const carta = document.createElement("div");
            carta.className = "card m-2";
            carta.innerHTML = `
            <div class="card-body">
            <h5 class="card-title">${nota.titulo}</h5>
            <p class="card-text">${nota.texto}</p>
            <button onclick="borrarNota(${nota.id})" class="btn btn-primary">borrar nota</button>
            </div>
            `;
            contenedorNotas.appendChild(carta);
        })   
    }
    else {contenedorNotas.innerHTML = '<p>No items found.</p>'
    }    
})