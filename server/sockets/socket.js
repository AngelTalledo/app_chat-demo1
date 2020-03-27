const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/ultil')

const usuarios = new Usuarios();


io.on('connection', (client) => {



    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: 'true',
                mensaje: 'El nombre/Sala es requerido'
            })
        }

        client.join(usuario.sala);

        let personas = usuarios.addPersona(client.id, usuario.nombre, usuario.sala);

        client.broadcast.to(usuario.sala).emit('listPerson',  usuarios.getPersonasPorSala(usuario.sala));

        callback( usuarios.getPersonasPorSala(usuario.sala));
    });

    client.on('disconnect', () => {
        let deleteUser = usuarios.deletePersona(client.id);
        client.broadcast.to(deleteUser.sala).emit('crearMensaje', crearMensaje('Administrador', deleteUser.nombre + ' Salió..'));
        client.broadcast.to(deleteUser.sala).emit('listPerson', usuarios.getPersonasPorSala(deleteUser.sala));

    });

    client.on('crearMensaje', (data) => {

        let _persona = usuarios.getPersonaId(client.id);

        let mensaje = crearMensaje(_persona.nombre, data.mensaje);
        client.broadcast.to(_persona.sala).emit('crearMensaje', mensaje);
    });

    //mensajePrivado

    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersonaId(client.id);

        client.broadcast.to(data.para).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
    });

});