'use strict';
(() => {
 const button=document.getElementById('support-theme');
 function set(theme){document.documentElement.dataset.theme=theme;button.textContent=theme==='dark'?'Light theme':'Dark theme';}
 try{set(localStorage.getItem('infra-path.theme')==='dark'?'dark':'light')}catch{set('light')}
 button.onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';set(next);try{localStorage.setItem('infra-path.theme',next)}catch{}};
})();
