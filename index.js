'use strict';

/*
 * VICENS, SOFIA
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     Codigo: 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             Duracion: 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             Duracion: 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             Duracion: 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             Duracion: 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             Duracion: 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             Duracion: 720,
//         },
//     ],
// };


// Discos:

class Discos {
    nombreDisco;
    autor;
    codigo;
    #pistas;

    constructor(nombreDisco, autor, codigo) {
    this.nombreDisco = nombreDisco;
    this.autor = autor;
    this.codigo = codigo;
  }

    set setPistas(pistas){
    this.#pistas = pistas;
  }
    get getPistas(){
    return this.#pistas;
  }

}
  
class Pistas {
    #pista;
    #duracion;
    
    constructor(pista, duracion) {
    this.#pista = pista;
    this.#duracion = duracion;
  }

    set setpista(pista){
    this.#pista = pista;
  }
    set setDuracion(duracion){
    this.#duracion = duracion;
  }
    get getPista(){
    return this.#pista;
  }
    get getDuracion(){
    return this.#duracion;
  }
  
}

class ColeccionDiscos{
  #disco;

  constructor(){
    this.#disco = [];
  }

  agregarColeccionDiscos(disco){
      this.#disco.push(disco);
  }

  validarCodigo(cod){
      
      for(let i of this.#disco){
        if(cod == i.codigo){ return 1;}
      }
  }

  contarDiscos(){
    return this.#disco.length;
  }

  get getDisco(){
    return this.#disco;
  }
}

// Mis variables importantes:

let arrayPistas = [];
let coleccionDiscos = new ColeccionDiscos();
let disco = new Discos();
let pista = new Pistas();


// Función Cargar:

function Cargar() {
    let nombreDisco, autor, codigo, pista, duracion;

    disco = {};

    nombreDisco = pedirDisco();
    autor = pedirAutor();
    codigo = pedirCodigo();
    disco = new Discos(nombreDisco, autor, codigo);

    pista = {};
    arrayPistas=[];

    do {
        pista = nombrePista();
        duracion = segundosPista();
        pista = new Pistas(pista,duracion);
        arrayPistas.push(pista);
        } while (confirm("Desea cargar otra pista?"));

        disco.setPistas = arrayPistas;
        coleccionDiscos.agregarColeccionDiscos(disco);
}

// Función Mostrar:

function Mostrar(){
    let html = "", discoMayorDuracion, MayorDuracionDisco = 0;

    for(let disco of coleccionDiscos.getDisco){
        let cantidadPistas = 0,
          duracionTotalDisco = 0,
          pistaMayorDuracion = 0,
          nombrePistaMayorDuracion;

          html+=`<div class="discos">`
          html+=`<p>Disco: ${disco.nombreDisco}<br>
                Autor: ${disco.autor}<br>
                Cod disco: ${disco.codigo}</p>`
          html+=`<ul>`

    for(let i of disco.getPistas){
        cantidadPistas++;
        duracionTotalDisco+=i.getDuracion;

        html+=`<li style = "color: ${i.getDuracion > 180 ? "red" : "white"}">Pista: ${i.getPista} <br> Duracion: ${i.getDuracion}</li>`

      if(i.getDuracion > pistaMayorDuracion){
        pistaMayorDuracion = i.getDuracion;
        nombrePistaMayorDuracion = i.getPista;
      }

        html+=`</ul>`
        }
        html+=`<p>Cantidad de pistas: ${cantidadPistas}</p>`
        html+=`<p>Duracion del disco: ${duracionTotalDisco}</p>`
        html+=`<p>Promedio de duracion por pista: ${duracionTotalDisco/cantidadPistas}</p>`
        html+=`<p>Pista de mayor duracion: ${nombrePistaMayorDuracion}</p>`

      if(duracionTotalDisco > MayorDuracionDisco){
        MayorDuracionDisco = duracionTotalDisco;
        discoMayorDuracion = disco.nombreDisco;
      }

      html+=`</div>`
      }

      html+= `<div class="discos2">`
      html+=`<p>El disco de mayor duracion es: ${discoMayorDuracion}</p>`
      html+=`<p>Cantidad de Discos: ${coleccionDiscos.contarDiscos()}</p>`
      html+= `</div>`
      
      // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
      document.getElementById("info").innerHTML = html; 

}

// Todas las funciones que necesites:

// Funcion para pedir nombre de disco

function pedirDisco(){
  let nombreDisco;   
 
  do {
     nombreDisco = prompt("Ingrese el nombre del disco");
     var flagnombre = true;
     if (nombreDisco === " " || nombreDisco === "" || nombreDisco === null || nombreDisco === undefined ){
       alert("No ingresó ningún dato o ingresó un dato incorrecto, por favor ingrese el nombre del disco"); flagnombre = false;
     } else {flagnombre = true;}
   
    } while (!flagnombre);
      return nombreDisco;
}

// Funcion para pedir autor:
 
function pedirAutor(){
  let autor;
 
  do {
      autor = prompt("Ingrese el nombre del autor o banda");
      var flagautor = true;
         
      if (autor === " " || autor === "" || autor === null || autor === undefined){
          alert("No ingresó ningún dato o ingresó un dato incorrecto, por favor ingrese el nombre del autor o banda"); flagautor = false;
      }else {flagautor = true};
       
    } while (!flagautor);
      return autor;
}

// Funcion para pedir codigo:
 
function pedirCodigo(){
  let codigo;
 
  do {
      codigo = parseInt(prompt("Ingrese el codigo del disco"));
      var flagcodigo = true;
         
      let validarNum = coleccionDiscos.validarCodigo(codigo);
 
      if(validarNum == 1){
          alert("Ingreso un codigo ya existente. Ingrese otro codigo!"); flagcodigo = false; 
      }else {  
          if (isNaN (codigo) || codigo < 1 || codigo > 999){
          alert("Codigo incorrecto (Ingrese un código numérico de 1 a 999)"); flagcodigo = false;
          }else {flagcodigo = true};
      }
       
    } while (!flagcodigo);
      return codigo;
}

// Funcion para pedir nombre de pista:
 
function nombrePista(){     
  let pista;

   do {
       pista = prompt("Ingrese el nombre de la pista");
       var flagcancion = true;
        
       if (pista === " " || pista === "" || pista === null || pista === undefined ){
           alert("No ingreso ningún dato o no ingresó un dato válido, vuelva a ingresar el nombre de la pista."); flagcancion = false;
       } else {flagcancion = true;}
         
      } while (!flagcancion);
        return pista;
}
 
// Funcion para pedir duracion de pista:

function segundosPista(){
  let duracion;

  do {
      duracion = parseInt(prompt("Ingrese la duracion de la pista"));
      var flagsegundos = true;
       
      if (isNaN (duracion) || duracion < 1 || duracion > 7200){
          alert("Dato incorrecto (Ingrese un dato numérico, duracion permitida: 1 a 7200)"); flagsegundos = false;
      }else {flagsegundos = true};
         
      } while (!flagsegundos);   
        return duracion;
}

// Funcion para limpiar contenido:

function Resetear(){
  let html = "";
  document.getElementById("info").innerHTML = html;
}

// Funcion para buscar disco:

function BuscarDisco(){
  let html = "";
  let codigo = parseInt(prompt("Ingrese en codigo del Disco"));

  for(let i of coleccionDiscos.getDisco){
    if(codigo == i.codigo){
      html+=`<div class="discos">`
      html+=`<p>Disco: ${i.nombreDisco}   Autor: ${i.autor}   Num disco: ${i.codigo}</p>`
      html+=`<ul>`
    
    for(let j of i.getPistas){
      html+=`<li style = "color: ${j.getDuracion > 180 ? "red" : "white"}">Pista: ${j.getPista}  Duracion: ${j.getDuracion}</li>`
    }
      html+=`</ul>`
      html+=`</div>`
    }
  } 
    document.getElementById("info").innerHTML = html; 
}