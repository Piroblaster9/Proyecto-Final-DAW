document.addEventListener('DOMContentLoaded', function () {
    const infoBtn = document.querySelector('.boton-info');
    const popupContent = document.querySelector('.popup-content'); 
    const closeBtn = document.getElementById('closeBtn');
  
    infoBtn.addEventListener('click', function (event) {
      event.preventDefault(); 
      popupContent.style.display = 'flex';
    });
  
    closeBtn.addEventListener('click', function () {
      popupContent.style.display = 'none';
    });
  });
  