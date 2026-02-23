import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Home I Welcome to Cosmicstar Technologies',
  description: 'CosmicStar Technologies, an innovative startup based in Bangalore, specializes in CAD, 2D and 3D CAD, 3D modeling, BIM, rendering, energy analysis, quality control, and BIM training. As a digital transformation partner, we are the gateway to BIM construction excellence in the AECO industry in India.',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/webclip.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-wf-page="65bdd6c3b9c6d94b41f16298" data-wf-site="65953fa664109bab8c702cf2">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="generator" content="Webflow" />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/mycosmicstar.webflow.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
                script.onload = function() {
                  WebFont.load({
                    google: {
                      families: ["Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic","Oswald:200,300,400,500,600,700","Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Inter:300,400,500,600,700"]
                    }
                  });
                };
                document.head.appendChild(script);
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
/*width*/
#scrollbar::-webkit-scrollbar {
width:5px;
height: 0px;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) {
  #scrollbar::-webkit-scrollbar { width:0px; height: 0px;}
}
/*track*/
#scrollbar::-webkit-scrollbar-track {
background:rgba(243, 246, 252, 0);
border-radius:25px;
}
/*thumb*/
#scrollbar::-webkit-scrollbar-thumb {
background:#e2e7f1;
border-radius:25px;
}
#scrollbar::-webkit-scrollbar-thumb:hover {
background: #090b19;
}
`,
          }}
        />
      </head>
      <body className="body">
        {children}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=65953fa664109bab8c702cf2"
          strategy="beforeInteractive"
        />
        <Script src="/js/webflow.js" strategy="afterInteractive" />
        <Script src="https://min30327.github.io/luxy.js/dist/js/luxy.js" strategy="afterInteractive" />
        <Script
          id="luxy-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
              if (!isMobile) {
                luxy.init({
                  wrapper: '#luxy',
                  wrapperSpeed: 0.065,
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
