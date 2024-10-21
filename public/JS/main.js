$(document).ready(function() {
    $('#convertir').click(() => {
        let ecuacionPolaca = $('#entrada').val().trim();

        $('#error').text('');
        $('#resultado').text('');
        $('#resultadoEcuacion').text('');

        // Modificar la entrada para permitir que el usuario escriba sin espacios entre los operandos y el operador
        ecuacionPolaca = agregarEspaciosEcuacion(ecuacionPolaca);

        // Verificación: Asegurarse de que la ecuación tenga el formato correcto
        if (!/^[+\-*/] [0-9]+ [0-9]+/.test(ecuacionPolaca)) {
            $('#error').text('Error: La notación polaca debe tener un operador seguido de dos operandos.');
            return;
        }

        const ecuacionNormal = convertirANotacionNormal(ecuacionPolaca);
        $('#resultado').text(ecuacionNormal);

        try {
            const resultadoEvaluacion = evaluarEcuacion(ecuacionNormal);
            $('#resultadoEcuacion').text(resultadoEvaluacion);
        } catch (error) {
            $('#error').text('Error en la evaluación de la ecuación.');
        }
    });

    // Función para agregar espacios automáticamente entre los operadores y operandos
    const agregarEspaciosEcuacion = ecuacion => {
        // Si la ecuación es de la forma +33 o similar, agrega los espacios correspondientes
        return ecuacion.replace(/([+\-*/])([0-9])([0-9])/, '$1 $2 $3');
    };

    const convertirANotacionNormal = ecuacion => {
        const pila = [];
        const tokens = ecuacion.split(' ').reverse();

        tokens.forEach(token => {
            if (esOperador(token)) {
                const operando1 = pila.pop();
                const operando2 = pila.pop();
                const expresion = `(${operando1} ${token} ${operando2})`;
                pila.push(expresion);
            } else {
                pila.push(token);
            }
        });

        return pila.pop();
    };

    const evaluarEcuacion = ecuacion => {
        const ecuacionLimpia = ecuacion.replace(/[()]/g, '');
        return eval(ecuacionLimpia);
    };

    const esOperador = caracter => {
        return ['+', '-', '*', '/'].includes(caracter);
    };
});
