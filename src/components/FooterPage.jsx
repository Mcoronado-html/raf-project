const FooterPage = () => {
  return (
    <footer className="mt-auto bg-dark text-white pt-4 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>Sobre Nosotros</h5>
            <p>Somos un sitio dedicado a ofrecerte los mejores emprendimientos de Costa Rica.</p>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="bi bi-house" /> Inicio
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt-fill" /> Ave 65. Purral, Costa Rica
              </li>
              <li>
                <i className="bi bi-telephone-fill" /> +506 60904282
              </li>
              <li>
                <i className="bi bi-envelope-fill" /> soporte@heavenly.com
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Síguenos</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://www.facebook.com/tu_pagina" className="text-white">
                  <i className="bi bi-facebook fs-4" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/tu_cuenta" className="text-white">
                  <i className="bi bi-twitter fs-4" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/tu_cuenta" className="text-white">
                  <i className="bi bi-instagram fs-4" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/company/tu_empresa" className="text-white">
                  <i className="bi bi-linkedin fs-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">© 2025 Ecommerce. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default FooterPage;
