var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {

    window.location = 'index.html';
    throw new Error('El nombre y sala son  requerido');
}

var usuario = { nombre: params.get('nombre') , sala : params.get('sala') };

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});

socket.on('crearMensaje', function (mensaje) {

    console.log(mensaje);

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

 
 
//cuando un Usuario entra y sale del chat
socket.on('listPerson', function (person) {

    console.log('Servidor:', person);

});


// mensajes privados

socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje Privado:', mensaje);
});