

function activar_desactivar(select) {
  var selectValue = select.value;

  // Desactivar todos los selects y cambiar su color
  var selectContainer = document.getElementById('select-container');
  var selects = selectContainer.getElementsByTagName('select');
  for (var i = 0; i < selects.length; i++) {
    if (selects[i] !== select) {
      selects[i].disabled = true;
      selects[i].style.backgroundColor = '#383838';
    }
  }

  // Volver a activar los selects y restaurar su color si el valor seleccionado es el por defecto
  if (selectValue === '') {
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = false;
      selects[i].style.backgroundColor = '';
    }
  }

}


const chatContainer = document.querySelector(".chat");

// Función para hacer scroll hacia abajo automáticamente
function scrollDown() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}



var columnas = document.getElementsByClassName('columna');

// Variable booleana para controlar si ya se mostró el mensaje de error
var mensajeErrorMostrado = false;

// Función para mostrar los elementos de uno en uno
function mostrarElementos() {
  var delay = 200; // Retraso de 0.2 segundos

  // Desactivar todos los selects y cambiar su color
  var selectContainer = document.getElementById('select-container');
  var selects = selectContainer.getElementsByTagName('select');
  for (var i = 0; i < selects.length; i++) {
    selects[i].disabled = true;
    selects[i].style.backgroundColor = '#383838';
  }

  for (var i = 0; i < columnas.length; i++) {
    // Agrega la clase 'show' con un retraso incremental
    setTimeout(function (index) {
      columnas[index].classList.add('show');

      // Verifica si se han mostrado todos los personajes
      if (index === columnas.length - 1) {
        setTimeout(function () {
          // Agregar mensaje al div chat
          var chatContainer = document.querySelector('.chat-container');
          var chatDiv = chatContainer.querySelector('.chat');
          var mensaje = '¡Comienza el juego! ¡Haz la primera pregunta!';
          chatDiv.innerHTML += '<div class="bubble theirs fade-in">' + mensaje + '</div>';

          for (var i = 0; i < selects.length; i++) {
            selects[i].disabled = false;
            selects[i].style.backgroundColor = '';
          }

          const selectContainer = document.getElementById('select-container');

          selectContainer.addEventListener('mousedown', function (event) {
            const target = event.target;

            if (target.tagName === 'SELECT' && target.disabled) {

              // Agregar mensaje al div chat solo si no se ha mostrado previamente
              if (!mensajeErrorMostrado) {
                var chatContainer = document.querySelector('.chat-container');
                var chatDiv = chatContainer.querySelector('.chat');
                var mensaje = '¡Solo puedes hacer preguntas de una en una!';
                chatDiv.innerHTML += '<div class="bubble theirs fade-in">' + mensaje + '</div>';

                scrollDown();

                // Establecer la variable en true para evitar mostrar el mensaje nuevamente
                mensajeErrorMostrado = true;

              }
            }
          });

          var confirmarBtn = document.getElementById('confirmar');

          confirmarBtn.addEventListener('click', function () {
            // Reinicia la variable para permitir que se muestre el mensaje de error nuevamente
            mensajeErrorMostrado = false;

            var selectElements = document.querySelectorAll('#select-container select');

            // Variable para controlar si se encontró una pregunta seleccionada
            var preguntaSeleccionada = false;

            selectElements.forEach(function (selectElement) {
              // Obtiene el valor seleccionado del elemento <select>
              var selectedOption = selectElement.value;
              var selectedText = selectElement.options[selectElement.selectedIndex].text;

              // Verifica si el valor seleccionado no es ""
              if (selectedOption !== "") {
                // Agrega el texto seleccionado como mensaje al div de chat
                var chatContainer = document.querySelector('.chat-container');
                var chatDiv = chatContainer.querySelector('.chat');
                chatDiv.innerHTML += '<div class="bubble mine fade-in">' + selectedText + '</div>';

                scrollDown();

                preguntaSeleccionada = true;

              }
            });

            // Reiniciar los elementos <select> a su valor por defecto
            selectElements.forEach(function (selectElement) {
              selectElement.selectedIndex = 0;
              selectElement.disabled = false;
              selectElement.style.backgroundColor = '';

            });



            // Si no se encontró una pregunta seleccionada, muestra el mensaje de error solo si no se ha mostrado previamente
            if (!preguntaSeleccionada && !mensajeErrorMostrado) {
              var chatContainer = document.querySelector('.chat-container');
              var chatDiv = chatContainer.querySelector('.chat');
              chatDiv.innerHTML += '<div class="bubble theirs fade-in">' + '¡Necesitas seleccionar una pregunta primero!' + '</div>';

              scrollDown();

              // Establecer la variable en true para evitar mostrar el mensaje nuevamente
              mensajeErrorMostrado = true;
            }
          });

          scrollDown();
        }, 1000);
      }
    }, delay * (i + 1), i); // Ajusta el multiplicador para sincronizar el retraso
  }
}

// Llama a la función para mostrar los elementos después de 0.2 segundos
setTimeout(mostrarElementos, 200);

