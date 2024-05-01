import { useRouteError } from 'react-router-dom';
import './Errors.css'
import { isRouteErrorResponse } from 'react-router-dom';

export function Errors() {
  const error = useRouteError();
  let code = 404
  let message = 'Página no encontrada'
  if(!isRouteErrorResponse(error)) {
    code = 500
    message = 'Ha ocurrido un error interno'
  }
  return (
    <section className='error-section'>
      <main className='main-main-404'>
          <div className="main-text-404">
              <h3>CÓDIGO ERROR: {code}</h3>
              <h1>OOOPS!!</h1>
              <h2>{message}</h2>
              <a href="/">Volver</a>
          </div>
          <div className="main-image-404">
              <img src="foto.jpg" alt=""/>
          </div>
      </main>
    </section>
  );
}


