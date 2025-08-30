export class Alojamiento {
    #id
    #nombre
    #precioPorNoche
    #categoria
    #caracteristicas = []

    constructor(nombre, precioPorNoche, categoria) {
        this.#nombre = nombre
        this.#precioPorNoche = precioPorNoche
        this.#categoria = categoria
    }

    agregarCaracteristica(caracteristica) {
        this.#caracteristicas.push(caracteristica)
    }

    set nombre(nombre) {
        this.#nombre = nombre
    }

    get nombre() {
        return this.#nombre
    }

    set precioPorNoche(precio) {
        this.#precioPorNoche = precio
    }

    get precioPorNoche() {
        return this.#precioPorNoche
    }

    set categoria(categoria) {
        this.#categoria = categoria
    }

    get categoria() {
        return this.#categoria
    }

    get caracteristicas() {
        return this.#caracteristicas
    }

    set id(id) {
        this.#id = id
    }

    get id() {
        return this.#id
    }
}