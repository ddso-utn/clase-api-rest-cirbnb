import express from "express"
import { Alojamiento } from "./alojamiento.js"
import { precioMenorQue } from "./funciones.js"
import { obtenerPorID } from "./funciones.js"
import { agregar } from "./funciones.js"
import { eliminar } from "./funciones.js"
import { z } from "zod"

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.send("ok")
})

app.get("/api/v1/alojamientos", (req, res) => {
    const max_price = req.query.max_price

    if (!max_price) {
        res.json(alojamientosADTOs(alojamientos))
        return
    }

    res.json(alojamientosADTOs(precioMenorQue(alojamientos, max_price)))
})

app.get("/api/v1/alojamientos/:id", (req, res) => {
    const resultId = idTransform.safeParse(req.params.id)

    if (resultId.error) {
        res.status(400).json(resultId.error.issues)
        return
    }

    const id = resultId.data
    const alojamiento = obtenerPorID(alojamientos, id)

    if (!alojamiento) {
        res.status(404).json({
            error: "No existe un alojamiento con ese ID."
        })
        return
    }

    res.json(alojamientoADTO(alojamiento))
})

app.post("/api/v1/alojamientos", (req, res) => {
    const body = req.body
    const resultBody = alojamientoSchema.safeParse(body)

    if(resultBody.error) {
        res.status(400).json(resultBody.error.issues)
        return
    }

    const nuevoAlojamientoDTO = resultBody.data
    const nuevoAlojamiento = new Alojamiento(nuevoAlojamientoDTO.nombre,
        nuevoAlojamientoDTO.precioPorNoche,
        nuevoAlojamientoDTO.categoria
    )
    agregar(alojamientos, nuevoAlojamiento)

    res.status(201).json(alojamientoADTO(nuevoAlojamiento))
})

app.delete("/api/v1/alojamientos/:id", (req, res) => {
    const resultId = idTransform.safeParse(req.params.id)

    if (resultId.error) {
        res.status(400).json(resultId.error.issues)
        return
    }

    const id = resultId.data
    const alojamiento = obtenerPorID(alojamientos, id)

    if (!alojamiento) {
        res.status(404).json({
            error: "No existe el alojamiento que se intenta eliminar con ese ID."
        })
        return
    }

    eliminar(alojamientos, alojamiento)
    
    res.status(204).send()
})

app.put("/api/v1/alojamientos/:id", (req, res) => {
    const resultId = idTransform.safeParse(req.params.id)

    if (resultId.error) {
        res.status(400).json(resultId.error.issues)
        return
    }

    const id = resultId.data
    const alojamientoExistente = obtenerPorID(alojamientos, id)

    if (!alojamientoExistente) {
        res.status(404).json({
            error: "No existe el alojamiento que se intenta eliminar con ese ID."
        })
        return
    }

    const body = req.body
    const resultBody = alojamientoSchema.safeParse(body)

    if(resultBody.error) {
        res.status(400).json(resultBody.error.issues)
        return
    }

    const alojamientoActualizadoDTO = resultBody.data
   
    alojamientoExistente.nombre = alojamientoActualizadoDTO.nombre
    alojamientoExistente.precioPorNoche = alojamientoActualizadoDTO.precioPorNoche
    alojamientoExistente.categoria = alojamientoActualizadoDTO.categoria

    res.status(200).json(alojamientoADTO(alojamientoExistente))
})

app.listen(3000, () => {
    console.log("Servidor corriendo sobre el puerto 3000.")
})

const alojamientos = []
const a1 = new Alojamiento("Hotel 3 estrellas", 100, "Hotel");
a1.agregarCaracteristica("Desayuno incluido");
agregar(alojamientos, a1);

function alojamientosADTOs(alojamientos) {
    return alojamientos.map(a => alojamientoADTO(a))
}

function alojamientoADTO(alojamiento) {
    return {
        "id": alojamiento.id,
        "nombre": alojamiento.nombre,
        "precioPorNoche": alojamiento.precioPorNoche,
        "categoria": alojamiento.categoria,
        "caracteristicas": alojamiento.caracteristicas
    }
}

const idTransform = z.string().transform(((val, ctx)  => {
    const num = Number(val);
    if (isNaN(num)) {
        ctx.addIssue({
            code: "INVALID_ID",
            message: "id must be a number"
        });
        return z.NEVER;
    }
    return num;
}))

const alojamientoSchema = z.object({
    nombre: z.string().min(3).max(20),
    categoria: z.string(),
    precioPorNoche: z.number().nonnegative()
})