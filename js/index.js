var maxIntentos;
var intentos = 0;
var pares = 0;

$('button').on('click', function(){
  if ($("#name").val() == ""){
    var required = $('#required');
    required.removeClass("hidden");
    } else {
    $('.board').removeClass('hidden')
    $('.first').addClass('hidden')
    var name = $('#name').val();
    $('#required').append(name);
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

var divContainer = $('#cardscontainer');
var cards = [
  {id: 1, dataid:"1", img: './img/alce.jpg'},
  {id: 2, dataid:"2", img: './img/epelante.jpg'},
  {id: 3, dataid:"3", img: './img/peces.jpg'},
  {id: 4, dataid:"4", img: './img/nena.jpg'},
  {id: 5, dataid:"5", img: './img/unichancho.jpg'},
  {id: 6, dataid:"6", img: './img/zapas.jpg'},
  {id: 7, dataid:"1", img: './img/alce.jpg'},
  {id: 8, dataid:"2", img: './img/epelante.jpg'},
  {id: 9, dataid:"3", img: './img/peces.jpg'},
  {id: 10, dataid:"4", img: './img/nena.jpg'},
  {id: 11, dataid:"5", img: './img/unichancho.jpg'},
  {id: 12, dataid:"6", img: './img/zapas.jpg'},
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
      
      if (intentos >= maxIntentos) {
        $('#finalModal').removeClass('hidden')
        $('#gameover').removeClass('hidden')
        var lost = $('<span id="loser">' + intentos + '</span>');
        $('#loser').html(lost);
      } else if (clicks == 1 ) {
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
              pares++
              if (pares == 6){
                $('#finalModal').removeClass('hidden')
                $('#winner').removeClass('hidden')
                var win = $('<span id="win">' + intentos + '</span>');
                $('#win').html(win);
                guardarJugador();
                armarRanking();
              }
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
              intentos++
              }
          clicks = 0
        console.log(clicks, 'cantidad')
      }
      var lifes = $('<span id="lifes">' + intentos + '</span>');
      $('#lifes').html(lifes);   
    })   
}

$('.close').on('click', function(){
  $('#finalModal').addClass('hidden')
  $('#gameover').addClass('hidden')
  $('#winner').addClass('hidden')
})

$('.retry').on('click', function(){
  window.location.reload(true);
})

 function guardarJugador() {

    var winners = [];
    var jugador = {
        name: $("#name").val(),
        level: $("#level").html(),
        intentos: $("#win").html()
    }
    var data = localStorage.getItem('winners') //null
    if (data == null) {
        data = []
    } else {
      data = JSON.parse(data)
      }

    console.log(data, typeof data)
    data.push(jugador);
    
    localStorage.setItem('winners', JSON.stringify(data))
}

function armarTabla() {
  var tablaJugadores = $('<table id="tablaRanking"></table>')
  var cabecera = '<th>Nombre</th><th>Nivel</th><th>Intentos</th>'
  tablaJugadores.append(cabecera)
  var container = $('.scores');
  container.append(tablaJugadores);
}

 function armarRanking() {
  var infoPlayer = JSON.parse(localStorage.getItem('winners'));
  var tablaJugadores = $('#tablaRanking');
  for (var i = 0; i < infoPlayer.length; i++) {
    var namedata = "<td>" + infoPlayer[i].name + "</td>";
    var leveldata = "<td>" + infoPlayer[i].level + "</td>";
    var lifesdata = "<td>" + infoPlayer[i].intentos + "</td>";

    var fila = $('<tr class="fila"></tr>');
    fila.append(namedata);
    fila.append(leveldata);
    fila.append(lifesdata);
    
    tablaJugadores.append(fila);
  }
}  
 
setBoard();
jugada();
armarTabla()
