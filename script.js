//difinicion de la clase constructora para el objeto resultado
class Resultado {
    constructor(id, local, visitante, golesLocal, golesVisitante, ) {
        this.id = id,
        this.equipoLocal = local;
        this.equipoVisitante = visitante;
        this.golesLocal = golesLocal;
        this.golesVisitante = golesVisitante;
    }    
}

//array donde se van a guardar los resultados cargados por el usuario
let resultadosUser = []
let golesA = 0;
let golesB = 2;
resultadosUser.push(new Resultado(resultadosUser.length+1,"Banfield", "Defensa y Justicia", golesA, golesB));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Quilmes", "Arsenal de Sarandi", 0 , 0));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Deportivo Moron", "Patronato", 0 , 0));
resultadosUser.push(new Resultado(resultadosUser.length+1,"Central Cordoba", "Atlanta", 0 , 0));


const resultadosdelusuario = document.querySelector('#resultadosDelUsuario form');
const tablaResultadosGuardados = document.querySelector('#misResultadosGuardados tbody')
const tablaPuntos = document.querySelector("#tablapuntaje tbody");


mostrarPlantilla();
mostrarListado();

console.log(resultadosUser);

//con esta funcion paso la plantilla que hay que cargar
function mostrarPlantilla(){
    resultadosdelusuario.innerHTML = "";
    resultadosUser.forEach((partido) => {
        const matchHTML = document.createElement('div');
        matchHTML.innerHTML = `<!-- Input con mis resultados -->
        
            <div class="card mb-3">
                <div class="card-body">
                <h6 class="card-title"><label id="partidoID">Partido nro.: ${partido.id}</label></h6>
                <div class="input-group mb-3">
                    <label id="equipoLocal" for="golLocal" class="input-group-text">${partido.equipoLocal}</label>
                    <input  id="gLocal" class="form-control" type="number" name="golLocal" value="${partido.golesLocal}"></div>
                <div class="input-group mb-3">
                    <label id="equipoVisitante" for="golVisitante" class="input-group-text">${partido.equipoVisitante}</label>
                    <input  id="gVisitante" class="form-control" type="number" name="golVisitante" value="${partido.golesVisitante}"></div>
                    <button id="guardarBtn_${partido.id}" type="button" onclick="guardarResultado(event)" class="btn btn-primary">Guardar resultado</button>
                </div>
                </div>
            </div>`
                
                ;
    resultadosdelusuario.appendChild(matchHTML);
    })
}

function mostrarListado(){
    tablaResultadosGuardados.innerHTML="";
    console.log(resultadosUser);
    resultadosUser.forEach((partido) =>{
        const partidoHTML = document.createElement('tr');
        partidoHTML.innerHTML = `<td>${partido.id}</td>
                                 <td>${partido.equipoLocal}: ${partido.golesLocal}</td>
                                 <td>${partido.equipoVisitante}: ${partido.golesVisitante}</td>
                                 <td><button id="editarBtn_${partido.id}" type="button" onclick="editarResultado(event)" class="btn btn-outline-primary">editar resultado</button></td>`;
        tablaResultadosGuardados.appendChild(partidoHTML);
    })
};

function guardarResultado(event){
    const btn = event.target;
    const id= btn.id.split('_')[1];
    console.log("Partido nro: " + id);

    
    //este codigo me borra los elementos del array generandonos un nuevo array sin el elemento eliminado
    const encuentro = resultadosUser.filter((result) => result.id == id)[0];
    console.log(encuentro);
    
    let golesfinal = document.querySelector('#r');
    console.dir(golesfinal);
    let golocal = golesfinal[0].value;
    let govisitante = golesfinal[1].value;
    console.log(golocal);
    console.log(govisitante);
    


    
    
    console.dir('Imprimo el id: ' + encuentro.id);
//- - - - - - - - - - - - - HASTA ACA TODO BIEN - - - - - - - - - - - - - //


    /*
        hay que revisar la condicion
    */

    for (let i = 0; i < resultadosUser.length; i++) {
        if (resultadosUser[i].id == resultadosdelusuario.id) {
            resultadosUser[i].golesLocal = resultadosdelusuario.golesLocal.value
            resultadosUser[i].golesVisitante = resultadosdelusuario.golesVisitante.value
            break;
        }
        
    }

    console.log(btn);


    console.log(resultadosUser);
    
     
  
 }

//- - - - - - - - - - LOCALSTORAGE && JASON - - - - - - - - - - 


//Aca esta mi array de usuarios para guardar en el localStorage
let usuarios =[ 
    {id:1, nombre:'Noe-CARP', aciertos_exactos: 4, puntos_total: 12 },
    {id:2, nombre:'Toni_capo_del_sur', aciertos_exactos: 3, puntos_total: 9 },
    {id:3, nombre:'NegroEl31', aciertos_exactos: 3, puntos_total: 9 },
    {id:4, nombre:'ParrillaCaco', aciertos_exactos: 2, puntos_total: 6 },
    {id:5, nombre:'Toni_capo_del_sur', aciertos_exactos: 0, puntos_total: 90 }
];

//Guardo cada uno de los objetos del array en el localStorage
const usuariosJSON = (clave, valor) =>{localStorage.setItem(clave, valor)};
/*for (const usuario of usuarios) {
    usuariosJSON(usuario.id, JSON.stringify(usuario));
    
}*/
usuariosJSON('listausuarios', JSON.stringify(usuarios));

//Para sacar los objetos del array defino una clase constructora
class Usuario {
    constructor(el) {
        this.nombre = el.nombre;
        this.aciertos_exactos = el.aciertos_exactos;
        this.puntos_total = el.puntos_total;
    }
}

//Tomo la mi listadusuarios del localStorage y la separo usando un for para formatear 
//el string con la clase constructora anterior y lo meto en un nuevo array guardados
const guardados = JSON.parse(localStorage.getItem('listausuarios'));
usuarios = [];

for (const coso of guardados) {
    usuarios.push(new Usuario(coso));
    
};

//lo muestro por consola
console.log(usuarios);
console.log(guardados[2].nombre);

function mostrarpuntajes() {
    tablaPuntos.innerHTML = "";
    guardados.forEach((usuarioenguardados) => {
        const puntajeHTML = document.createElement("tr");
        puntajeHTML.innerHTML = `<th scope="row">${usuarioenguardados.id}</th>
                          <td>${usuarioenguardados.nombre}</td>
                          <td>${usuarioenguardados.aciertos_exactos}</td>
                          <td>${usuarioenguardados.puntos_total}</td>
                           `;
        tablaPuntos.appendChild(puntajeHTML);
    });
}
mostrarpuntajes()