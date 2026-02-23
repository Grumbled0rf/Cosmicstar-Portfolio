'use client'

export default function MenuNav() {
  return (
    <div className="menu-outer">
      <div className="menu-inner">
        <a href="/" aria-current="page" className="w-inline-block w--current">
          <img
            src="/images/icon_white__blue_icon.avif"
            loading="lazy"
            width={50}
            sizes="(max-width: 1439px) 50px, (max-width: 1919px) 3vw, 50px"
            alt=""
            srcSet="/images/icon_white__blue_icon-p-500.png 500w, /images/icon_white__blue_icon.avif 1955w"
          />
        </a>
        <a href="/product" className="menu-link w-inline-block">
          <div>Products</div>
        </a>
        <a href="https://academy.mycosmicstar.com/" target="_blank" className="menu-link w-inline-block">
          <div>Academy</div>
        </a>
        <a href="/training" className="menu-link w-inline-block">
          <div>Join Training</div>
        </a>
        <a href="/services" className="menu-link w-inline-block">
          <div>Services</div>
        </a>
        <a href="/contact" className="menu-link get-in-touch w-inline-block">
          <div>Let&apos;s Talk</div>
        </a>
      </div>
    </div>
  )
}
