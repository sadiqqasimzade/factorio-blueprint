if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const d=e=>s(e,n),f={module:{uri:n},exports:t,require:d};a[n]=Promise.all(i.map((e=>f[e]||d(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/11e07bb4-2bc97d3bea982ae4.js",revision:"2bc97d3bea982ae4"},{url:"/_next/static/chunks/382-33ff282dc883b3d8.js",revision:"33ff282dc883b3d8"},{url:"/_next/static/chunks/928-ca744ac6ce1d43d6.js",revision:"ca744ac6ce1d43d6"},{url:"/_next/static/chunks/framework-a6b3d2fb26bce5d1.js",revision:"a6b3d2fb26bce5d1"},{url:"/_next/static/chunks/main-3ae2315102d581f5.js",revision:"3ae2315102d581f5"},{url:"/_next/static/chunks/pages/_app-ede2eec4ae8ca3b7.js",revision:"ede2eec4ae8ca3b7"},{url:"/_next/static/chunks/pages/_error-fde50cb7f1ab27e0.js",revision:"fde50cb7f1ab27e0"},{url:"/_next/static/chunks/pages/decode-encode-a0aa601498be4728.js",revision:"a0aa601498be4728"},{url:"/_next/static/chunks/pages/image-converter-lamp-b96a4434a3a59d0a.js",revision:"b96a4434a3a59d0a"},{url:"/_next/static/chunks/pages/image-converter-tile-cef73b55bcca2e2c.js",revision:"cef73b55bcca2e2c"},{url:"/_next/static/chunks/pages/imageConverterPage-6358f65fd26b7b0a.js",revision:"6358f65fd26b7b0a"},{url:"/_next/static/chunks/pages/index-88f3977968f7a472.js",revision:"88f3977968f7a472"},{url:"/_next/static/chunks/pages/pixel-art-tile-c78d0d4ff067234b.js",revision:"c78d0d4ff067234b"},{url:"/_next/static/chunks/pages/video-converter-e0e064f35ff9a521.js",revision:"e0e064f35ff9a521"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8cac0b4b405cede1.js",revision:"8cac0b4b405cede1"},{url:"/_next/static/css/d3b3a982e0e739d1.css",revision:"d3b3a982e0e739d1"},{url:"/_next/static/d34tDq1GJz2wqPd05vM3k/_buildManifest.js",revision:"be05a42fc48171ec155fa6d88809ecf3"},{url:"/_next/static/d34tDq1GJz2wqPd05vM3k/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/02edef4d0edfad6d-s.p.woff2",revision:"7a1a8ba6e24fecc400574e8ffe354665"},{url:"/_next/static/media/045832894acda0e9-s.p.woff2",revision:"200c41f352c466e1c2b117656a0256e8"},{url:"/_next/static/media/0881a2b922b3331e-s.woff2",revision:"a0891d7e3512851a00017bc6aa93a49a"},{url:"/_next/static/media/0e5e1c6a8db9e432-s.woff2",revision:"f201ef2b6f1307dd8b1ec0c0deffceea"},{url:"/_next/static/media/120a5a1920781bd0-s.p.woff2",revision:"8c4b05d4371467ba1d0bc60839c6dcb9"},{url:"/_next/static/media/27971e35634b7c88-s.woff2",revision:"4264bad61333859477947703b15aadfd"},{url:"/_next/static/media/279b47070a5d5877-s.woff2",revision:"f604c827dc8754b14422f431013955eb"},{url:"/_next/static/media/28aa5118b38b86e4-s.woff2",revision:"db5317b009a0dedd66dab31d7889b5f3"},{url:"/_next/static/media/2f66f084fba01545-s.woff2",revision:"8e0642a7dd6dfe9491afa20e4a470655"},{url:"/_next/static/media/31a961c285846cb0-s.woff2",revision:"dec886e2a77a7e9a04c098f19e20e1ee"},{url:"/_next/static/media/483de911b1a0d258-s.woff2",revision:"28502b06e67112e0bf77a784aee917d0"},{url:"/_next/static/media/5693677ef07d9b51-s.woff2",revision:"96b57d1ae0a86dcf7913589b27426343"},{url:"/_next/static/media/674abd25bb7be96f-s.woff2",revision:"92e5e17ec75636ec7ab5c46a00a54342"},{url:"/_next/static/media/6ebb97b5c9fa4e03-s.p.woff2",revision:"39aff03d2a35b1c80f210051f35d4b2b"},{url:"/_next/static/media/7a7012758df5a81e-s.woff2",revision:"26024640d95a44fd98f614d6f4372e4b"},{url:"/_next/static/media/7c16c8204ab29534-s.woff2",revision:"eac32b711872911e7e7c107eb7a7901a"},{url:"/_next/static/media/7d1684f14ddac155-s.woff2",revision:"604411f91e27fd9740f3c4482aef4d58"},{url:"/_next/static/media/7f9c2bb12d05b4c1-s.woff2",revision:"d11830f32f3b43ac4e4116cc6904a152"},{url:"/_next/static/media/80b1a0e600ca6d83-s.woff2",revision:"584ea11fad4f10a879c8530e7575cbbf"},{url:"/_next/static/media/82233a533941ac93-s.woff2",revision:"ac7d441c7fe6e91a0dce7510d3b3d38e"},{url:"/_next/static/media/8720059dfa14a1fe-s.woff2",revision:"1254e937b1635a843bc7bdee51de2aeb"},{url:"/_next/static/media/906678b269849541-s.woff2",revision:"21c838ead8641ef57bc94d27efcd257e"},{url:"/_next/static/media/98a28a5430a3cf7f-s.woff2",revision:"7dada9344a370f25dc1d3b7030da67b6"},{url:"/_next/static/media/994bf73bb06543dc-s.woff2",revision:"0ed4fab7b6a3e3c06f70de37b3eb5f47"},{url:"/_next/static/media/9d97415e38cab482-s.woff2",revision:"7f62fad6ca9505fd98371aa39273f8b1"},{url:"/_next/static/media/ac0efabfe978b0ad-s.woff2",revision:"ed31e4b8cd1d209be2e50af162f26e00"},{url:"/_next/static/media/cd31bf4b34f8dfb3-s.woff2",revision:"1a0c60b7297c849ea95c06380a4c0961"},{url:"/_next/static/media/d67e8433214df714-s.woff2",revision:"0cc84b2ade79f1fcfe2f0b694c51bea1"},{url:"/_next/static/media/da897b99eb1fe4a1-s.p.woff2",revision:"4903a00d1c555c0846799302c673d6a1"},{url:"/_next/static/media/df2942b6de9d14b5-s.woff2",revision:"47e8ccc33b3dcfbe6d31914569515bf4"},{url:"/_next/static/media/e22508e41752d816-s.woff2",revision:"73749e5f35230a9dd88b489e914fd4cd"},{url:"/_next/static/media/ecf49d904668b268-s.woff2",revision:"9f2ae2ca944b5bd6c3d59b01f78ec5ff"},{url:"/_next/static/media/ed37791012a28541-s.woff2",revision:"3b2d3bfbb80e64ae4ed37c15667e1736"},{url:"/_next/static/media/f1df6186c8d69644-s.woff2",revision:"307c90aaa7d9c628155ee8cb913b8382"},{url:"/_next/static/media/f756da832d8c34d4-s.woff2",revision:"ef6b28a1181a73b788c8669d6ad9adc8"},{url:"/_next/static/media/gear.3a6cf1f2.ico",revision:"72b0e300705b77b3efd070b6ec6303d3"},{url:"/css/style.min.css",revision:"963ab453c4d0cb1e6c9d5f46d520e43f"},{url:"/css/style.min.css.map",revision:"f09a3532120d14bb132ead38a1d1c057"},{url:"/imgs/card_covers/decoder.png",revision:"25a6520ba5521d41d628d2101341fbbf"},{url:"/imgs/card_covers/decoder2.png",revision:"4378344d16c3525e8f531937ab0e207a"},{url:"/imgs/card_covers/img_to_lamp.png",revision:"f7af51600aaa056f685fb88d0cde1c84"},{url:"/imgs/card_covers/img_to_tile.png",revision:"b21db261f31d08b6719d1ef8a96b9c37"},{url:"/imgs/card_covers/json_to_string.svg",revision:"57d8eafc14f059dbcd3a0fafc414e42c"},{url:"/imgs/card_covers/pixel_art_lamp.png",revision:"e7cb5f9e5a081d82fc1b1629a6918260"},{url:"/imgs/card_covers/pixel_art_tile.png",revision:"ba7449a3030b012c8045e72aa7891444"},{url:"/imgs/card_covers/video_to_lamp.gif",revision:"be7f75edf6eee8ccf35198976071a227"},{url:"/imgs/entites/arithmeticCombinator.png",revision:"d64abf04b219a548e870431c909abfc0"},{url:"/imgs/entites/constantCombinator.png",revision:"72f086ecb5a78e462dfdd22045df7c35"},{url:"/imgs/entites/lamp.png",revision:"1e130a097eb8d20226835a24cd96e7e5"},{url:"/imgs/entites/steelPole.png",revision:"fd171740126aa65bc4b90081a9f1f4bb"},{url:"/imgs/entites/substation.png",revision:"65d24ffe6440eca3eeab70058196fe37"},{url:"/imgs/favicons/android-chrome-192x192.png",revision:"90571e40d9ee35685c45aace58bb2b97"},{url:"/imgs/favicons/android-chrome-512x512.png",revision:"c3de8d12afce63fcda7180d270f02ab9"},{url:"/imgs/favicons/apple-touch-icon.png",revision:"1544b76a5d3eff438ae7e91c662b0fc0"},{url:"/imgs/favicons/favicon-16x16.png",revision:"8a9c6df0d7b7e77a6b70e46ed83d5d77"},{url:"/imgs/favicons/favicon-32x32.png",revision:"6c5df9b93e0fe098e80d06f69e36fa6d"},{url:"/imgs/favicons/favicon.ico",revision:"1ba815694a6a21238b6fa4f591cd6386"},{url:"/imgs/gear.ico",revision:"72b0e300705b77b3efd070b6ec6303d3"},{url:"/imgs/post_covers/Cover.gif",revision:"13013df5e2266a16370b8fa5102269c5"},{url:"/imgs/post_covers/Cover.png",revision:"593f9247947200436f648c7cb0401b7a"},{url:"/manifest.json",revision:"70aa56c9a46b541dbc596b80a7d6e2bd"},{url:"/robots.txt",revision:"388ed88eec82ddeacbf877ee7dc4b225"},{url:"/sitemap.xml",revision:"773e041e6b928425cf010a5a5ec1e184"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
