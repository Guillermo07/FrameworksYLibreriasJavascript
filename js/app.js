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

// Evento para cambiar el texto dentro del boton reinicio

var clicks = false;

$(".btn-reinicio").click(function() {
    if (!clicks) {
        $(".btn-reinicio").text("Reiniciar");
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
            $('#timer').html(minutes + ':' + seconds);
            timer2 = minutes + ':' + seconds;
        }, 1000);
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
});

// Funcion drag &drop 
$(function() {
    $("[class^='col-']").sortable();
    $("[class^='col-']").disableSelection();
});
// Evento para caramelos aleatorios

$(document).ready(function() {
    tituloBlanco();

    var images = [
        "./image/1.png",
        "./image/2.png",
        "./image/3.png",
        "./image/4.png",
    ]
    var columnas = $(".panel-tablero div");

    for (var i = 0; i < columnas.length; i++) {
        for (var j = 0; j < 7; j++) {
            var img = Math.floor(Math.random() * (4 - 1 + 1));
            $(columnas[i]).append("<img src='" + images[img] +
                "' class='elemento' width='100px' height='100px'>");
        }
    }

});