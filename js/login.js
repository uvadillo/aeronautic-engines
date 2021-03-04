// Zona de creación de objetos de prueba
// Usuario admin que siempre exista para loggear

var admin = {nm: 'admin', pw: 'Jm12345'};

var arrayU = JSON.parse(localStorage.getItem('arrayU'));

var arrayE = JSON.parse(localStorage.getItem('arrayE'));




function crearDatos() {

    let tf = document.getElementById('pw');
    tf.addEventListener("keyup", function (event) {
//Nuevo metodo no he conseguido que funcione
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('login').click();
            escuchadoresDeEventos();
        }

    });

    //Eliminación de variable en local storage para saber si hay algun usuario loggeado
    localStorage.removeItem('usu');

    //Array de eventos y usuarios con su correspondiente push a local storage




    if (arrayU == null) {
        arrayU = [];
        arrayU.push(admin);
        localStorage.setItem('arrayU', JSON.stringify(arrayU));
    }

    if (arrayE == null) {
        arrayE = []
        localStorage.setItem('arrayE', JSON.stringify(arrayE));
    }

}


//Esta funcion de aqui sirve para que una vez que estemos en el field de pass
//al hacer enter se haga click el boton de login



//----------------------------------------------------------

function registro() {
    // Creación de un objeto Usuario con los elementos del HTML
    let us = {nm: document.getElementById('nm').value.toLowerCase(), pw: document.getElementById('pw').value};
    if (us.nm === "" || us.pw === "") {
        alert("El usuario/contraseña no puede estar vacio");
        document.getElementById('nm').value = "";
        document.getElementById('pw').value = "";

    } else {
        let cadena = /^[A-Z]+$/i;
        let contraRG = /^[A-Za-z0-9\s]+$/g;

        if(document.getElementById('nm').value.match(cadena)) {
            if (document.getElementById('pw').value.match(contraRG)){
            let arrayUsuario = JSON.parse(localStorage.getItem('arrayU'));
            let u = arrayUsuario.find(u => u.nm == document.getElementById('nm').value.toLowerCase())
            //Comprobación de que la busqueda no haya encontrado ya a ese usuario y permita
            //registrarlo
            if (u == undefined) {
                arrayUsuario.push(us);
                alert("El usuario ha sido registrado")
                localStorage.setItem('arrayU', JSON.stringify(arrayUsuario));

                document.getElementById('nm').value = "";
                document.getElementById('pw').value = "";
                mostrarUsu();

            } else
                alert("Error, ese usuario ya existe");
                document.getElementById('nm').value = "";
                document.getElementById('pw').value = "";

        }
            else {
                alert('La contraseña solo puede contener numeros o letras');
                document.getElementById('nm').value = "";
                document.getElementById('pw').value = "";
            }
        }else{
            alert('El usuario solo puede contener letras');
            document.getElementById('nm').value = "";
            document.getElementById('pw').value = "";
        }

        localStorage.setItem('arrayU', JSON.stringify(arrayUsuario));
        //Actualización del listado de usuarios
        mostrarUsu();

    }


}

function comprobar() {
    //Este metodo se encarga de comprobar de que el usuario loggeado existe y de
    // la variable del nombre de usuario para saber que está loggeado
    let arrayU = JSON.parse(localStorage.getItem('arrayU'));

    var nmUsu = document.getElementById('nm').value.toLowerCase();
    var pwUsu = document.getElementById('pw').value;
    let u = arrayU.find(u => u.nm == nmUsu && u.pw == pwUsu)
    if (u === undefined) {
        alert('Usuario y/o contraseña incorrecto');
    } else {
        document.getElementById('nm').value = "";
        document.getElementById('pw').value = "";
        localStorage.setItem('usu', nmUsu);

        window.location.href = ('html/home.html');
    }
}


function addEvent() {
    //Función que se encarga de añadir eventos y comprobar que no existan
    let arrayE = JSON.parse(localStorage.getItem('arrayE'));

    if (document.getElementById('datePicker').value === "" || document.getElementById('addEventName').value === "") {
        alert("No se puede dejar vacio el titulo ni la fecha.")
    } else {
            //Constructor de Eventos
        let ev = {
            fecha: document.getElementById('datePicker').value,
            cita: document.getElementById('addEventName').value,
            dc: document.getElementById('addEventDescription').value,
            us: localStorage.getItem('usu')
        }

        let w = arrayE.find(e => e.fecha == document.getElementById('datePicker').value && e.cita == document.getElementById('addEventName').value);

        if (w == undefined) {
            arrayE.push(ev);
            document.getElementById('addEventName').value = "";
            document.getElementById('addEventDescription').value = "";

        } else
            alert('Ese evento ya existe en este dia')


        localStorage.setItem('arrayE', JSON.stringify(arrayE));
        mostrarEventos();
    }
}

