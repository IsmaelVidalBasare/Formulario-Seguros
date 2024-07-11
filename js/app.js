//constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo; 
}
//prototype que realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
   /*
    1 = americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35   
   */ 

    let cantidad; 
    const base = 20000; 

    console.log(this.marca);
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3': 
            cantidad = base *1.35; 
            break;
        default: 
        break;
    }

    //leemos el año
    const diferencia = new Date().getFullYear() - this.year; 

    //el costo se reduce un 3% cada año 
    cantidad -= ((diferencia * 3) * cantidad) / 100; 

    /*
        Si el seguro es basico, se multiplica por un 30% mas
        SI el seguro es completo, se multiplica por un 50% mas
    */

        if(this.tipo === 'basico'){
            cantidad += 1.30; 
        } else  {
            cantidad += 1.50;
        }     
        return cantidad; 
}

function UI() {}

//prototype con el que llenamos las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 25;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i; 
        option.textContent = i; 
        selectYear.appendChild(option);
    }
}

//prototype con el que mostramos las alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error'); 
    }else {
        div.classList.add('correcto'); 
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje; 

    //Insertar en el HTML 
    const formulario = document.querySelector('#cotizar-seguro'); 
    formulario.insertBefore(div, document.querySelector('#resultado')); 

    setTimeout(() => {
        div.remove(); 
    }, 3000);

}

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro; 

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;

        default:
            break; 
    }

    //creamos el resultado
    const div = document.createElement('div')
    div.classList.add('mt-10'); 

    div.innerHTML = `
        <p class="header">Resumen de tu seguro</p>
        <p class="font-bold">Tipo marca: <span class="font-normal"> ${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total}.- Pesos </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado'); 

    //Mostramos el spinner en pantalla
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //se borra el spinner despues de 3 seg
        resultadoDiv.appendChild(div); //se muestra el resultado despues de 3 seg
    }, 3000); 
}


//instanciamos UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //llena el select con los años ...
})

eventListener()
function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro'); 
    formulario.addEventListener('submit', cotizarSeguro); 
}

function cotizarSeguro(e) {
    e.preventDefault(); 

    //lee la marca seleccionada
    const marca = document.querySelector('#marca').value; 

    //lee el año seleccionado
    const year = document.querySelector('#year').value;

    //lee el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo); 

    if(marca === '' || year === '' || tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return; 
    } 
        ui.mostrarMensaje('Cotizando...', 'exito');

    //ocultamos las cotizaciones previas 
    const resultados = document.querySelector('#resultado div');
    if(resultados != null ){
        resultados.remove(); 
    }


    //Instanciamos el seguro
    const seguro = new Seguro(marca, year, tipo); 
    const total = seguro.cotizarSeguro();

    //utilizamos el prototype que va a cotizar
    ui.mostrarResultado(total, seguro); 

}