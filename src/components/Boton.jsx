import React from 'react';

function Boton(props) {

    return (
        <>
            <button onClick={props.funcionBoton}
                type={props.type}
                className={props.className}
                disabled={props.disabled}>
                {props.nombreBoton}
            </button >
        </>
    );
};


export default Boton;