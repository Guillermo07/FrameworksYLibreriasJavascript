function inicioJuego() {}
// Animacion del Titulo

function tituloAmarillo() {
    $(".main-titulo").animate({
            color: "#DCFF0E"
        }, 600,
        function() {
            tituloBlanco();
        });
}

function tituloBlanco() {
    $(".main-titulo").animate({
            color: "#FFFFFF"
        }, 250,
        function() {
            tituloAmarillo();
        });
}

$(document).ready(function() {
    tituloBlanco();
    ordenarCaramelos();
});

// Evento para cambiar el texto dentro del boton reinicio

var clicks = false;

$(".btn-reinicio").click(function() {
    if (!clicks) {
        $(".btn-reinicio").text("Reiniciar")
    } else {
        $(".btn-reinicio").text("Iniciar")
    }
    clicks = !clicks;
})

// Evento para cuando se cambie la posicion de un dulce contar los movimientos

var i = 0;

$(".btn-reinicio").click(function() {
    i++;

    document.getElementById("movimientos-text").innerHTML = i;
})

// 
function ordenarCaramelos() {
    $('.col-1').each(function(item) {
        item.setStyle({ order: makeUniqueRandom() })
    })
}
var uniqueRandoms = [i];
var numRandoms = 7;

function makeUniqueRandom() {
    // refill the array if needed
    for (var i = 0; i < numRandoms; i++) {
        var index = Math.floor(Math.random() * 7)(+1);
        var val = uniqueRandoms[index];
    }


    // // now remove that value from the array
    // uniqueRandoms.splice(index, 1);

    return val;

}
// 

var timer2 = "2:00";
var interval = setInterval(function timer1() {


    var timer = timer2.split(':');
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    if (minutes < 0) clearInterval(interval);
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $('.countdown').html(minutes + ':' + seconds);
    timer2 = minutes + ':' + seconds;
}, 1000);