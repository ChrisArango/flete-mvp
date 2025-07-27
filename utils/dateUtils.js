const getFechaInicioPorRango = (rango) => {

  const hoy = new Date(); // obtiene fecha actual
  let fechaInicio = null;

  switch (rango) {

    case ("semana"):
      // buscar el lunes de la semana actual
      const dia = hoy.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
      let diferencia;

      if (dia === 0) {
        diferencia = 6; // Si hoy es domingo, retrocede 6 días para llegar al lunes anterior
      } else {
        diferencia = dia - 1; // Cualquier otro día, retrocede hasta el lunes
      };

      fechaInicio = new Date(hoy);
      fechaInicio.setDate(hoy.getDate() - diferencia);
      break;
    case "mes":
      fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      break;
    case "3meses":
      fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 2, 1);
      break;
    case "6meses":
      fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1);
      break;
    case "año":
      fechaInicio = new Date(hoy.getFullYear(), 0, 1);
      break;
    default:
      return null; // rango inválido

  };

};

module.exports = getFechaInicioPorRango;


// codigo viejo
// if (rango === "semana") {
  //   // buscar el lunes de la semana actual
  //   const dia = hoy.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  //   let diferencia;

  //   if (dia === 0) {
  //     diferencia = 6; // Si hoy es domingo, retrocede 6 días para llegar al lunes anterior
  //   } else {
  //     diferencia = dia - 1; // Cualquier otro día, retrocede hasta el lunes
  //   };

  //   fechaInicio = new Date(hoy);
  //   fechaInicio.setDate(hoy.getDate() - diferencia);

  // } else if (rango === "mes") {
  //   fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  // } else if (rango === "3meses") {
  //   fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 2, 1);

  // } else if (rango === "6meses") {
  //   fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 5, 1);

  // } else if (rango === "año") {
  //   fechaInicio = new Date(hoy.getFullYear(), 0, 1);
  // }

  // return fechaInicio;
