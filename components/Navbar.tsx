'use client'

export default function Navbar() {
  return (
    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-2 w-nav">
      <div className="navigation-wrapper">
        <div id="w-node-c7db3066-8b6d-5286-e982-79d87ed2e7a8-7ed2e7a6" className="navigation-content">
          <a href="/" className="brand-6 w-nav-brand">
            <img src="/images/cosmic_logo_-black-2.svg" loading="lazy" width={177} height={40} alt="Cosmicstar logo" />
          </a>
          <nav role="navigation" className="nav-menu-3 w-nav-menu">
            <div className="menu-items">
              <a href="/" aria-current="page" className="nav-link-4 w-nav-link w--current">Home</a>
              <a href="/product" className="nav-link-4 w-nav-link">Products</a>
              <a href="/services" className="nav-link-4 w-nav-link">Services</a>
              <a href="/training" className="nav-link-4 w-nav-link">training</a>
              <a href="/contact" className="nav-link-4 w-nav-link">Contact us</a>
            </div>
          </nav>
          <div className="nav-right">
            <div data-hover="false" data-delay="600" className="social-circle w-dropdown">
              <div className="social-toggle w-dropdown-toggle">
                <img src="/images/Dark-linkedin-2.svg" loading="lazy" width={24} height={24} alt="Social links" className="social-nav-icon" />
              </div>
              <nav className="social-dropdown-list w-dropdown-list">
                <div className="social-drop-wrapper">
                  <a href="https://www.instagram.com/tycreated/" className="outline-social-icon large w-inline-block">
                    <img src="/images/Dark-instagram.svg" loading="lazy" width={24} height={24} alt="Instagram" />
                  </a>
                  <a href="https://webflow.com/" className="outline-social-icon large w-inline-block">
                    <img src="/images/Dark-facebook-f.svg" loading="lazy" width={24} height={24} alt="Facebook" />
                  </a>
                  <a href="https://webflow.com/" className="outline-social-icon large w-inline-block">
                    <img src="/images/Dark-linkedin-2.svg" loading="lazy" width={24} height={24} alt="LinkedIn" />
                  </a>
                  <a href="https://twitter.com/Tycreated" className="outline-social-icon large w-inline-block">
                    <img src="/images/dark-twitter.svg" loading="lazy" width={24} height={24} alt="Twitter" />
                  </a>
                  <div className="dropdown-corner"></div>
                </div>
              </nav>
            </div>
            <a href="/contact" className="nav-button w-inline-block">
              <div className="button-text-10">Let&apos;s talk</div>
            </a>
            <div className="menu-button-3 w-nav-button">
              <div className="menu-icon-wrapper">
                <img src="/images/menu-dark24x242x.svg" loading="lazy" width={24} height={24} alt="Menu" className="menu-icon" />
              </div>
            </div>
          </div>
        </div>
        <div id="w-node-c7db3066-8b6d-5286-e982-79d87ed2e7c8-7ed2e7a6" className="nav-cover"></div>
      </div>
    </div>
  )
}
