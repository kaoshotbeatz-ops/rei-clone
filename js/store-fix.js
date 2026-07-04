/* REI store fix: replace Squarespace's dead add-to-cart buttons with real Stripe checkout links. */
(function(){
  var L={
    earlyBird:'https://buy.stripe.com/3cIbJ2ggK30y3U84Swew810',   // $600
    general:'https://buy.stripe.com/6oU28saWq58G0HW70Eew817',      // $750
    bws:'https://buy.stripe.com/28E1ao6Gabx40HWckYew811',          // $25
    platinum:'https://buy.stripe.com/cNidRae8C7g076kacQew812',
    gold:'https://buy.stripe.com/eVqaEY3tYbx4cqEfxaew813',
    silver:'https://buy.stripe.com/4gM28s5C6eJgbmA84Iew814',
    community:'https://buy.stripe.com/eVq14oaWq58G1M03Osew815',
    supporting:'https://buy.stripe.com/aFa14od4y58G62g84Iew816'
  };
  var SPONSOR_PAGE='/events/p/sponsor-registration.html';
  function tier(t){t=(t||'').toLowerCase();
    if(t.indexOf('platinum')>-1)return L.platinum;
    if(t.indexOf('gold')>-1)return L.gold;
    if(t.indexOf('silver')>-1)return L.silver;
    if(t.indexOf('community')>-1)return L.community;
    if(t.indexOf('support')>-1)return L.supporting;
    return null;}
  function urlFor(card){
    if(!card)return null;
    if(card.querySelector&&card.querySelector('select'))return SPONSOR_PAGE; /* sponsor: pick tier on detail page */
    var t=(card.textContent||'').toLowerCase();
    if(t.indexOf('black wall street')>-1)return L.bws;
    if(t.indexOf('general registration')>-1)return L.general;
    if(t.indexOf('early bird')>-1)return L.earlyBird;
    if(/sponsor/.test(t))return SPONSOR_PAGE;
    var ti=tier(t); if(ti)return ti;
    return null;
  }
  function cardOf(el){var n=el;for(var i=0;i<12&&n;i++){n=n.parentElement;if(!n)break;
    var x=n.textContent||'';
    if(/\$\s?[0-9]/.test(x)&&/(sponsor|registration|tour|early bird|black wall)/i.test(x)&&x.length<1600)return n;}
    return el.parentElement;}
  function convert(w){
    if(w.__reiDone)return;
    var url=urlFor(cardOf(w)); if(!url)return;
    w.__reiDone=1;
    var a=document.createElement('a');
    a.href=url; a.setAttribute('rel','noopener');
    a.style.cssText='display:block;text-decoration:none;color:inherit;cursor:pointer';
    var clone=w.cloneNode(true);                 /* cloneNode drops Squarespace's event listeners */
    clone.style.pointerEvents='none';            /* every click falls through to the anchor */
    w.parentNode.insertBefore(a,w);
    a.appendChild(clone);
    w.parentNode.removeChild(w);                 /* remove original (with its dead SS handlers) */
  }
  function run(){var q=document.querySelectorAll('.sqs-add-to-cart-button-wrapper');for(var i=0;i<q.length;i++)convert(q[i]);}
  function boot(){run();[300,900,1800,3200].forEach(function(ms){setTimeout(run,ms);});}
  if(document.readyState!=='loading')boot();else document.addEventListener('DOMContentLoaded',boot);
})();
