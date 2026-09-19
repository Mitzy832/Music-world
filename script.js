// ========================================
// CANCIONES
// ========================================

var canciones = [

    {
        nombre: "Amor",
        artista: "Emmanuel Cortes",
        id: "TX-1dI8t6WM"
    },

    {
        nombre: "COQUETA",
        artista: "Fuerza Regida x Grupo Frontera",
        id: "0ln2Dmxyjgk"
    },

    {
        nombre: "NO SE VA",
        artista: "Grupo Frontera",
        id: "VtKcDwz6hiM"
    },

    {
        nombre: "Adán y Eva",
        artista: "Paulo Londra",
        id: "aSjflT_J0Xo"
    },

    {
        nombre: "Tiroteo Remix",
        artista: "Marc Seguí ft. Rauw Alejandro y Pol Granch",
        id: "VEfkNHTjgs8"
    },

    {
        nombre: "Tu Boda",
        artista: "Fuerza Regida & Óscar Maydon",
        id: "g06wZjffBpI"
    },

    {
        nombre: "Si Antes Te Hubiera Conocido",
        artista: "KAROL G",
        id: "QCZZwZQ4qNs"
    },

    {
        nombre: "La Diabla",
        artista: "Xavi",
        id: "HfzbN5ky5Co"
    },

    {
        nombre: "UN X100TO",
        artista: "Grupo Frontera x Bad Bunny",
        id: "3inw26U-os4"
    },

    {
        nombre: "Nena Maldición",
        artista: "Paulo Londra ft. Lenny Tavárez",
        id: "bX3S-_jUauc"
    },

    {
        nombre: "Tal Vez",
        artista: "Paulo Londra",
        id: "L7Vnp-S0xAE"
    },

    {
        nombre: "Hasta La Raíz",
        artista: "Natalia Lafourcade",
        id: "eCFdvx23tHk"
    },

    {
        nombre: "2.0",
        artista: "BTS",
        id: "_gyultVTesk"
    },

    {
        nombre: "Hooligan",
        artista: "BTS",
        id: "diBO0gMuTXo"
    },

    {
        nombre: "Body to Body",
        artista: "Body to Body",
        id: "RBaSiVjtKR4"
    }

];


// ========================================
// CANCIONES GUARDADAS
// ========================================

var cancionesGuardadas =
    JSON.parse(
        localStorage.getItem("cancionesMusicWorld")
    );

if (cancionesGuardadas == null) {

    cancionesGuardadas = [];

}

for (var i = 0; i < cancionesGuardadas.length; i++) {

    canciones.push(cancionesGuardadas[i]);

}


// ========================================
// VARIABLES
// ========================================

var jugador;

var cancionActual = 0;


// ========================================
// CARGAR YOUTUBE
// ========================================

var etiqueta =
    document.createElement("script");

etiqueta.src =
    "https://www.youtube.com/iframe_api";

document.body.appendChild(etiqueta);


// ========================================
// REPRODUCTOR DE YOUTUBE
// ========================================

function onYouTubeIframeAPIReady() {

    jugador = new YT.Player(
        "youtube-player",
        {

            height: "500",

            width: "100%",

            videoId: canciones[0].id,

            playerVars: {

                rel: 0

            },

            events: {

                "onReady":
                    reproductorListo

            }

        }
    );

}


// ========================================
// REPRODUCTOR LISTO
// ========================================

function reproductorListo() {

    jugador.setVolume(70);

    mostrarInformacion();

}


// ========================================
// INFORMACIÓN DE LA CANCIÓN
// ========================================

function mostrarInformacion() {

    document.getElementById("player-title")
        .textContent =
        canciones[cancionActual].nombre;

    document.getElementById("player-artist")
        .textContent =
        canciones[cancionActual].artista;

}


// ========================================
// CAMBIAR CANCIÓN
// ========================================

function cambiarCancion(numero) {

    if (numero < 0) {

        numero =
            canciones.length - 1;

    }

    if (numero >= canciones.length) {

        numero = 0;

    }

    cancionActual = numero;

    if (jugador) {

        jugador.loadVideoById(
            canciones[cancionActual].id
        );

    }

    mostrarInformacion();

}


// ========================================
// SIGUIENTE
// ========================================

document.getElementById("siguiente")
    .onclick = function() {

        cambiarCancion(
            cancionActual + 1
        );

    };


