if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const c=e=>n(e,d),f={module:{uri:d},exports:o,require:c};i[d]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"7884180cf6adb53fc72a4d7e7c033ce6"},{url:"android-chrome-512x512.png",revision:"4c55f62459d56b3373f05f41343edf1d"},{url:"apple-touch-icon.png",revision:"430ce72357f61f3c3e33ddceff52e7a5"},{url:"assets/index-gmp3FNUf.css",revision:null},{url:"assets/index-XAoo-SNe.js",revision:null},{url:"assets/logo-BRrFiJ8B.svg",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"favicon-16x16.png",revision:"49cd32cbd2d1a46a5bee5f88413db33f"},{url:"favicon-32x32.png",revision:"b72494a82f27cecde64c5213979033e5"},{url:"favicon.ico",revision:"28c415a47ee1e610c630b0a0fd007da0"},{url:"index.html",revision:"bbd2944a1b3bf8fc851dd2c12aea51b6"},{url:"mstile-144x144.png",revision:"1327405c2d1c914ba3bb21975c01bff1"},{url:"mstile-150x150.png",revision:"f8a53fb2228a86f1e45fe705e035c148"},{url:"mstile-310x150.png",revision:"d2e28358a6dd84e814543c0782253b7a"},{url:"mstile-310x310.png",revision:"e6d9d4533a322c88284114915ed482e3"},{url:"mstile-70x70.png",revision:"a6f984a7f01c27e4ebdc333a49e065d7"},{url:"safari-pinned-tab.svg",revision:"c48f08942dd16583b06edd939dd67c10"},{url:"./android-chrome-192x192.png",revision:"7884180cf6adb53fc72a4d7e7c033ce6"},{url:"./android-chrome-512x512.png",revision:"4c55f62459d56b3373f05f41343edf1d"},{url:"manifest.webmanifest",revision:"cc0f0ac1d1997774e64da1237033b9d6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
