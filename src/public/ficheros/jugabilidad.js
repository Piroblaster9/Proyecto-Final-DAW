
const chatContainer2 = document.querySelector(".chat");

const confirmarBtn = document.getElementById('confirmar');

// Función para hacer scroll hacia abajo automáticamente
function scrollDown() {
  chatContainer2.scrollTop = chatContainer2.scrollHeight;
}

// Función para agregar un mensaje al chat con animación de desaparecer
function agregarMensajeAlChat(mensaje) {
  setTimeout(function () {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble', 'theirs', 'fade-in');
    bubble.innerText = mensaje;

    chatContainer2.appendChild(bubble);

    scrollDown();
  }, 1000);
}

const personajesContainer = document.getElementById('personajes-container');

//const columnas2 = personajesContainer.getElementsByClassName('columna');
const columnas2 = document.querySelectorAll('#personajes-container .columna:not(.hide)');

// Crea un array para almacenar los personajes con todos sus campos
const personajesData = [];

// Recorre los elementos y accede a los datos de cada personaje
for (let i = 0; i < columnas2.length; i++) {
  const columna = columnas2[i];

  // Obtiene los atributos de datos del personaje actual
  const nombre = columna.dataset.nombre;
  const genero = columna.dataset.genero;
  const cabello = columna.dataset.cabello;
  const posicion = columna.dataset.posicion;
  const raza = columna.dataset.raza;
  const recurso = columna.dataset.recurso;
  const rango = columna.dataset.rango;
  const region = columna.dataset.region;
  const ano = columna.dataset.ano;
  const imagen = columna.dataset.imagen;

  // Crea un objeto para almacenar los campos del personaje actual
  const personaje = {
    nombre: nombre,
    genero: genero,
    cabello: cabello,
    posicion: posicion,
    raza: raza,
    recurso: recurso,
    rango: rango,
    region: region,
    ano: ano,
    imagen: imagen
  };

  // Agrega el objeto del personaje al array
  personajesData.push(personaje);
}

// Selecciona un personaje ganador aleatoriamente
const indiceGanador = Math.floor(Math.random() * personajesData.length);
const personajeGanador = personajesData[indiceGanador];

// Muestra el personaje ganador por consola
console.log('Personaje ganador:');
console.log(personajeGanador);

