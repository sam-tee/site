// Theme init runs immediately (this file loads in <head> without defer so the
// correct theme applies before first paint — no flash of wrong theme).
(function(){
  var theme=null;
  try{theme=localStorage.getItem('theme')}catch(e){}
  if(!theme){theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
  document.documentElement.dataset.theme=theme;

  function syncMeta(t){
    var mc=document.querySelector('meta[name="theme-color"]');
    if(mc)mc.setAttribute('content',t==='light'?'#f0f0f0':'#101010');
  }
  syncMeta(theme);

  function syncBtn(t){
    var btn=document.getElementById('theme-toggle');
    if(!btn)return;
    btn.removeAttribute('hidden');
    var light=t==='light';
    btn.setAttribute('aria-pressed',light?'true':'false');
    var l='Switch to '+(light?'dark':'light')+' mode';
    btn.setAttribute('aria-label',l);
    btn.setAttribute('title',l);
  }

  function toggleTheme(){
    var n=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=n;
    try{localStorage.setItem('theme',n)}catch(e){}
    syncMeta(n);
    syncBtn(n);
  }

  function init(){
    syncBtn(document.documentElement.dataset.theme);
    var btn=document.getElementById('theme-toggle');
    if(btn){btn.addEventListener('click',toggleTheme);}
    var hd=document.querySelector('header');
    var rule=document.querySelector('.masthead');
    function onS(){
      var show;
      if(rule&&hd){show=rule.getBoundingClientRect().top+4<hd.offsetHeight;}
      else{show=window.scrollY>8;}
      if(hd)hd.classList.toggle('scrolled',show);
    }
    window.addEventListener('scroll',onS,{passive:true});
    onS();
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
})();
