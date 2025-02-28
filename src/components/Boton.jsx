import React from 'react';

function Boton(props) {

    return (
        <>
            <button onClick={props.funcionBoton}>{props.nombreBoton}</button>
        </>
    );
};


export default Boton;