function mostrarPantallaVictoria(personaje) {
  setTimeout(() => {
    // Eliminar media queries
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.media && styleSheet.media.mediaText) {
        if (
          styleSheet.media.mediaText.includes('(min-width: 1100px)') ||
          styleSheet.media.mediaText.includes('(max-width: 600px)')
        ) {
          styleSheet.disabled = true;
        }
      }
    }

    //confeti
    start();
    stop();


    // Desactivar todos los selects y cambiar su color
    var selectContainer = document.getElementById('select-container');
    var selects = selectContainer.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = true;
      selects[i].style.backgroundColor = '#383838';
    }

    // Clona el botón para eliminar todos los eventos asociados
    const nuevoConfirmarBtn = confirmarBtn.cloneNode(true);
    nuevoConfirmarBtn.textContent = 'JUGAR DE NUEVO';

    // Reemplaza el botón existente con el nuevo clonado
    confirmarBtn.parentNode.replaceChild(nuevoConfirmarBtn, confirmarBtn);

    nuevoConfirmarBtn.addEventListener('click', function () {
      location.reload(); // Recarga la página
    });

    // Anular las propiedades de las media queries
    const contenidoElements = document.getElementsByClassName('contenido');
    for (let i = 0; i < contenidoElements.length; i++) {
      const contenidoElement = contenidoElements[i];
      contenidoElement.style.removeProperty('grid-template-columns');
      contenidoElement.style.display = 'unset';
    }

    const columnaElements = document.getElementsByClassName('columna');
    for (let i = 0; i < columnaElements.length; i++) {
      const columnaElement = columnaElements[i];
      columnaElement.style.marginTop = 'unset';
    }

    const personajesContainer = document.getElementById('personajes-container');
    personajesContainer.classList.add('victoria-derrota');

    // Elimina los personajes visibles junto con sus nombres
    const personajesVisibles = personajesContainer.getElementsByClassName('columna');
    while (personajesVisibles.length > 0) {
      personajesContainer.removeChild(personajesVisibles[0]);
    }

    // Crea el contenedor de la pantalla de victoria
    const victoriaContainer = document.createElement('div');
    victoriaContainer.id = 'victoria-container';

    const imagenGanador = document.createElement('img');
    imagenGanador.src = personaje.querySelector('img').src;
    victoriaContainer.appendChild(imagenGanador);

    const tituloVictoria = document.createElement('h1');
    tituloVictoria.innerText = 'HAS GANADO';
    tituloVictoria.classList.add('titulo-victoria');
    victoriaContainer.insertBefore(tituloVictoria, imagenGanador);

    const subtituloVictoria = document.createElement('h3');
    subtituloVictoria.innerText = 'EL PERSONAJE ERA';
    victoriaContainer.insertBefore(subtituloVictoria, imagenGanador);

    // Crea un div para mostrar los datos del personaje ganador
    const datosGanador = document.createElement('div');
    datosGanador.classList.add('datos-ganador');

    // Crea un span para cada atributo y valor del personaje ganador
    const atributos = [
      { atributo: 'Nombre', valor: personaje.getAttribute('data-nombre') },
      { atributo: 'Género', valor: personaje.getAttribute('data-genero') },
      { atributo: 'Cabello', valor: personaje.getAttribute('data-cabello') },
      { atributo: 'Posición', valor: personaje.getAttribute('data-posicion') },
      { atributo: 'Raza', valor: personaje.getAttribute('data-raza') },
      { atributo: 'Recurso', valor: personaje.getAttribute('data-recurso') },
      { atributo: 'Rango', valor: personaje.getAttribute('data-rango') },
      { atributo: 'Región', valor: personaje.getAttribute('data-region') },
      { atributo: 'Año', valor: personaje.getAttribute('data-ano') },
    ];

    atributos.forEach((atributo) => {
      const spanAtributo = document.createElement('span');
      spanAtributo.classList.add('atributo');
      spanAtributo.innerText = `${atributo.atributo}: `;

      const spanValor = document.createElement('span');
      spanValor.classList.add('valor');

      if (atributo.atributo === 'Cabello') {
        if (atributo.valor === '0') {
          spanValor.innerText = 'No';
        } else if (atributo.valor === '1') {
          spanValor.innerText = 'Si';
        } else {
          spanValor.innerText = atributo.valor;
        }
      } else {
        spanValor.innerText = atributo.valor;
      }

      datosGanador.appendChild(spanAtributo);
      datosGanador.appendChild(spanValor);
      datosGanador.appendChild(document.createElement('br'));
    });

    const imagenNiceTry = document.createElement('img');
    imagenNiceTry.src = '/imagenes/Nice_Try_Emote.webp';
    datosGanador.appendChild(imagenNiceTry);
    imagenNiceTry.style.maxWidth = '20vh';

    tituloVictoria.classList.add('titulo-victoria-verde');

    victoriaContainer.appendChild(datosGanador);
    personajesContainer.appendChild(victoriaContainer);
  }, 1000);
}

