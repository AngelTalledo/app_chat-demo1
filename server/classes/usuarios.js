class Usuarios {
    constructor() {
        this.personas = [];
    }

    addPersona(idSocket, nombre, sala) {
        let persona = { idSocket, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    }

    getPersonaId(_idSocket) {
        let persona = this.personas.filter(persona => persona.idSocket === _idSocket)[0];

        return persona;

    }

    getPersonasAll() {
        return this.personas;
    }

    getPersonasPorSala(_sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === _sala);
        return personasEnSala;
    }

    deletePersona(_idSocket) {

        let personDelete = this.getPersonaId(_idSocket);

        this.personas = this.personas.filter(persona => persona.idSocket != _idSocket);

        return personDelete;
    }

}
module.exports = { Usuarios }