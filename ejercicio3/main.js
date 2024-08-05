// let arrayNotas = []; //Crear un array donde vamos a guardar las notas
// let id = 0; //Crear una variable idGlobal e inicializala en el mismo valor del ultimo id que creaste manualmente, usaremos esto como control de las notas.
// const contenedorNotas = document.getElementById("infoCard");
// const searchNota = document.getElementById("searchNota");

// function guardarNota() { 
//     id +=1
//     let tituloNota = document.getElementById("tituloNota").value;
//     let descripcionNota = document.getElementById("descripcionNota").value;
//     let realizada = false 
//     let nuevaNota = {
//         id:id,
//         titulo:tituloNota,
//         texto:descripcionNota,
//         realizada:realizada
//     }
//     arrayNotas.push(nuevaNota); //Agregar un par de notas de prueba como la siguiente
//     console.log(arrayNotas);
//     actualizarNotas();
// }

// function borrarNota(id) {
//     arrayNotas = arrayNotas.filter(item=>item.id!==id)
//     actualizarNotas();
    
// }

// function actualizarNotas() {
//     contenedorNotas.innerHTML = '';
//     arrayNotas.forEach(nota=>{
//         const carta = document.createElement("div");
//         carta.className = "card m-2";
//         carta.innerHTML = `
//         <div class="card-body">
//                 <h5 class="card-title">${nota.titulo}</h5>
//               <p class="card-text">${nota.texto}</p>
//               <button onclick="borrarNota(${nota.id})" class="btn btn-primary">borrar nota</button>
//             </div>
//         `;
//         contenedorNotas.appendChild(carta);
//     })
// }

// searchNota.addEventListener('keyup',(event)=>{
//     const titulo = event.target.value
//     console.log(titulo);
    
//     const notasFiltradas = arrayNotas.filter(item=>item.titulo.toLowerCase().includes(titulo.toLowerCase()))
//     if (notasFiltradas.length>0) {
//        contenedorNotas.innerHTML = "" 
//         notasFiltradas.forEach(nota=>{
//             const carta = document.createElement("div");
//             carta.className = "card m-2";
//             carta.innerHTML = `
//             <div class="card-body">
//             <h5 class="card-title">${nota.titulo}</h5>
//             <p class="card-text">${nota.texto}</p>
//             <button onclick="borrarNota(${nota.id})" class="btn btn-primary">borrar nota</button>
//             </div>
//             `;
//             contenedorNotas.appendChild(carta);
//         })   
//     }
//     else {contenedorNotas.innerHTML = '<p>No items found.</p>'
//     }    
// })

let notas = [
    { id: 1, titulo: "Nota 1", texto: "Esta es la primera nota", realizada: false },
    { id: 2, titulo: "Nota 2", texto: "Esta es la segunda nota", realizada: true }
];

let idGlobal = 2;

function crearInterfaz() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container mt-5">
            <h1 class="mb-4">Aplicación de Notas</h1>
            <div class="row mb-3">
                <div class="col-md-6">
                    <input type="text" id="titulo" class="form-control mb-2" placeholder="Título">
                    <textarea id="texto" class="form-control mb-2" placeholder="Texto de la nota"></textarea>
                    <button onclick="guardarNota()" class="btn btn-primary me-2">Guardar</button>
                    <button onclick="limpiarCampos()" class="btn btn-secondary">Limpiar</button>
                </div>
                <div class="col-md-6">
                    <input type="text" id="filtro-texto" class="form-control mb-2" placeholder="Buscar notas" oninput="aplicarFiltros()">
                    <div class="form-check form-switch">
                        <input type="checkbox" id="filtro-realizadas" class="form-check-input" role="switch" onchange="aplicarFiltros()">
                        <label class="form-check-label" for="filtro-realizadas">Mostrar solo realizadas</label>
                    </div>
                </div>
            </div>
            <div id="contenedor-notas" class="row"></div>
        </div>
    `;
}

function pintarNotas(notasFiltradas = notas) {
    const contenedor = document.getElementById("contenedor-notas");
    contenedor.innerHTML = "";

    if (notasFiltradas.length === 0) {
        contenedor.innerHTML = '<div class="col-12"><p class="alert alert-info">NO HAY NOTAS PARA MOSTRAR</p></div>';
        return;
    }

    notasFiltradas.forEach(nota => {
        const notaElement = document.createElement('div');
        notaElement.className = 'col-md-4 mb-3';
        notaElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${nota.titulo}</h5>
                    <p class="card-text">${nota.texto}</p>
                    <div class="form-check form-switch mb-2">
                        <input type="checkbox" class="form-check-input" role="switch" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})">
                        <label class="form-check-label">Realizada</label>
                    </div>
                    <button onclick="borrarNota(${nota.id})" class="btn btn-danger btn-sm">Borrar nota</button>
                </div>
            </div>
        `;
        contenedor.appendChild(notaElement);
    });
}

function agregarNota(titulo, texto) {
    idGlobal++;
    const nuevaNota = { id: idGlobal, titulo, texto, realizada: false };
    notas.push(nuevaNota);
}

function guardarNota() {
    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;
    
    if (titulo.trim() !== "" && texto.trim() !== "") {
        agregarNota(titulo, texto);
        aplicarFiltros();
        limpiarCampos();
    } else {
        alert("Por favor, completa todos los campos");
    }
}

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    aplicarFiltros();
}

function limpiarCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}

function marcarRealizada(id) {
    const nota = notas.find(nota => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        aplicarFiltros();
    }
}

function filtrarPorRealizada(array) {
    return array.filter(nota => nota.realizada);
}

function filtrarPorTexto(array, texto) {
    if (!texto) return array;
    return array.filter(nota => 
        nota.titulo.toLowerCase().includes(texto.toLowerCase()) || 
        nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
}

function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtro-texto").value;
    const soloRealizadas = document.getElementById("filtro-realizadas").checked;

    let notasFiltradas = [...notas];

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizada(notasFiltradas);
    }

    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);

    pintarNotas(notasFiltradas);
}

document.addEventListener("DOMContentLoaded", () => {
    crearInterfaz();
    aplicarFiltros();
});