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
    alltweets.addEventListener('click', eliminarTweet);
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        tweetsHTML();
    })
};
function agregarTweet(e){
    e.preventDefault();
    if(tweetElement.value === '') {
      const paragraph = document.createElement('p');
      const errorMessage = 'no se puede ingresar un calor vacío';
      paragraph.textContent = errorMessage;
      paragraph.style.color = 'red';
      paragraph.classList.add('error');
      tweetForm.append(paragraph);
      return;// el return lo usamos para que no se siga ejecutando el codigo en caso de que estemos en el error
    }else if ((tweetElement.value).length > 140){
        const paragraph = document.createElement('p');
      const errorMessage = 'no se puede ingresar un texto que supere los 140 caracteres';
      paragraph.textContent = errorMessage;
      paragraph.style.color = 'red';
      paragraph.classList.add('error');
      tweetForm.append(paragraph);
      return;
    };
    if(tweetForm.lastElementChild.classList.contains('error')){
        tweetForm.removeChild(tweetForm.lastElementChild);//-->este se usa para borrar el mensaje de error una vez que nos tiro el error y ponemos de manera correcta desaparece
    }
    const tweet = {
        content: tweetElement.value,
        id: Date.now().toString()
    }
    tweets.push(tweet);
    tweetsHTML();
    tweetForm.reset();
  };

function tweetsHTML(){
    limpiarHTML();
    tweets.forEach(tweet=>{
        const parrafo = document.createElement('p');
        parrafo.innerHTML= `
        <p>
            ${tweet.content}
        </p>
        <button>
        <a href = "#" class="borrar-tweet" data-id="${tweet.id}">X</a>
        </button>
        `;
        sincronizarStorage();
        allTweets.append(parrafo)
    });
};

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

function limpiarHTML(){
    while(allTweets.firstChild){
        allTweets.removeChild(allTweets.firstChild);
    }
    //se usa para limpiar el HTML para que los tweets no aparezcan duplicados, si no estariamos sobreiterando

}

function eliminarTweet(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar-tweet')){
        const tweetId = e.target.getAttribute('data-id');
        tweets = tweets.filter(tweet => tweet.id !== tweetId);
        tweetsHTML();
    }
}