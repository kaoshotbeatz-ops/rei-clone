/* REI store fix: replace Squarespace's dead add-to-cart buttons with real Stripe checkout links. */
(function(){
  var L={
    earlyBird:'https://buy.stripe.com/3cIbJ2ggK30y3U84Swew810',   // $600
    general:'https://buy.stripe.com/6oU28saWq58G0HW70Eew817',      // $750
    bws:'https://buy.stripe.com/28E14o6Gabx40HWckYew811',          // $25
    platinum:'https://buy.stripe.com/cNidRae8C7gO76kacQew812',
    gold:'https://buy.stripe.com/eVqaEY3tYbx4cqEfxaew813',
    silver:'https://buy.stripe.com/4gM28s5C6eJgbmA84Iew814',
    community:'https://buy.stripe.com/eVq14oaWq58G1M03Osew815',
    supporting:'https://buy.stripe.com/aFa14od4y58G62g84Iew816'
  };
  function tierLink(t){t=(t||'').toLowerCase();
    if(t.indexOf('platinum')>-1)return L.platinum;
    if(t.indexOf('gold')>-1)return L.gold;
    if(t.indexOf('silver')>-1)return L.silver;
    if(t.indexOf('community')>-1)return L.community;
    if(t.indexOf('support')>-1)return L.supporting;   // supportive / supporting
    return null;}
  function selectedTier(sel){ if(!sel)return null; var o=sel.options[sel.selectedIndex]; return tierLink(o?o.text:sel.value); }
  function productLink(card){
    var t=(card&&card.textContent||'').toLowerCase();
    if(t.indexOf('black wall street')>-1)return L.bws;
    if(t.indexOf('general registration')>-1)return L.general;
    if(t.indexOf('early bird')>-1)return L.earlyBird;
    var ti=tierLink(t); if(ti)return ti;
    return null;
  }
  function cardOf(el){var n=el;for(var i=0;i<12&&n;i++){n=n.parentElement;if(!n)break;
    var x=n.textContent||'';
    if(/\$\s?[0-9]/.test(x)&&/(sponsor|registration|tour|early bird|black wall)/i.test(x)&&x.length<1600)return n;}
    return el.parentElement;}
  function convert(w){
    if(w.__reiDone)return;
    var card=cardOf(w);
    var sel=card&&card.querySelector&&card.querySelector('select');
    var isSponsor=!!sel || /sponsor/i.test((card&&card.textContent)||'');
    var url = isSponsor ? (selectedTier(sel)||L.platinum) : productLink(card);
    if(!url)return;
    w.__reiDone=1;
    var a=document.createElement('a');
    a.href=url; a.setAttribute('rel','noopener');
    a.style.cssText='display:block;text-decoration:none;color:inherit;cursor:pointer';
    var clone=w.cloneNode(true);
    clone.classList.remove('sqs-add-to-cart-button-wrapper');
    clone.classList.remove('product-add-to-cart-button-wrapper');
    clone.style.pointerEvents='none';
    w.parentNode.insertBefore(a,w);
    a.appendChild(clone);
    w.parentNode.removeChild(w);
    /* sponsor: the button always points straight at the CURRENTLY-selected tier's Stripe checkout */
    if(isSponsor&&sel){ sel.addEventListener('change',function(){ var u=selectedTier(sel); if(u)a.href=u; }); }
  }
  function run(){var q=document.querySelectorAll('.sqs-add-to-cart-button-wrapper');for(var i=0;i<q.length;i++)convert(q[i]);}
  function boot(){run();[300,900,1800,3200].forEach(function(ms){setTimeout(run,ms);});}
  if(document.readyState!=='loading')boot();else document.addEventListener('DOMContentLoaded',boot);
})();
