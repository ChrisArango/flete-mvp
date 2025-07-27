class Trip {
  constructor (nombreEmpresa, manifiesto, fechaInicio, fechaFin, placa, conductor, origen, destino, tipoCarga, descripcionCarga,valorFlete, anticipo, combustible, peajes, otrosGastos){
    this.nombreEmpresa = nombreEmpresa;
    this.manifiesto = manifiesto;
    // asi guarda la fecha en formato valido y no en string
    this.fechaInicio = new Date(fechaInicio);
    this.fechaFin = new Date(fechaFin);
    this.diasViaje = Math.ceil((this.fechaFin - this.fechaInicio) / (1000 * 60 * 60 * 24));
    this.placa= placa;
    this.conductor = conductor;
    this.origen = origen;
    this.destino = destino;
    this.tipoCarga = tipoCarga;
    this.descripcionCarga = descripcionCarga;
    this.valorFlete = valorFlete;
    this.anticipo = anticipo;
    this.saldoCobrar = this.valorFlete - this.anticipo;
    this.combustible = combustible;
    this.peajes = peajes;
    this.otrosGastos = otrosGastos;
    this.totalGastos = this.combustible + this.peajes + this.otrosGastos;
    this.saldoVehiculo = this.anticipo - this.totalGastos;
    this.utilidadViaje = this.valorFlete - this.totalGastos;

    this.createdAt = new Date();
  }
}

module.exports = Trip;