function mostrarUsu() {
    //Este metodo se encarga de coger todos los usuarios que esten cargados en esa
    //sesión y de mostrarlos por pantalla añadiendo un elemento HTML
    let divU = document.getElementById('boxForm');

    divU.innerHTML = "<div id='addUser'> <p class='title'>A&ntilde;adir usuario</p><input type='text' id='nm' placeholder='Nombre de usuario'><input type='password' id='pw' placeholder='Contrase&ntilde;a'><input type='button' id='btnAddUsu' value='A&ntilde;adir' onclick='registro()'></div>"


    let div = document.getElementById('eventInfo');
    let primero = "<div id='eventHistory'><p class='userName'>Usuario</p><p class='userOp'>Opciones</p></div>"

    let arrayU = JSON.parse(localStorage.getItem('arrayU'));

    //Funcion para ordenar el array alfabeticamente
    arrayU.sort(function(a, b){
        if(a.nm < b.nm) { return -1; }
        if(a.nm > b.nm) { return 1; }
        return 0;
    })


    let forma = "";
    for (x = 0; x < arrayU.length; x++) {
        forma = forma + "<div class='event'><p class='userName'>" + arrayU[x].nm + "</p> <button id='" + x + "' class='fas fa-trash-alt'  onclick='eliminarUsu(this.id)'></div>"

    }

    div.innerHTML = primero + forma;
    localStorage.setItem('arrayU', JSON.stringify(arrayU));




}

function mostrarEventos() {
    //Esta funcion se encarga de listar todos los eventos cargados en localstorage
    //y de mostrarlos por pantalla

    let divE = document.getElementById('boxForm');
    divE.innerHTML = "<div id='addEvent'> <p class='title'>A&ntilde;adir aviso</p><input type='date' name='date' id='datePicker'><input type='text' name='eventName' id='addEventName' placeholder='Nombre del aviso'> <textarea type='text' placeholder='Añade una descripcion al aviso' name='descripcion' id='addEventDescription'></textarea><input type='button' value='Añadir' id='addButton' onclick='addEvent()'></div> <div id='eventDescription'><textarea name='eventDescription' id='textDescription' readonly>Aqui aparecera la descripcion del evento...</textarea></div>"


    let div = document.getElementById('eventInfo');

    let primero = "<div id='eventHistory'><p class='eventDate'>Fecha</p><p class='eventUs'>Usuario</p><p class='eventName'>Aviso</p><p class='eventDesc'>Descripcion</p><p class='eventOp'>Opciones</p></div>"

    let arrayE = JSON.parse(localStorage.getItem('arrayE'));


    arrayE.sort(function (a, b) {
        var fecha1 = new Date(a.fecha), fecha2 = new Date(b.fecha)
        return fecha1 - fecha2 //sort by date ascending
    });

    let forma = "";
    for (x = 0; x < arrayE.length; x++) {




        forma = forma + "<div class='event'><p class='eventDate'>" + arrayE[x].fecha + "</p><p class='eventUser'>" + arrayE[x].us + "</p> <p class='eventName'>" + arrayE[x].cita + "</p><button class='fas fa-eye' id='"+x+"' onclick='mostrarDescripcion(this.id)'></button><button  class='fas fa-trash-alt' id='" + x + "'  onclick='eliminarEve(this.id)'></div>"
        //<input type='button' value='Mostrar descripcion del evento' id='"+x+"' onclick='mostrarDescripcion(this.id)'>

    }
    div.innerHTML = "";
    div.innerHTML = primero + forma;


    localStorage.setItem('arrayE', JSON.stringify(arrayE));

}

//Estos dos siguientes elementos se encargan de eliminar usuarios y eventos
//cada vez que un evento/usuario es añadido se usa su posición en el array para asignarles
//el id, de esta manera llamando a la funcion pasandole el id podemos eliminar el usuario
// del array.
function eliminarUsu(id) {
    let arrayU = JSON.parse(localStorage.getItem('arrayU'));
    //Esta condición se encarga de comprobar de que el usuario que se elimina no sea el que esta logueado, en caso de
    //que sea, se deslogueara
    if(arrayU[id].nm === "admin"){
        alert("El administrador no puede ser eliminado")
    }else{
    if(arrayU[id].nm === localStorage.getItem('usu')){
        localStorage.removeItem('usu');
        arrayU.splice(id, 1);
        localStorage.setItem('arrayU', JSON.stringify(arrayU));
        alert("El usuario con el que estabas loggeado ha sido eliminado")
        userLog();
    }else
        arrayU.splice(id, 1);
    }

    localStorage.setItem('arrayU', JSON.stringify(arrayU));
    mostrarUsu();


}

function eliminarEve(id) {
    let arrayE = JSON.parse(localStorage.getItem('arrayE'));
    arrayE.splice(id, 1);
    localStorage.setItem('arrayE', JSON.stringify(arrayE));
    mostrarEventos();

}

//-------------------------------------------------------------------------------------
//Esta funcion se encarga de mostrar en un alert/innerHTML la descripción de cualquier
//evento, al igual que para borrar se trabaja con el id del evento como posicion de array
function mostrarDescripcion(id) {
    let arrayE = JSON.parse(localStorage.getItem('arrayE'));
    let desc =arrayE[id].dc;
    localStorage.setItem('arrayE', JSON.stringify(arrayE));
    let e = document.getElementById('textDescription');
    e.innerHTML = desc;
}



