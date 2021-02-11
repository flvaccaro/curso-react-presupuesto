import React, { useState } from 'react';
import PropType from 'prop-types';
import Error from './Error';

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {
  // definir state
  const [cantidad, guardarCantidad] = useState(0);

  const [error, actualizarError] = useState(false);

  // Funcion que lee el presupuesto
  const definirPresupuesto = (e) => {
    guardarCantidad(parseInt(e.target.value, 10));
  };

  const isNumber = (value) => Number.isNaN(Number(value));

  const message = 'El valor ingresado no es un presupuesto válido';

  const agregarPresupuesto = (e) => {
    e.preventDefault();

    // valida
    if (cantidad < 1 || isNumber(cantidad)) {
      actualizarError(true);
    } else {
      actualizarError(false);
    }
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);
  };

  return (
    <>
      <h2>Coloca tu presupuesto</h2>
      {error ? <Error message={message} /> : null}
      <form onSubmit={agregarPresupuesto}>
        <input
          onChange={definirPresupuesto}
          type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
        />
        <input type="submit" className="button-primary u-full-width" value="Definir presupuesto" />
      </form>
    </>
  );
};

Pregunta.propTypes = {
  guardarPresupuesto: PropType.func.isRequired,
  guardarRestante: PropType.func.isRequired,
  actualizarPregunta: PropType.func.isRequired,
};

export default Pregunta;
