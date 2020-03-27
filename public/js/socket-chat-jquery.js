
var params = new URLSearchParams(window.location.search);

var _nombre = params.get('nombre');
var divUser = $('#divUsuarios');

var forEnviar = $('#formEnviar');
var txtInput = $('#txtInput');

var charBox = $('#divChatbox');

// renderizar Usuarios
function renderizarUsuarios(personas) {
    console.log();
    var html = '';
    html += '<li>';
    html += '    <a  href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li><a data-id="' + personas[i].idSocket + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a></li>'
    }

    divUser.html(html);

}

function renderMensaje(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre ==='Administrador') {
        adminClass ='danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + ' </h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (!mensaje.nombre ==='Administrador') 
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += ' <h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-'+adminClass+'">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    charBox.append(html);
}


function scrollBottom() {

    // selectors
    var newMessage = charBox.children('li:last-child');

    // heights
    var clientHeight = charBox.prop('clientHeight');
    var scrollTop = charBox.prop('scrollTop');
    var scrollHeight = charBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        charBox.scrollTop(scrollHeight);
    }
}
// listeners

divUser.on('click', 'a', function () {
    var idSocket = $(this).data('id');

    if (idSocket) {
        console.log(idSocket);
    }
});

forEnviar.on('submit', function (e) {
    e.preventDefault();
    if (txtInput.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: _nombre,
        mensaje: txtInput.val()
    }, function (mensaje) {
        txtInput.val('').focus();
        renderMensaje(mensaje,true);
        scrollBottom();
    });

});
