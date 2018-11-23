// primer nivel de prueba
var maxIntentos;
var intentos = 0;
var pares = 0;
var pepe = null;

$('button').on('click', function(){
  if ($("#name").val() == ""){
    var required = $('#required');
    required.removeClass("none");
    } else {
    $('.board').removeClass('hidden')
    $('.first').addClass('hidden')
    var name = $('#name').val();
    $('#repeatname').append(name);
    }
})

 $('#easy').on('click', function(){
   maxIntentos = 18;
  $('#totallifes').append(maxIntentos);
   var level = 'Fácil';
   $('#level').append(level);
   })
  
  $('#intermediate').on('click', function(){
    maxIntentos = 12;
    $('#totallifes').append(maxIntentos);
    var level = 'Intermedio';
    $('#level').append(level);
  })
  
  $('#hard').on('click', function(){
    maxIntentos = 9;
    $('#totallifes').append(maxIntentos);
    var level = 'Difícil';
    $('#level').append(level);
  })

// declara los elementos carta -> ver si aca asigno la imagen de fondo
var divContainer = $('#cardscontainer');
var cards = [
  {id: 1, dataid:"1", img: './img/alce.jpg'},
  {id: 2, dataid:"2", img: './img/epelante.jpg'},
  {id: 3, dataid:"3", img: './img/peces.jpg'},
  {id: 4, dataid:"4", img: './img/nena.jpg'},
  {id: 5, dataid:"5", img: './img/unichancho.jpg'},
  {id: 6, dataid:"6", img: './img/zapas.jpg'},
  {id: 1, dataid:"1", img: './img/alce.jpg'},
  {id: 2, dataid:"2", img: './img/epelante.jpg'},
  {id: 3, dataid:"3", img: './img/peces.jpg'},
  {id: 4, dataid:"4", img: './img/nena.jpg'},
  {id: 5, dataid:"5", img: './img/unichancho.jpg'},
  {id: 6, dataid:"6", img: './img/zapas.jpg'},
];

const desordenado = shuffle(cards)

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

$('img').on('click', function(e) {
  const imgId = e.target.id
  const id = $('#' + imgId).attr('data-id')
  $('#' + imgId).attr('src', desordenado[id - 1])
})

// generar el tablero
function setBoard(){
for ( i = 0; i < cards.length; i++) {
  let cardImg = cards[i].img;    
  var CardDiv = $('<div class="card"><span><img data-id="'+cards[i].dataid+'"id="'+cards[i].id+'" src="'+cards[i].img+'"></span></div>');
  $('.boardcard').append(CardDiv);
  } 
}



// contador de clicks de 0 a 2 para cada jugada
var clicks = 0;
var primerClick

function jugada(){ 
  // funcion seleccionar y comparar
  $(".card").on('click', function (){
     clicks = clicks + 1
     
     $(this).toggleClass('flipped');
     $(this).addClass('show');
      
      console.log(clicks, 'cantidad')
      if (pepe >= maxIntentos) {
        $('#finalModal').removeClass('hidden')
       }

      else if (clicks == 1 ) {
      // Primer click que guarda datos
        var id = $(this).children().children().attr('id')
        var dataId = $(this).children().children().attr('data-id')
        primerClick = {
          id: id,
          dataId: dataId
        }
        console.log(primerClick, id, dataId)
      } else {
          // Si no es el primer click ya puede comparar
          // si son iguales
          dataId = $(this).children().children().attr('data-id')
          
          if (primerClick.dataId == dataId ) {
              $('#' + primerClick.id).addClass('gray')  
              $(this).children().children().addClass('gray')
              console.log('son iguales', 'primer click es', primerClick.dataId, 'segundo click es', dataId)
              pepe++
              intentos++
              pares++
          } else {
              var that = this

              // si no son iguales son distintas
              setTimeout(function(){
              // se dan vuelta las cartas del primer click
              $('#'+ primerClick.id).parent().parent().removeClass('show flipped')
              // se dan vuelta las cartas del segundo click
              $(that).removeClass('show flipped') },2000)

              console.log('Segundo click Id es', dataId)
              console.log('entro a la funcion son distintas')
              pepe++
              intentos++
              }
          clicks = 0
        console.log(clicks, 'cantidad')
      }
      var lifes = $('<span id="lifes"><span>' + intentos + '</span></span>');
      $('#lifes').html(lifes);   
    })   
    
}


function ganaste(){
  if (pepe >= maxIntentos) {
    $('#finalModal').removeClass('hidden')
   }
   
}


$('#retry').on('click', function(){
  window.location.reload(true);
})






// function guardarJugador {

//   var obj = {
//       name: 'Juani',
//       level: 'Facil',
//       intentos: 100
//   }
  
//   var data = localStorage.getItem('winners') //null
  
//   if (data == null) {
//       data = []
//   }
//   data.push(obj)
  
//   localStorage.setItem('winners', JSON.stringify(data))
//   }



setBoard();
jugada();
ganaste();