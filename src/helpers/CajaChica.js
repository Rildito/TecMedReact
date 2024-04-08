
export const convertirFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);

    // Configuramos la fecha y hora en formato local y en la zona horaria de Bolivia (GMT-4)
    const opciones = { timeZone: 'America/La_Paz', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const fechaFormateada = fecha.toLocaleString('es-BO', opciones);

    return fechaFormateada;
}

export const convertirFechaSinHora = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);

    // Configuramos la fecha y hora en formato local y en la zona horaria de Bolivia (GMT-4)
    const opciones = { timeZone: 'America/La_Paz', day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleString('es-BO', opciones);

    return fechaFormateada;
}

export function convertirNumeroALetras(numero) {
    const unidades = ["", "Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve"];
    const especiales = ["", "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve"];
    const decenas = ["", "Diez", "Veinte", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa"];
    const centenas = ["", "Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"];

    let parteEntera = Math.floor(numero);
    let parteDecimal = Math.round((numero - parteEntera) * 100);

    if (parteEntera === 100) {
        if (parteDecimal > 0) {
            return `100 /${parteDecimal} Bs.`;
        } else {
            return 'Cien /00 Bs.'
        }

    }

    function convertirParteEntera(num) {
        if (num >= 1 && num <= 9) {
            return unidades[num];
        } else if (num >= 11 && num <= 19) {
            return especiales[num - 10];
        } else if (num >= 10 && num <= 99) {
            const decena = Math.floor(num / 10);
            const unidad = num % 10;
            if (unidad === 0) {
                return decenas[decena];
            } else {
                return decenas[decena] + " y " + unidades[unidad];
            }
        } else if (num >= 100 && num <= 999) {
            const centena = Math.floor(num / 100);
            const resto = num % 100;
            if (resto === 0) {
                return centenas[centena];
            } else {
                return centenas[centena] + " " + convertirParteEntera(resto);
            }
        } else {
            return "Número fuera de rango";
        }
    }

    let resultado = convertirParteEntera(parteEntera);

    if (parteDecimal > 0) {
        return resultado + ` /${parteDecimal} Bs.`;
    } else {
        return resultado + ` /00 Bs.`;
    }
}