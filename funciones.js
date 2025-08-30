export function precioMenorQue(alojamientos, precio) {
    return alojamientos.filter(a => a.precioPorNoche < precio)
}

export function obtenerPorID(alojamientos, id) {
    return alojamientos.filter(a => a.id === id)[0]
}

export function agregar(lista, elemento) {
    elemento.id = lista.length + 1
    lista.push(elemento)
}

export function eliminar(lista, elemento) {
    const indice = lista.indexOf(elemento)

    lista.splice(indice, 1)
}