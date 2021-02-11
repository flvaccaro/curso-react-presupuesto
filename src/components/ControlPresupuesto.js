import React from 'react';
import PropType from 'prop-types';
import { revisarPresupuesto } from '../helper';

const ControlPresupuesto = ({ presupuesto, restante }) => {
  return (
    <>
      <div className="alert alert-primary">Presupuesto: $ {presupuesto} </div>
      <div className={revisarPresupuesto(presupuesto, restante)}>Restante: $ {restante} </div>
    </>
  );
};

ControlPresupuesto.propTypes = {
  presupuesto: PropType.number.isRequired,
  restante: PropType.number.isRequired,
};
export default ControlPresupuesto;
