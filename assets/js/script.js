//URL base para peticiones a la API
const baseUrl = 'https://api.github.com/users';

//función request hará las peticiones a la API y retorna el resultado
const request = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//Funcion getUser enviará los datos a la función request para obtener la información del usuario
const getUser = async (user) => {
    let url = `${baseUrl}/${user}`;
    return await request(url);
    //console.log(url);
}

//Funcion getRepo enviará los datos a la función request para obtener la información de 
//los repositorios a mostrar
const getRepo = async (user, page, numRepos) => {
    let url = `${baseUrl}/${user}/repos?page=${page}&per_page=${numRepos}`;
    return await request(url);
    //console.log(url);
}

//Manipulación del DOM para agregar los datos
let resultados = document.getElementById('resultados');
resultados.value = "";
let colInfoUser = document.createElement("div");
let colRepos = document.createElement("div");
let tituloInfoUser = document.createElement("h1");
let tituloRepos = document.createElement("h1");
let img = document.createElement("img");
let nombreUser = document.createElement("p");
let nombreLogin = document.createElement("p");
let cantRepos = document.createElement("p");
let localidad = document.createElement("p");
let tipoUsuario = document.createElement("p");
let ul = document.createElement("ul");
let li = document.createElement("li");
let a = document.createElement("a");
resultados.setAttribute("class", "row pb-2");
colInfoUser.setAttribute("class", "col-12 col-sm-6 text-left");
colRepos.setAttribute("class", "col-12 col-sm-6 text-right");

//2. Agregar una escucha (addEventListener) al formulario, que permita activar una
// función en donde se capturen los datos ingresados por el usuario de la página
// (nombre de usuario, número de página, repositorio por páginas).

let submit = document.querySelector('form');

const capturaDatos = async (e) => {   
    e.preventDefault(); 

    let userName = document.getElementById('nombre').value;
    let page = document.getElementById('pagina').value;
    let repoPage = document.getElementById('repoPagina').value;

/* 3. Mediante la implementación de una Promesa, realizar el llamado a las dos funciones
al mismo tiempo que permiten conectarse con la API y traer la información en el
caso de existir “getUser” y “getRepo”. Pasando como parámetros los valores
necesarios para cada llamado de la API según la URL. */

    await Promise.all([
        getUser(userName).then(user => {
            const userName = user.name;
            const login = user.login;
            const reposCant = user.public_repos;
            const location = user.location;
            const userType = user.type;
            const avatar = user.avatar_url;

            resultados.appendChild(colInfoUser);
            tituloInfoUser.innerHTML = "Datos del Usuario";
            colInfoUser.appendChild(tituloInfoUser);
            img.setAttribute("src", avatar);
            img.style.width = "12.5rem";
            colInfoUser.appendChild(img);
            nombreUser.innerHTML = `Nombre de usuario: ${userName}`;
            colInfoUser.appendChild(nombreUser);
            nombreLogin.innerHTML = `Nombre de login: ${login}`;
            colInfoUser.appendChild(nombreLogin);
            cantRepos.innerHTML = `Cantidad de Repositorios: ${reposCant}`;
            colInfoUser.appendChild(cantRepos);
            localidad.innerHTML = `Localidad: ${location}`;
            colInfoUser.appendChild(localidad);
            tipoUsuario.innerHTML = `Tipo de usuario: ${userType}`;
            colInfoUser.appendChild(tipoUsuario);
        }),
        getRepo(userName, page, repoPage).then(repos => {
            //console.log(getRepo);
            //console.log(getUser);
            resultados.appendChild(colRepos);
            tituloRepos.innerHTML = "Nombre de repositorios";
            colRepos.appendChild(tituloRepos);
            

            repos.forEach((element) =>{
                colRepos.appendChild(ul);
                ul.appendChild(li);                
                li.appendChild(a);
                a.innerHTML = `${element.name}`;
                a.setAttribute("href",`${element.url}`);
                a.setAttribute("target",'_blank');
                li.style.listStyle = "none";
            });
        })
    ])              
} 

submit.addEventListener('submit', capturaDatos);