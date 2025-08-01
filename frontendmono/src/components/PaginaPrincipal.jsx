import React from 'react'
import { useNavigate } from 'react-router-dom';


const PaginaPrincipal = () => {

  const navigate = useNavigate();

  const goToClientSection = () => {
    navigate('/ClientHome');
  };

  const goToAdminSection = () => {
    navigate('/Admin');
  }

  const goToPreguntasFrecuentes = () => {
    navigate('/FrequentQuestions');
  }

  return (

    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido/a a la pagina principal de KartingRM seleccione su rol</h1>
      <div style={{ marginTop: '20px' }}>
        <button onClick={goToAdminSection}  style={{ marginRight: '10px', padding: '10px 20px' }} >Admin</button>
        <button onClick={goToClientSection} style={{ padding: '10px 20px' }} >Cliente</button>
      </div>

      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      <button 
      onClick={goToPreguntasFrecuentes} 
      style={{ padding: '10px 20px' }}
      >
      Sobre nosotros y preguntas frecuentes
      </button>
      </div>
    </div>

  );
};

export default PaginaPrincipal;