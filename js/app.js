const enviarTweet = document.querySelector('#agregar');
const tweetForm = document.querySelector('#formulario');
const allTweets = document.querySelector('#lista-tweets');
const tweetElement = document.querySelector('#tweet')
let tweets = [];

//eventos 
//1-escribir tweet y validar (por tweet vacio y por caracteres)
//2-enviar tweet
//3-mostrat tweet en columna del costado
// cargarListeners();
// function cargarListeners(){
//     listaCursos.addEventListener('click', agregarCurso);
//     carrito.addEventListener('click', eliminarCurso);
//     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
//     document.addEventListener('DOMContentLoaded', ()=>{
//             articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
//             carritoHTML();
//     })
// }
cargarListeners();
function cargarListeners(){
    tweetForm.addEventListener('submit', agregarTweet);
    tweets.addEventListener('click', eliminarTweet);



};
function agregarTweet(e){
    e.preventDefault();
    if(tweetElement.value === '') {
      alert('tweet vacio');
      return;
    }else if ((tweetElement.value).length > 140){
        alert('tweet con mas de 140 caracteres');
        return;
    }
    tweets.push(tweetElement.value);
    tweetsHTML();
    tweetForm.reset();
  };

function tweetsHTML(){
    //vaciarCarrito();
    tweets.forEach(tweet=>{
        const parrafo = document.createElement('p');
        parrafo.innerHTML= `
        <p>
            ${tweet}
        </p>
        <button>
            <a href = "#" class="borrar-tweet" data-id="">X</a>
        </button>
        `;
        //sincronizarStorage();
        allTweets.append(parrafo)
    });
};

// function eliminarTweet(e){
//     e.preventDefault()
//     if(e.target.classList.contains('borrar-tweet')){
//         const cursoId = e.target.getAttribute('data-id');
//         tweets = tweets.filter(tweet => tweet.id !== tweetId);
//         tweetsHTML();
//     }
// }