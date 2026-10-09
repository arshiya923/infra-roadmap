'use strict';
(()=>{
 document.getElementById('preview-tool').innerHTML=window.OspfDrBdrModels.html('ospf-dr-bdr');
 window.OspfDrBdrModels.mount('ospf-dr-bdr');
 document.getElementById('preview-theme').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';document.getElementById('preview-theme').textContent=dark?'Light theme':'Dark theme';});
})();