// ========================================
// ANTERIOR
// ========================================

document.getElementById("anterior")
    .onclick = function() {

        cambiarCancion(
            cancionActual - 1
        );

    };


// ========================================
// PLAY / PAUSA
// ========================================

document.getElementById("play")
    .onclick = function() {

        if (!jugador) {

            return;

        }

        var estado =
            jugador.getPlayerState();

        if (
            estado ==
            YT.PlayerState.PLAYING
        ) {

            jugador.pauseVideo();

            document.getElementById("play")
                .textContent = "▶️";

        } else {

            jugador.playVideo();

            document.getElementById("play")
                .textContent = "⏸️";

        }

    };


// ========================================
// VOLUMEN
// ========================================

document.getElementById("volume")
    .oninput = function() {

        var valor =
            document.getElementById("volume")
                .value;

        if (jugador) {

            jugador.setVolume(valor);

        }

    };


// ========================================
// MOSTRAR CANCIONES
// ========================================

function mostrarCanciones(lista) {

    var contenedor =
        document.getElementById(
            "lista-canciones"
        );

    contenedor.innerHTML = "";

    var encontrados = 0;

    for (var i = 0; i < lista.length; i++) {

        encontrados++;

        var cancion = lista[i];

        var tarjeta =
            document.createElement("div");

        tarjeta.className =
            "cancion";

        tarjeta.innerHTML =

            '<iframe src="https://www.youtube.com/embed/' +
            cancion.id +
            '?rel=0" allowfullscreen></iframe>' +

            '<div class="cancion-info">' +

            '<h3>' +
            cancion.nombre +
            '</h3>' +

            '<p>' +
            cancion.artista +
            '</p>' +

            '<button onclick="seleccionarCancion(' +
            i +
            ')">' +
            '🎵 Reproducir' +
            '</button>' +

            '<button onclick="agregarPlaylist(' +
            i +
            ')">' +
            '💜 Playlist' +
            '</button>' +

            '</div>';

        contenedor.appendChild(tarjeta);

    }

    if (encontrados == 0) {

        document.getElementById(
            "sin-resultados"
        ).style.display = "block";

    } else {

        document.getElementById(
            "sin-resultados"
        ).style.display = "none";

    }

}


// ========================================
// SELECCIONAR CANCIÓN
// ========================================

