import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

interface Vehiculo {
  id: number;
  placa: string;
  modelo: string;
  kilometraje: number;
  estado: "activo" | "mantenimiento";
}

const listaVehiculos: Vehiculo[] = [
  {
    id: 1,
    placa: "ABC123",
    modelo: "Toyota Corolla",
    kilometraje: 45000,
    estado: "activo",
  },
  {
    id: 2,
    placa: "DEF456",
    modelo: "Chevrolet Spark",
    kilometraje: 78000,
    estado: "mantenimiento",
  },
  {
    id: 3,
    placa: "GHI789",
    modelo: "Mazda 3",
    kilometraje: 32000,
    estado: "activo",
  },
  {
    id: 4,
    placa: "JKL321",
    modelo: "Renault Duster",
    kilometraje: 61000,
    estado: "activo",
  },
  {
    id: 5,
    placa: "MNO654",
    modelo: "Kia Sportage",
    kilometraje: 95000,
    estado: "mantenimiento",
  },
];

app.get("/api/vehiculos/", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Flota de vehiculos",
    total: listaVehiculos.length,
    data: listaVehiculos,
  });
});

app.get("/api/vehiculos/:id", function (req: Request, res: Response) {
  const findVehiculo = Number(req.params.id);
  const foundVehiculo = listaVehiculos.find((v) => v.id === findVehiculo);

  if (!foundVehiculo) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontraron vehiculos con el ID: ${findVehiculo}`,
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "Se ha encontrado con exito!",
    data: foundVehiculo,
  });
});

app.post("/api/vehiculos/", function (req: Request, res: Response) {
  const { placa, modelo, kilometraje, estado } = req.body;
  let newVehiculo: Vehiculo = {
    id: listaVehiculos.length + 1,
    placa,
    modelo,
    kilometraje,
    estado,
  };
  listaVehiculos.push(newVehiculo);
  res.status(200).json({
    ok: true,
    mensaje: "Se agregó con exito el vehiculo",
    data: newVehiculo,
  });
});

app.put("/api/vehiculos/:id", function (req: Request, res: Response) {
  const { placa, modelo, kilometraje, estado } = req.body;
  const idToChangeVehiculo = Number(req.params.id);
  const findVehiculo = listaVehiculos.find((v) => v.id === idToChangeVehiculo);

  if (!findVehiculo) {
    return res.status(404).json({
      ok: false,
      mensaje: `Vehiculo de ID: ${idToChangeVehiculo} no encontrado.`,
    });
  }

  if (placa !== undefined) findVehiculo.placa = placa;
  if (modelo !== undefined) findVehiculo.modelo = modelo;
  if (kilometraje !== undefined) findVehiculo.kilometraje = kilometraje;
  if (estado !== undefined) findVehiculo.estado = estado;

  res.status(200).json({
    ok: true,
    mensaje: `El vehiculo de ID: ${findVehiculo.id} ha sido actualizado.`,
    data: findVehiculo,
  });
});

app.delete("/api/vehiculos/:id", (req: Request, res: Response) => {
  const idToDeleteVehiculo = Number(req.params.id);
  const findVehiculo = listaVehiculos.findIndex((v) => v.id === idToDeleteVehiculo);

  if (findVehiculo === -1)
    return res
      .status(404)
      .json({
        ok: false,
        mensaje: `No se encontró un vehiculo de ID: ${idToDeleteVehiculo}`,
      });

  listaVehiculos.splice(findVehiculo, 1);

  res
    .status(200)
    .json({
      ok: true,
      mensaje: `El vehiculo de ID: ${idToDeleteVehiculo} ha sido eliminado.`,
    });
});

app.listen(port, function () {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
