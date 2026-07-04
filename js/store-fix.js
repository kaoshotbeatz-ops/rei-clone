/* REI store fix: replace Squarespace's dead add-to-cart buttons with Stripe checkout links. */
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
    var sel=card.querySelector&&card.querySelector('select');
    if(sel){var o=sel.options[sel.selectedIndex];var byv=tier(o?o.text:sel.value);return byv||SPONSOR_PAGE;}
    var t=(card.textContent||'').toLowerCase();
    if(t.indexOf('black wall street')>-1)return L.bws;
    if(t.indexOf('general registration')>-1)return L.general;
    if(t.indexOf('early bird')>-1)return L.earlyBird;
    var ti=tier(t); if(ti)return ti;
    return null;
  }
  function cardOf(el){var n=el;for(var i=0;i<12&&n;i++){n=n.parentElement;if(!n)break;
    var x=n.textContent||'';
    if(/\$\s?[0-9]/.test(x)&&/(sponsor|registration|tour|early bird|black wall)/i.test(x)&&x.length<900)return n;}
    return el.parentElement;}
  function wire(){
    var q=document.querySelectorAll('.sqs-add-to-cart-button-wrapper,.product-add-to-cart-button-wrapper,.sqs-add-to-cart-button');
    for(var i=0;i<q.length;i++){(function(b){
      if(b.__reiWired)return;b.__reiWired=1;
      b.addEventListener('click',function(e){
        var u=urlFor(cardOf(b));
        if(u){e.preventDefault();e.stopImmediatePropagation();window.location.href=u;}
      },true);
      b.style.cursor='pointer';
    })(q[i]);}
  }
  function boot(){wire();[400,1000,2000,3500].forEach(function(ms){setTimeout(wire,ms);});}
  if(document.readyState!=='loading')boot();else document.addEventListener('DOMContentLoaded',boot);
})();
