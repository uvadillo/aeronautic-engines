//Este if se encarga de que cada vez que se acceda a la página web que tiene como
//src este js se encargue de mirar que exista un usuario loggeado, en caso de que no haya
//ningun usuario con acceso se redirige al index
userLog();
escuchadoresDeEventos();
function userLog(){
if (localStorage.getItem('usu') == null){
    alert("No hay ningun usuario loggeado");
    window.location.href = ('../index.html');
}else {


    document.getElementById('uName').innerHTML = "Hi, "+ localStorage.getItem('usu');
    escuchadoresDeEventos();

}
}
let ul = document.getElementById('menuList');
ul.innerHTML = "<li id='btnCal' class='active'><a href=#>Inicio</a></li><li id='btnUsu'><a  href='#' >Usuarios</a></li><li><a href='../index.html'>Cerrar sesion</a></li>";
escuchadoresDeEventos();


function escuchadoresDeEventos(){
    //Esta función se encarga de añadir dos eventListeners los cuales se encargan de
    //cambiar entre contenido de una misma pagina, asi nos ahorramos tener otro
    //html innecesario, tras ello lo que hacen es recargar el contenido de la
    //página.
    let a = document.getElementById('btnUsu');
    a.addEventListener("click", function (event){
            document.getElementById('check').click();
            let ul = document.getElementById('menuList');
            ul.innerHTML = "<li id='btnCal'><a href=#>Inicio</a></li><li id='btnUsu' class='active'><a href='#' >Usuarios</a></li><li><a href='../index.html'>Cerrar sesion</a></li>";
            document.getElementById('eventDescription').innerHTML = "";
            escuchadoresDeEventos();
            mostrarUsu();
        }
    );
    let b = document.getElementById('btnCal');

    b.addEventListener("click", function (event){
            document.getElementById('check').click();
            let ul = document.getElementById('menuList');
            ul.innerHTML = "<li id='btnCal' class='active'><a href=#>Inicio</a></li><li id='btnUsu'><a  href='#' >Usuarios</a></li><li><a href='../index.html'>Cerrar sesion</a></li>";
            escuchadoresDeEventos();
            mostrarEventos();
        }
    );

}




