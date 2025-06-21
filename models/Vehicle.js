class Vehicle {
  constructor (placa, marca, modelo, clase, ownerId) {
    this.placa = placa;
    this.marca = marca;
    this.modelo = modelo;
    this.clase = clase;
    this.ownerId = ownerId;
    this.createdAt = new Date();
  }
}

module.exports = Vehicle;
