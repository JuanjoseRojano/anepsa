import React from 'react';

// Componente con animación de carga
function Cargando() {
    // Estilos para la animación dentro del componente
    const spinnerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const spinnerCircleStyle = {
        border: '8px solid #f3f3f3', // Fondo
        borderTop: '8px solid #3498db', // Color del spinner
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite', // Animación de giro
    };

    const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

    return (
        <div style={spinnerStyle}>
            <style>{keyframesStyle}</style> {/* Agregamos los estilos de animación directamente */}
            <div style={spinnerCircleStyle}></div>
            <p>Cargando...</p>
        </div>
    );
}

export default Cargando;