function seleccionarCancion(indice) {

    var cancionSeleccionada =
        listaCancionActual[indice];

    for (
        var i = 0;
        i < canciones.length;
        i++
    ) {

        if (
            canciones[i].id ==
            cancionSeleccionada.id
        ) {

            cancionActual = i;

            break;

        }

    }

    if (jugador) {

        jugador.loadVideoById(
            canciones[cancionActual].id
        );

    }

    mostrarInformacion();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// VARIABLE PARA EL BUSCADOR
// ========================================

var listaCancionActual =
    canciones;


// ========================================
// BUSCADOR
// ========================================

document.getElementById("busqueda")
    .oninput = function() {

        var texto =
            document.getElementById(
                "busqueda"
            ).value.toLowerCase();

        var resultados = [];

        for (
            var i = 0;
            i < canciones.length;
            i++
        ) {

            var nombre =
                canciones[i]
                    .nombre
                    .toLowerCase();

            var artista =
                canciones[i]
                    .artista
                    .toLowerCase();

            if (
                nombre.includes(texto) ||
                artista.includes(texto)
            ) {

                resultados.push(
                    canciones[i]
                );

            }

        }

        listaCancionActual =
            resultados;

        mostrarCanciones(
            resultados
        );

    };


// ========================================
// PLAYLIST
// ========================================

var playlist =
    JSON.parse(
        localStorage.getItem(
            "playlistMusicWorld"
        )
    );

if (playlist == null) {

    playlist = [];

}


// ========================================
// AGREGAR A PLAYLIST
// ========================================

function agregarPlaylist(indice) {

    var cancion =
        listaCancionActual[indice];

    var existe = false;

    for (
        var i = 0;
        i < playlist.length;
        i++
    ) {

        if (
            playlist[i].id ==
            cancion.id
        ) {

            existe = true;

        }

    }

    if (existe) {

        return;

    }

    playlist.push(cancion);

    localStorage.setItem(
        "playlistMusicWorld",
        JSON.stringify(playlist)
    );

    mostrarPlaylist();

}


// ========================================
// MOSTRAR PLAYLIST
// ========================================

function mostrarPlaylist() {

    var contenedor =
        document.getElementById(
            "lista-playlist"
        );

    contenedor.innerHTML = "";

    if (playlist.length == 0) {

        contenedor.innerHTML =
            "<p style='text-align:center;color:#aaa;'>" +
            "Todavía no tienes canciones en tu playlist." +
            "</p>";

        return;

    }

    for (
        var i = 0;
        i < playlist.length;
        i++
    ) {

        var cancion =
            playlist[i];

        var item =
            document.createElement("div");

        item.className =
            "playlist-item";

        item.innerHTML =

            "<div>" +

            "<strong>" +
            cancion.nombre +
            "</strong>" +

            "<span>" +
            cancion.artista +
            "</span>" +

            "</div>" +

            "<div>" +

            "<button onclick='reproducirPlaylist(" +
            i +
            ")'>" +
            "▶️ Escuchar" +
            "</button>" +

            "<button onclick='quitarPlaylist(" +
            i +
            ")'>" +
            "🗑️ Quitar" +
            "</button>" +

            "</div>";

        contenedor.appendChild(item);

    }

}


// ========================================
// REPRODUCIR DESDE PLAYLIST
// ========================================

function reproducirPlaylist(indice) {

    var cancion =
        playlist[indice];

    for (
        var i = 0;
        i < canciones.length;
        i++
    ) {

        if (
            canciones[i].id ==
            cancion.id
        ) {

            cancionActual = i;

            break;

        }

    }

    if (jugador) {

        jugador.loadVideoById(
            cancion.id
        );

    }

    mostrarInformacion();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// QUITAR CANCIÓN DE PLAYLIST
// ========================================

function quitarPlaylist(indice) {

    playlist.splice(indice, 1);

    localStorage.setItem(
        "playlistMusicWorld",
        JSON.stringify(playlist)
    );

    mostrarPlaylist();

}


// ========================================
// AGREGAR NUEVA CANCIÓN
// ========================================

document.getElementById("formulario")
    .onsubmit = function(evento) {

        evento.preventDefault();

        var nombre =
            document.getElementById(
                "nombre"
            ).value;

        var artista =
            document.getElementById(
                "artistaNuevo"
            ).value;

        var enlace =
            document.getElementById(
                "enlace"
            ).value;

        var id =
            obtenerIDYoutube(enlace);

        if (id == null) {

            document.getElementById(
                "mensaje"
            ).textContent =
                "❌ El enlace de YouTube no es válido.";

            return;

        }

        var nuevaCancion = {

            nombre: nombre,

            artista: artista,

            id: id

        };

        canciones.push(
            nuevaCancion
        );

        cancionesGuardadas.push(
            nuevaCancion
        );

        localStorage.setItem(
            "cancionesMusicWorld",
            JSON.stringify(
                cancionesGuardadas
            )
        );

        listaCancionActual =
            canciones;

        mostrarCanciones(
            canciones
        );

        document.getElementById(
            "formulario"
        ).reset();

        document.getElementById(
            "mensaje"
        ).textContent =
            "✅ ¡Canción guardada correctamente!";

    };


// ========================================
// OBTENER ID DE YOUTUBE
// ========================================

function obtenerIDYoutube(enlace) {

    var id = null;

    if (
        enlace.includes(
            "youtu.be/"
        )
    ) {

        id =
            enlace.split(
                "youtu.be/"
            )[1];

        if (id.includes("?")) {

            id =
                id.split("?")[0];

        }

    }

    else if (
        enlace.includes(
            "watch?v="
        )
    ) {

        id =
            enlace.split(
                "watch?v="
            )[1];

        if (id.includes("&")) {

            id =
                id.split("&")[0];

        }

    }

    else if (
        enlace.includes(
            "youtube.com/embed/"
        )
    ) {

        id =
            enlace.split(
                "youtube.com/embed/"
            )[1];

        if (id.includes("?")) {

            id =
                id.split("?")[0];

        }

    }

    return id;

}


// ========================================
// MOSTRAR TODO AL ABRIR
// ========================================

mostrarCanciones(canciones);

mostrarPlaylist();
