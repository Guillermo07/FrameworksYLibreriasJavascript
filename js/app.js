$(document).ready(function() {
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

    // Evento para cambiar el texto dentro del boton reinicio e iniciar el juego

    var busquedaHorizontal = 0;
    var busquedaVertical = 0;
    var buscarNuevosDulces = 0;
    var lencolum = ["", "", "", "", "", "", ""];
    var lenrest = ["", "", "", "", "", "", ""];
    var maximo = 0;
    var matriz = 0;
    var intervalo = 0;
    var eliminar = 0;
    var nuevosDulces = 0;
    var i = 0;
    var contadorTotal = 0;
    var espera = 0;
    var score = 0;
    var movTotal = document.getElementById("#movimientos-text");
    var clicks = false;

    $(".btn-reinicio").click(function() {
        i = 0;
        score = 0;
        mov = 0;

        if (!clicks) {
            $(".btn-reinicio").text("Reiniciar");
            $(".panel-tablero").show();
            $("#score-text").html("0");
            $("#movimientos-text").html("0");
            $("#timer").html("");
            clearInterval(intervalo);
            clearInterval(eliminar);
            clearInterval(nuevosDulces);
            intervalo = setInterval(function() {
                desplazamiento()
            }, 100);
            $('.timer').startTimer(); //Plugin del temporizador
            clicks = !clicks;
        } else {
            location.reload();
        }
    })

    // Funcion para desplazar caramelos

    function desplazamiento() {
        i = i + 1
        var numero = 0;
        var imagen = 0;
        $(".elemento").draggable({ disabled: true });
        if (i < 8) {
            for (var j = 1; j < 8; j++) {
                if ($(".col-" + j).children("img:nth-child(" + i + ")").html() == null) {
                    numero = Math.floor(Math.random() * 4 + 1);
                    imagen = "image/" + numero + ".png";
                    $(".col-" + j).prepend("<img src=" + imagen + " class='elemento'/>").css("justify-content", "flex-start")
                }
            }
        }
        if (i == 8) {
            clearInterval(intervalo);
            eliminar = setInterval(function() {
                eliminarCaramelos()
            }, 150);
        }
    };

    // Intercambiar Caramelos

    jQuery.fn.swap = function(b) {
        b = jQuery(b)[0];
        var a = this[0];
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };

    //  Funcion verficar que existan tres o mas caramelos iguales

    function horizontal() {
        var busHori = 0;
        for (var j = 1; j < 8; j++) {
            for (var k = 1; k < 6; k++) {
                var res1 = $(".col-" + k).children("img:nth-last-child(" + j + ")").attr("src");
                var res2 = $(".col-" + (k + 1)).children("img:nth-last-child(" + j + ")").attr("src");
                var res3 = $(".col-" + (k + 2)).children("img:nth-last-child(" + j + ")").attr("src");
                if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
                    $(".col-" + k).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
                    $(".col-" + (k + 1)).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
                    $(".col-" + (k + 2)).children("img:nth-last-child(" + (j) + ")").attr("class", "elemento activo");
                    busHori = 1;
                }
            }
        }
        return busHori;
    };


    function vertical() {
        var busVerti = 0;
        for (var l = 1; l < 6; l++) {
            for (var k = 1; k < 8; k++) {
                var res1 = $(".col-" + k).children("img:nth-child(" + l + ")").attr("src");
                var res2 = $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("src");
                var res3 = $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("src");
                if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
                    $(".col-" + k).children("img:nth-child(" + (l) + ")").attr("class", "elemento activo");
                    $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("class", "elemento activo");
                    $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("class", "elemento activo");
                    busVerti = 1;
                }
            }
        }
        return busVerti;
    };

    // Funcion para desaparecer dulces

    function eliminarCaramelos() {
        matriz = 0;
        busquedaHorizontal = horizontal();
        busquedaVertical = vertical();
        for (var j = 1; j < 8; j++) {
            matriz = matriz + $(".col-" + j).children().length;
        }
        //Condicional si no encuentra 3 dulces o más, llamamos a la función para volver a completar el juego
        if (busquedaHorizontal == 0 && busquedaVertical == 0 && matriz != 49) {
            clearInterval(eliminar);
            buscarNuevosDulces = 0;
            nuevosDulces = setInterval(function() {
                crearDulces()
            }, 80);
        }

        if (busquedaHorizontal == 1 || busquedaVertical == 1) {
            $(".elemento").draggable({ disabled: true });
            $("div[class^='col']").css("justify-content", "flex-end");
            $(".activo").hide("pulsate", 600, function() {
                var scoretmp = $(".activo").length;
                $(".activo").remove("img");
                score = score + scoretmp * 15;
                $("#score-text").html(score); //Cambiamos la puntuación
            });
        }
        if (busquedaHorizontal == 0 && busquedaVertical == 0 && matriz == 49) {
            $(".elemento").draggable({
                disabled: false,
                containment: ".panel-tablero",
                revert: true,
                revertDuration: 0,
                snap: ".elemento",
                snapMode: "inner",
                snapTolerance: 40,
                start: function(event, ui) {
                    movTotal = movTotal + 1
                    $("#movimientos-text").html(movTotal);
                }
            });
        }

        $(".elemento").droppable({
            drop: function(event, ui) {
                var dropped = ui.draggable;
                var droppedOn = this;
                espera = 0;
                do {
                    espera = dropped.swap($(droppedOn));
                }
                while (espera == 0);
                busquedaHorizontal = horizontal();
                busquedaVertical = vertical();
                if (busquedaHorizontal == 0 && busquedaVertical == 0) {
                    dropped.swap($(droppedOn));
                }
                if (busquedaHorizontal == 1 || busquedaVertical == 1) {
                    clearInterval(nuevosDulces);
                    clearInterval(eliminar);
                    eliminar = setInterval(function() {
                        eliminarCaramelos()
                    }, 100);
                }
            },
        });
    };

    // Funcion para crear nuevos dulces

    function crearDulces() {
        $(".elemento").draggable({ disabled: true });
        $("div[class^='col']").css("justify-content", "flex-start")
        for (var j = 1; j < 8; j++) {
            lencolum[j - 1] = $(".col-" + j).children().length;
        }
        if (buscarNuevosDulces == 0) {
            for (var j = 0; j < 7; j++) {
                lenrest[j] = (7 - lencolum[j]);
            }
            maximo = Math.max.apply(null, lenrest);
            contadorTotal = maximo;
        }
        if (maximo != 0) {
            if (buscarNuevosDulces == 1) {
                for (var j = 1; j < 8; j++) {
                    if (contadorTotal > (maximo - lenrest[j - 1])) {
                        $(".col-" + j).children("img:nth-child(" + (lenrest[j - 1]) + ")").remove("img");
                    }
                }
            }
            if (buscarNuevosDulces == 0) {
                buscarNuevosDulces = 1;
                for (var k = 1; k < 8; k++) {
                    for (var j = 0; j < (lenrest[k - 1] - 1); j++) {
                        $(".col-" + k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");
                    }
                }
            }
            for (var j = 1; j < 8; j++) {
                if (contadorTotal > (maximo - lenrest[j - 1])) {
                    numero = Math.floor(Math.random() * 4) + 1;
                    imagen = "image/" + numero + ".png";
                    $(".col-" + j).prepend("<img src=" + imagen + " class='elemento'/>");
                }
            }
        }
        if (contadorTotal == 1) {
            clearInterval(nuevosDulces);
            eliminar = setInterval(function() {
                eliminarCaramelos()
            }, 100);
        }
        contadorTotal = contadorTotal - 1;
    };

    // Funcion para terminar el juego y mostrar los resultados

    function juegoTerminado() {
        $('.panel-tablero').hide(1500);
        $(".panel-score").animate({
            width: "90%"
        }, 1500);
        $('.time').hide(1500);
    };

});