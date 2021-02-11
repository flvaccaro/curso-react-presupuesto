import React, { useState } from 'react';
import shortid from 'shortid';
import PropType from 'prop-types';
import Error from './Error';

const Formulario = ({ guardarGasto, guardarCrearGasto, restante }) => {
  const [nombre, guardarNombre] = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [error, actualizarError] = useState(false);
  const [messageError, actualizarMessageError] = useState('error');

  const isNumber = (value) => Number.isNaN(Number(value));

  const agregarGasto = (e) => {
    e.preventDefault();

    // validar
    if (cantidad < 1 || isNumber(cantidad) || nombre.trim() === '') {
      actualizarMessageError('Ambos campos son obligatorios o el presupuesto es inválido');
      actualizarError(true);
      return;
    }
    if (cantidad > restante) {
      actualizarMessageError('El gasto ingresado supera al restante actual');
      actualizarError(true);
      return;
    }

    actualizarError(false);

    // construir gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    };

    // pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    // resetear el form
    guardarNombre('');
    guardarCantidad(0);
  };
  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos</h2>
      {error ? <Error message={messageError} /> : null}
      <div className="campo">
        <label htmlFor="nombre">
          Nombre del gasto
          <input
            value={nombre}
            onChange={(e) => guardarNombre(e.target.value)}
            id="nombre"
            name="nombre"
            type="text"
            className="u-full-width"
            placeholder="Ej. transporte"
          />
        </label>
      </div>
      <div className="campo">
        <label htmlFor="cantidad">
          Cantidad del gasto
          <input
            value={!isNumber(cantidad) ? parseInt(cantidad, 10) : ''}
            onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
            id="cantidad"
            name="cantidad"
            type="number"
            className="u-full-width"
            placeholder="Ej. 300"
          />
        </label>
      </div>
      <input type="submit" className="button-primary u-full-width" value="Agregar gasto" />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropType.func.isRequired,
  guardarCrearGasto: PropType.func.isRequired,
  restante: PropType.number.isRequired,
};

export default Formulario;