function mostrarPantallaDerrota(personaje) {
  setTimeout(() => {
    // Eliminar media queries
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.media && styleSheet.media.mediaText) {
        if (
          styleSheet.media.mediaText.includes('(min-width: 1100px)') ||
          styleSheet.media.mediaText.includes('(max-width: 600px)')
        ) {
          styleSheet.disabled = true;
        }
      }
    }

    // Desactivar todos los selects y cambiar su color
    var selectContainer = document.getElementById('select-container');
    var selects = selectContainer.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = true;
      selects[i].style.backgroundColor = '#383838';
    }

    // Clona el botón para eliminar todos los eventos asociados
    const nuevoConfirmarBtn = confirmarBtn.cloneNode(true);
    nuevoConfirmarBtn.textContent = 'JUGAR DE NUEVO';

    // Reemplaza el botón existente con el nuevo clonado
    confirmarBtn.parentNode.replaceChild(nuevoConfirmarBtn, confirmarBtn);

    nuevoConfirmarBtn.addEventListener('click', function () {
      location.reload();
    });

    // Anular las propiedades de las media queries
    const contenidoElements = document.getElementsByClassName('contenido');
    for (let i = 0; i < contenidoElements.length; i++) {
      const contenidoElement = contenidoElements[i];
      contenidoElement.style.removeProperty('grid-template-columns');
      contenidoElement.style.display = 'unset';
    }

    const columnaElements = document.getElementsByClassName('columna');
    for (let i = 0; i < columnaElements.length; i++) {
      const columnaElement = columnaElements[i];
      columnaElement.style.marginTop = 'unset';
    }

    const personajesContainer = document.getElementById('personajes-container');
    personajesContainer.classList.add('victoria-derrota');

    // Elimina los personajes visibles junto con sus nombres
    const personajesVisibles = personajesContainer.getElementsByClassName('columna');
    while (personajesVisibles.length > 0) {
      personajesContainer.removeChild(personajesVisibles[0]);
    }

    // Crea el contenedor de la pantalla de derrota
    const derrotaContainer = document.createElement('div');
    derrotaContainer.id = 'derrota-container';

    const imagenDerrota = document.createElement('img');
    imagenDerrota.src = personaje.imagen;
    derrotaContainer.appendChild(imagenDerrota);

    const tituloDerrota = document.createElement('h1');
    tituloDerrota.innerText = 'HAS PERDIDO';
    tituloDerrota.classList.add('titulo-derrota');
    derrotaContainer.insertBefore(tituloDerrota, imagenDerrota);

    const subtituloDerrota = document.createElement('h3');
    subtituloDerrota.innerText = 'EL PERSONAJE ERA';
    derrotaContainer.insertBefore(subtituloDerrota, imagenDerrota);

    // Crea un div para mostrar los datos del personaje ganador
    const datosGanador = document.createElement('div');
    datosGanador.classList.add('datos-ganador');

    // Crea un span para cada atributo y valor del personaje ganador
    const atributos = [
      { atributo: 'Nombre', valor: personaje.nombre },
      { atributo: 'Género', valor: personaje.genero },
      { atributo: 'Cabello', valor: personaje.cabello },
      { atributo: 'Posición', valor: personaje.posicion },
      { atributo: 'Raza', valor: personaje.raza },
      { atributo: 'Recurso', valor: personaje.recurso },
      { atributo: 'Rango', valor: personaje.rango },
      { atributo: 'Región', valor: personaje.region },
      { atributo: 'Año', valor: personaje.ano },
    ];

    atributos.forEach((atributo) => {
      const spanAtributo = document.createElement('span');
      spanAtributo.classList.add('atributo');
      spanAtributo.innerText = `${atributo.atributo}: `;

      const spanValor = document.createElement('span');
      spanValor.classList.add('valor');

      if (atributo.atributo === 'Cabello') {
        if (atributo.valor === '0') {
          spanValor.innerText = 'No';
        } else if (atributo.valor === '1') {
          spanValor.innerText = 'Si';
        } else {
          spanValor.innerText = atributo.valor;
        }
      } else {
        spanValor.innerText = atributo.valor;
      }

      datosGanador.appendChild(spanAtributo);
      datosGanador.appendChild(spanValor);
      datosGanador.appendChild(document.createElement('br'));
    });

    const imagenNiceTry = document.createElement('img');
    imagenNiceTry.src = '/imagenes/Despair_Emote.webp';
    datosGanador.appendChild(imagenNiceTry);
    imagenNiceTry.style.maxWidth = '20vh';

    tituloDerrota.classList.add('titulo-derrota-rojo');

    derrotaContainer.appendChild(datosGanador);
    personajesContainer.appendChild(derrotaContainer);
  }, 1000);
}


