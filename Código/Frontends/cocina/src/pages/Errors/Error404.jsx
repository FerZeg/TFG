import './Errors.css'

export function Error404() {
  return (
    <section className='error-section'>
      <main className='main-main-404'>
          <div className="main-text-404">
              <h3>CÓDIGO ERROR: 404</h3>
              <h1>OOOPS!!</h1>
              <h2>¡La pagina que estabas buscando no existe!</h2>
              <a href="/">Volver</a>
          </div>
          <div className="main-image-404">
              <img src="foto.jpg" alt=""/>
          </div>
      </main>
    </section>
  );
}