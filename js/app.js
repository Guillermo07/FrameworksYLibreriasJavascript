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
})