confirmarBtn.addEventListener('click', function () {
  const selectElements = document.querySelectorAll('#select-container select');

  let selectId = null;
  let selectValue = null;
  let selectText = null;

  selectElements.forEach(function (selectElement) {
    // Obtiene el valor seleccionado del elemento <select>
    const selectedOption = selectElement.value;

    // Verifica si el valor seleccionado no es ""
    if (selectedOption !== "") {
      // Guarda el ID del select y el valor seleccionado
      selectId = selectElement.id;
      selectValue = selectedOption;
      selectText = selectElement.options[selectElement.selectedIndex].text.replace(/¿|\?/g, '');
      selectText = selectText.charAt(0).toLowerCase() + selectText.slice(1);
    }
  });

  function comprobarIntervaloAno(intervaloAno, anoGanador) {
    const [anoInicio, anoFin] = intervaloAno.split('-');
    const ganador = parseInt(anoGanador);
    const inicio = parseInt(anoInicio);
    const fin = parseInt(anoFin);

    return ganador >= inicio && ganador <= fin;
  }

  const intentosRestantesElement = document.getElementById('intentos-restantes');

  let intentosRestantes = parseInt(intentosRestantesElement.textContent);

  function aplicarClaseHide(personajes, atributo, respuesta, columnas) {
    setTimeout(function () {
      for (var i = 0; i < personajes.length; i++) {
        if (personajes[i].hasAttribute('data-' + atributo)) {
          var valorAtributo = personajes[i].getAttribute('data-' + atributo);

          if (respuesta) {
            if (atributo === 'ano') {
              if (!comprobarIntervaloAno(selectValue, valorAtributo)) {
                columnas[i].classList.add('hide');
              }
            } else {
              if (valorAtributo !== personajeGanador[atributo]) {
                columnas[i].classList.add('hide');
              }
            }
          } else {
            if (atributo === 'ano') {
              if (comprobarIntervaloAno(selectValue, valorAtributo)) {
                columnas[i].classList.add('hide');
              }
            } else {
              if (valorAtributo === selectValue) {
                columnas[i].classList.add('hide');
              }
            }
          }
        }
      }

      // Verificar si solo queda un personaje visible
      const personajesVisibles = document.querySelectorAll('#personajes-container .columna:not(.hide)');

      if (personajesVisibles.length === 1) {
        const personajeVisible = personajesVisibles[0];
        mostrarPantallaVictoria(personajeVisible);
      }

      if (respuesta == true || respuesta == false) {
        console.log(respuesta);
        // Disminuir los intentos restantes en 1 solo si es una pregunta
        intentosRestantes--;

        // Actualizar el texto del elemento
        intentosRestantesElement.textContent = intentosRestantes;

        if (intentosRestantes === 0) {
          if (personajesVisibles.length > 1) {
            mostrarPantallaDerrota(personajeGanador);
          } else {
            mostrarPantallaVictoria(personajeGanador);
          }
        }
      }
    }, 1000);
  }

  if (selectText != null) {
    // Compara el valor seleccionado con el personaje ganador y agrega mensajes al chat
    if (selectId === "ano") {
      var personajes = columnas2;
      var respuesta;
      var intervaloAno = selectValue;

      if (comprobarIntervaloAno(intervaloAno, personajeGanador['ano'])) {
        agregarMensajeAlChat('El personaje SÍ ' + selectText);
        respuesta = true;
      } else {
        agregarMensajeAlChat('El personaje NO ' + selectText);
        respuesta = false;
      }

      aplicarClaseHide(personajes, selectId, respuesta, columnas2);
    } else {
      var personajes = columnas2;
      var respuesta;

      if (selectValue === personajeGanador[selectId]) {
        agregarMensajeAlChat('El personaje SÍ ' + selectText);
        respuesta = true;
      } else {
        agregarMensajeAlChat('El personaje NO ' + selectText);
        respuesta = false;
      }

      aplicarClaseHide(personajes, selectId, respuesta, columnas2);
    }
  }
});
