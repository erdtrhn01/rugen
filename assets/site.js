(function(){
  // ============================================================= language ==
  var LANG_KEY = 'rugen_lang';
  var LANG = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'tr';

  // strings rendered by JS (the rest live as data-en attributes in the HTML)
  var STR = {
    cartEmpty:      ['Sepetiniz boş.', 'Your cart is empty.'],
    remove:         ['Kaldır', 'Remove'],
    roleUser:       ['Kullanıcı', 'User'],
    roleSeller:     ['Satıcı', 'Seller'],
    signedInAs:     ['%s olarak giriş yaptınız.', 'You are signed in as a %s.'],
    loginUserSub:   ['Ürün kontrol paneliniz için giriş yapın.', 'Sign in to your product dashboard.'],
    loginSellerSub: ['Bayi paneliniz için giriş yapın.', 'Sign in to your dealer panel.'],
    kasaEmpty:      ['Henüz kayıtlı ürününüz yok.<br>Soldaki formdan seri numaranızı girerek garanti sürecini başlatabilirsiniz.',
                     'You have no registered products yet.<br>Use the form to enter your serial number and start the warranty process.'],
    records:        ['%s kayıt', '%s records'],
    warrantyOk:     ['Garanti Kapsamında', 'Under Warranty'],
    warrantyEnded:  ['Garanti Süresi Doldu', 'Warranty Expired'],
    purchase:       ['Satın Alma', 'Purchase'],
    warrantyEnd:    ['Garanti Bitiş', 'Warranty Ends'],
    place:          ['Satın Alınan Yer', 'Place of Purchase'],
    history:        ['Kayıt Geçmişi', 'Record History'],
    serviceReq:     ['Servis Talebi', 'Service Request'],
    exchangeReq:    ['Değişim Talebi', 'Replacement Request'],
    deleteRec:      ['Kaydı Sil', 'Delete Record'],
    logRegister:    ['Ürün kaydedildi, garanti süreci başlatıldı.', 'Product registered; the warranty process has started.'],
    logService:     ['Servis talebi oluşturuldu. Ekibimiz sizinle iletişime geçecek.', 'Service request created. Our team will contact you.'],
    logExchange:    ['Değişim talebi oluşturuldu. Talebiniz inceleniyor.', 'Replacement request created. Your request is being reviewed.'],
    dupSerial:      ['Bu seri numarası zaten kayıtlı.', 'This serial number is already registered.'],
    regOk:          ['Kayıt oluşturuldu. Garanti süreciniz başlatıldı.', 'Record created. Your warranty process has started.'],
    badCreds:       ['Yanlış e-posta veya parola.', 'Incorrect email or password.'],
    unlocking:      ['Kasa açılıyor', 'Unlocking'],
    st_pending:      ['İnceleniyor', 'Under Review'],
    st_approved:     ['Onaylandı', 'Approved'],
    st_production:   ['Üretim Bandında', 'On the Line'],
    st_packaging:    ['Hazırlanıyor', 'Preparing'],
    st_handed:       ['Sevkiyata Verildi', 'Dispatched'],
    st_transit:      ['Transferde', 'In Transit'],
    st_distribution: ['Dağıtımda', 'Out for Delivery'],
    st_delivered:    ['Teslim Edildi', 'Delivered'],
    typeRequest:     ['Talep', 'Request'],
    typeOrder:       ['Sipariş', 'Order'],
    noActive:       ['Takip edilen aktif siparişiniz yok.<br>Ürünler sayfasından sepete ekleyerek sipariş verebilirsiniz.',
                     'You have no active orders to track.<br>Add products to your cart from the Products page to place one.'],
    items:          ['%s kalem', '%s items'],
    completed:      ['Tamamlandı', 'Completed'],
    orderCount:     ['%s sipariş', '%s orders'],
    ckEmpty:        ['Sepetiniz boş.<br>Ürünler sayfasından ürün ekleyin.',
                     'Your cart is empty.<br>Add products from the Products page.'],
    ckPlaced:       ['Ödeme alındı. Siparişlerim sayfasına yönlendiriliyorsunuz…',
                     'Payment received. Redirecting to My Orders…'],
    cardIncomplete: ['Lütfen kart bilgilerini eksiksiz girin.', 'Please fill in all card details.'],
    reqEmpty:       ['Talep listeniz boş.<br>Ürünler sayfasından ürün ekleyin.', 'Your request list is empty.<br>Add products from the Products page.'],
    reqPlaced:      ['Talebiniz alındı. Siparişlerim sayfasına yönlendiriliyorsunuz…', 'Your request has been submitted. Redirecting to My Orders…'],
    regFill:        ['Lütfen zorunlu alanları doldurun.', 'Please fill in the required fields.'],
    regShortPass:   ['Parola en az 6 karakter olmalı.', 'Password must be at least 6 characters.'],
    regExists:      ['Bu e-posta zaten kayıtlı.', 'This email is already registered.'],
    regDone:        ['Hesabınız oluşturuldu. Giriş yapabilirsiniz.', 'Your account has been created. You can sign in now.'],
    contactFill:    ['Lütfen zorunlu alanları doldurun.', 'Please fill in the required fields.'],
    contactSent:    ['Mesajınız alındı. En kısa sürede dönüş yapacağız.', 'Your message has been received. We will get back to you soon.']
  };
  function t(key){ return STR[key][LANG === 'en' ? 1 : 0]; }

  function applyLang(){
    document.documentElement.lang = LANG;
    document.body.classList.toggle('lang-en', LANG === 'en');

    // swap only the element's own first text node, so child elements
    // (links, inputs, <span> accents) survive the translation
    document.querySelectorAll('[data-en]').forEach(function(el){
      var node = null;
      for(var i = 0; i < el.childNodes.length; i++){
        var n = el.childNodes[i];
        if(n.nodeType === 3 && n.nodeValue.trim()){ node = n; break; }
      }
      if(!node){
        if(!el.hasAttribute('data-tr')) el.setAttribute('data-tr', el.textContent);
        el.textContent = el.getAttribute(LANG === 'en' ? 'data-en' : 'data-tr');
        return;
      }
      if(!el.hasAttribute('data-tr')) el.setAttribute('data-tr', node.nodeValue.trim());
      var raw = node.nodeValue;
      var lead = raw.match(/^\s*/)[0];
      var tail = raw.match(/\s*$/)[0];
      node.nodeValue = lead + el.getAttribute(LANG === 'en' ? 'data-en' : 'data-tr') + tail;
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(function(el){
      if(!el.hasAttribute('data-tr-placeholder')) el.setAttribute('data-tr-placeholder', el.getAttribute('placeholder'));
      el.setAttribute('placeholder', el.getAttribute(LANG === 'en' ? 'data-en-placeholder' : 'data-tr-placeholder'));
    });

    var lt = document.getElementById('langToggle');
    if(lt) lt.setAttribute('aria-checked', LANG === 'en' ? 'true' : 'false');

    if(typeof renderCart === 'function') renderCart();
    if(typeof renderKasa === 'function') renderKasa();
    if(typeof applySession === 'function') applySession();
    if(typeof refreshLoginSub === 'function') refreshLoginSub();
    if(typeof renderOrders === 'function') renderOrders();
    if(typeof renderCheckout === 'function') renderCheckout();
    if(window.RUGEN && typeof window.RUGEN.renderRequest === 'function') window.RUGEN.renderRequest();
    fillStock();
  }

  // single source of truth for stock: fill every stock label from window.RUGEN.STOCK
  function slugFromCard(el){
    var card = el.closest('.product-card');
    if(!card) return null;
    var href = card.getAttribute('href') || '';
    var m = href.match(/([a-z0-9-]+)\.html/);
    return m ? m[1] : null;
  }
  function fillStock(){
    var STK = (window.RUGEN && window.RUGEN.STOCK) || {};
    document.querySelectorAll('.pdp-stock[data-stock-slug]').forEach(function(el){
      var n = STK[el.getAttribute('data-stock-slug')];
      if(n == null) return;
      el.textContent = LANG === 'en' ? ('Stock: ' + n + ' units') : ('Stok: ' + n + ' adet');
    });
    document.querySelectorAll('.stock.gated').forEach(function(el){
      var slug = slugFromCard(el);
      var n = slug != null ? STK[slug] : null;
      if(n == null){ el.textContent = ''; return; }
      el.textContent = LANG === 'en' ? ('Stock: ' + n) : ('Stok: ' + n);
    });
  }

  var header = document.getElementById('siteHeader');
  var darkSections = document.querySelectorAll('.bg-dark');

  function updateHeader(){
    var y = window.scrollY + 40;
    var onDark = false;
    darkSections.forEach(function(sec){
      var r = sec.getBoundingClientRect();
      var top = r.top + window.scrollY;
      if(y >= top && y <= top + r.height) onDark = true;
    });
    header.classList.toggle('on-dark', onDark);
  }
  window.addEventListener('scroll', updateHeader, {passive:true});
  updateHeader();

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id && id.length > 1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // ---------------------------------------------------------- mobile menu --
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('nav.links');

  function closeMenu(){
    if(!navLinks || !navLinks.classList.contains('open')) return;
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
  }
  function openMenu(){
    navLinks.classList.add('open');
    menuToggle.classList.add('open');
  }
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', function(e){
      e.stopPropagation();
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    navLinks.addEventListener('click', function(e){
      if(e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('click', function(e){
      if(!navLinks.classList.contains('open')) return;
      if(navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
      closeMenu();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeMenu();
    });
    window.addEventListener('scroll', closeMenu, {passive:true});
  }

  // ---------------------------------------------------------------- cart ---
  var CART_KEY = 'rugen_cart';

  function getCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveCart(items){
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    renderCart();
  }
  function formatPrice(n){
    return '₺' + n.toLocaleString(LANG === 'en' ? 'en-US' : 'tr-TR');
  }

  var cartItemsEl = document.getElementById('cartItems');
  var cartTotalEl = document.getElementById('cartTotal');
  var cartCountEls = document.querySelectorAll('.cart-count');

  function renderCart(){
    var items = getCart();
    var count = items.reduce(function(sum, it){ return sum + it.qty; }, 0);
    cartCountEls.forEach(function(el){
      el.textContent = count;
      el.hidden = count === 0;
    });
    if(!cartItemsEl) return;

    if(items.length === 0){
      cartItemsEl.innerHTML = '<p class="cart-empty">' + t('cartEmpty') + '</p>';
    } else {
      cartItemsEl.innerHTML = items.map(function(it){
        return '<div class="cart-item" data-slug="' + it.slug + '">' +
          '<div>' +
            '<div class="ci-name">' + it.name + '</div>' +
            '<div class="ci-meta">' +
              '<button class="ci-qty-btn" data-action="dec">−</button>' +
              '<span>' + it.qty + '</span>' +
              '<button class="ci-qty-btn" data-action="inc">+</button>' +
              '<button class="ci-remove" data-action="remove">' + t('remove') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="ci-price">' + formatPrice(it.price * it.qty) + '</div>' +
        '</div>';
      }).join('');
    }
    if(cartTotalEl){
      var total = items.reduce(function(sum, it){ return sum + it.price * it.qty; }, 0);
      cartTotalEl.textContent = formatPrice(total);
    }
  }

  function addToCart(slug, name, price){
    var items = getCart();
    var existing = items.find(function(it){ return it.slug === slug; });
    if(existing){ existing.qty += 1; }
    else { items.push({slug: slug, name: name, price: price, qty: 1}); }
    saveCart(items);
  }

  var cartToggle = document.getElementById('cartToggle');
  var cartClose = document.getElementById('cartClose');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartDrawer = document.getElementById('cartDrawer');

  function openCart(){
    if(!cartDrawer) return;
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
  function closeCart(){
    if(!cartDrawer) return;
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
  if(cartToggle){ cartToggle.addEventListener('click', function(){
    if(cartDrawer.classList.contains('open')){ closeCart(); }
    else { closeLogin(); openCart(); }
  }); }
  if(cartClose){ cartClose.addEventListener('click', closeCart); }
  if(cartOverlay){ cartOverlay.addEventListener('click', closeCart); }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeCart();
  });

  // --------------------------------------------------------------- login ---
  var loginToggle = document.getElementById('loginToggle');
  var loginClose = document.getElementById('loginClose');
  var loginOverlay = document.getElementById('loginOverlay');
  var loginModal = document.getElementById('loginModal');
  var loginForm = document.getElementById('loginForm');

  function iconOffset(){
    if(!loginToggle) return null;
    var r = loginToggle.getBoundingClientRect();
    return {
      dx: (r.left + r.width / 2) - window.innerWidth / 2,
      dy: (r.top + r.height / 2) - window.innerHeight / 2
    };
  }
  function atIcon(){
    var o = iconOffset();
    if(!o) return 'translate(-50%,-50%) scale(.9)';
    return 'translate(calc(-50% + ' + o.dx + 'px), calc(-50% + ' + o.dy + 'px)) scale(.12)';
  }
  function openLogin(){
    if(!loginModal) return;
    closeCart();
    // start collapsed on the header icon, then expand to the centre
    loginModal.style.transition = 'none';
    loginModal.style.transform = atIcon();
    loginModal.style.opacity = '0';
    void loginModal.offsetWidth;
    loginModal.style.transition = '';
    loginModal.style.transform = '';
    loginModal.style.opacity = '';
    loginModal.classList.add('open');
    loginOverlay.classList.add('open');
  }
  function closeLogin(){
    if(!loginModal || !loginModal.classList.contains('open')) return;
    loginModal.style.transform = atIcon();
    loginModal.style.opacity = '0';
    loginModal.classList.remove('open');
    loginOverlay.classList.remove('open');
    setTimeout(function(){
      if(!loginModal.classList.contains('open')){
        loginModal.style.transform = '';
        loginModal.style.opacity = '';
      }
    }, 520);
  }
  if(loginToggle){ loginToggle.addEventListener('click', function(){
    loginModal.classList.contains('open') ? closeLogin() : openLogin();
  }); }
  if(loginClose){ loginClose.addEventListener('click', closeLogin); }
  if(loginOverlay){ loginOverlay.addEventListener('click', closeLogin); }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLogin();
  });
  var roleSwitch = document.getElementById('roleSwitch');
  var loginSub = document.querySelector('.login-state.out .login-sub');
  function refreshLoginSub(){
    if(loginSub) loginSub.textContent = t(pendingRole === 'seller' ? 'loginSellerSub' : 'loginUserSub');
  }
  function roleName(r){ return r === 'seller' ? t('roleSeller') : t('roleUser'); }
  var pendingRole = 'user';

  if(roleSwitch){
    roleSwitch.addEventListener('click', function(e){
      var opt = e.target.closest('.role-opt');
      if(!opt) return;
      pendingRole = opt.getAttribute('data-role');
      roleSwitch.querySelectorAll('.role-opt').forEach(function(o){
        var on = o === opt;
        o.classList.toggle('active', on);
        o.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      refreshLoginSub();
    });
  }

  // ------------------------------------------------------------- session ---
  var SESSION_KEY = 'rugen_session';

  function getSession(){
    try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch(e){ return null; }
  }
  function applySession(){
    var s = getSession();
    document.body.classList.toggle('logged-in', !!s);
    document.body.classList.toggle('role-user', !!s && s.role === 'user');
    document.body.classList.toggle('role-seller', !!s && s.role === 'seller');

    var iu = document.querySelector('.iface-user');
    var isel = document.querySelector('.iface-seller');
    if(iu)   iu.style.display   = (s && s.role === 'user')   ? 'block' : 'none';
    if(isel) isel.style.display = (s && s.role === 'seller') ? 'block' : 'none';

    var roleText = document.getElementById('accountRoleText');
    var roleNameEl = document.getElementById('accountRoleName');
    var emailEl  = document.getElementById('accountEmail');
    if(s){
      if(roleText) roleText.textContent = t('signedInAs').replace('%s', roleName(s.role));
      if(roleNameEl) roleNameEl.textContent = roleName(s.role);
      if(emailEl)  emailEl.textContent = s.email || '—';
    }
  }
  function setSession(role, email){
    localStorage.setItem(SESSION_KEY, JSON.stringify({role: role, email: email}));
    applySession();
  }
  function clearSession(){
    localStorage.removeItem(SESSION_KEY);
    applySession();
  }

  var ACCOUNTS = {
    'user@rugen.com':   { pass: 'user1234',   role: 'user'   },
    'seller@rugen.com': { pass: 'seller1234', role: 'seller' }
  };
  var ACCT_KEY = 'rugen_accounts';
  function storedAccounts(){
    try{ return JSON.parse(localStorage.getItem(ACCT_KEY)) || {}; }
    catch(e){ return {}; }
  }
  function findAccount(email){
    return ACCOUNTS[email] || storedAccounts()[email] || null;
  }
  function pagePrefix(){
    return /\/products\//.test(location.pathname) ? '../' : '';
  }

  function runVaultTransition(role){
    var vt = document.getElementById('vaultTransition');
    var go = function(){ location.href = pagePrefix() + 'index.html'; };
    if(!vt){ go(); return; }
    vt.classList.add('show');
    requestAnimationFrame(function(){ vt.classList.add('spin'); });
    // let the lock turn, then a quick zoom into the vault
    setTimeout(function(){ vt.classList.add('zoom'); }, 1200);
    setTimeout(go, 2200);
  }

  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      var errEl = document.getElementById('loginError');
      var email = (loginForm.querySelector('input[name="email"]').value || '').trim().toLowerCase();
      var pass  = loginForm.querySelector('input[name="password"]').value || '';
      var acct  = findAccount(email);

      if(!acct || acct.pass !== pass){
        if(errEl) errEl.textContent = t('badCreds');
        return;
      }
      if(acct.role !== pendingRole){
        if(errEl) errEl.textContent = t('badCreds');
        return;
      }
      if(errEl) errEl.textContent = '';
      setSession(acct.role, email);
      loginForm.reset();
      closeLogin();
      runVaultTransition(acct.role);
    });
  }
  var logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
      clearSession();
      closeLogin();
      location.href = pagePrefix() + 'index.html';
    });
  }
  applySession();

  if(cartItemsEl){
    cartItemsEl.addEventListener('click', function(e){
      var btn = e.target.closest('button[data-action]');
      if(!btn) return;
      var row = btn.closest('.cart-item');
      var slug = row.getAttribute('data-slug');
      var items = getCart();
      var idx = items.findIndex(function(it){ return it.slug === slug; });
      if(idx === -1) return;
      var action = btn.getAttribute('data-action');
      if(action === 'inc') items[idx].qty += 1;
      if(action === 'dec') items[idx].qty = Math.max(1, items[idx].qty - 1);
      if(action === 'remove') items.splice(idx, 1);
      saveCart(items);
    });
  }

  function flyToCart(sourceEl, onArrive){
    if(!sourceEl || !cartToggle){ if(onArrive) onArrive(); return; }
    var srcRect = sourceEl.getBoundingClientRect();
    var dstRect = cartToggle.getBoundingClientRect();
    var clone = sourceEl.cloneNode(true);
    clone.classList.add('fly-clone');
    clone.style.left = srcRect.left + 'px';
    clone.style.top = srcRect.top + 'px';
    clone.style.width = srcRect.width + 'px';
    clone.style.height = srcRect.height + 'px';
    clone.style.margin = '0';
    clone.style.transition = 'transform .65s cubic-bezier(.5,-0.2,.7,.4), opacity .65s ease .15s';
    document.body.appendChild(clone);

    var dx = (dstRect.left + dstRect.width / 2) - (srcRect.left + srcRect.width / 2);
    var dy = (dstRect.top + dstRect.height / 2) - (srcRect.top + srcRect.height / 2);

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        clone.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0.08)';
        clone.style.opacity = '0.15';
      });
    });

    var done = false;
    function finish(){
      if(done) return;
      done = true;
      clone.remove();
      if(onArrive) onArrive();
    }
    clone.addEventListener('transitionend', finish);
    setTimeout(finish, 750);
  }

  document.querySelectorAll('.add-cart').forEach(function(btn){
    btn.addEventListener('click', function(){
      var slug = btn.getAttribute('data-slug');
      var name = btn.getAttribute('data-name');
      var price = parseFloat(btn.getAttribute('data-price'));

      var visual = document.querySelector('.pdp-visual svg');
      flyToCart(visual, function(){
        if(slug && name && !isNaN(price)) addToCart(slug, name, price);
        openCart();
        if(cartToggle){
          cartToggle.classList.remove('bump');
          void cartToggle.offsetWidth;
          cartToggle.classList.add('bump');
        }
      });

      if(btn.classList.contains('added')) return;
      btn.classList.add('added');
      setTimeout(function(){ btn.classList.remove('added'); }, 2200);
    });
  });

  renderCart();

  // ------------------------------------------------- kasa (product vault) --
  var KASA_KEY = 'rugen_kasa';
  var kasaForm  = document.getElementById('kasaForm');
  var kasaList  = document.getElementById('kasaList');
  var kasaCount = document.getElementById('kasaCount');
  var kasaMsg   = document.getElementById('kasaMsg');

  function getKasa(){
    try{ return JSON.parse(localStorage.getItem(KASA_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveKasa(items){
    localStorage.setItem(KASA_KEY, JSON.stringify(items));
    renderKasa();
  }
  function fmtDate(iso){
    if(!iso) return '—';
    var d = new Date(iso);
    if(isNaN(d)) return iso;
    return d.toLocaleDateString(LANG === 'en' ? 'en-GB' : 'tr-TR', {day:'2-digit', month:'long', year:'numeric'});
  }
  function warrantyEnd(iso){
    var d = new Date(iso);
    if(isNaN(d)) return null;
    d.setFullYear(d.getFullYear() + 2);   // 2 yıl garanti
    return d;
  }
  function esc(t){
    return String(t).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function renderKasa(){
    if(!kasaList) return;
    var items = getKasa();
    if(kasaCount){
      var unit = LANG === 'en' ? (items.length === 1 ? 'record' : 'records') : 'kayıt';
      kasaCount.textContent = items.length + ' ' + unit;
    }

    if(items.length === 0){
      kasaList.innerHTML = '<div class="kasa-empty">' + t('kasaEmpty') + '</div>';
      return;
    }

    kasaList.innerHTML = items.map(function(it, i){
      var end = warrantyEnd(it.date);
      var active = end && end > new Date();
      var log = (it.log || []).map(function(e){
        var txt = e.key && STR[e.key] ? t(e.key) : (e.text || '');
        return '<div class="kasa-entry ' + esc(e.type) + '">' +
                 '<span class="dot"></span>' +
                 '<span>' + esc(txt) + '<span class="when">' + fmtDate(e.at) + '</span></span>' +
               '</div>';
      }).join('');

      return '<article class="kasa-card" data-index="' + i + '">' +
        '<div class="kasa-card-top">' +
          '<div><h3>' + esc(it.product) + '</h3>' +
          '<div class="kasa-serial">' + esc(it.serial) + '</div></div>' +
          '<span class="kasa-badge ' + (active ? 'active' : 'expired') + '">' +
            (active ? t('warrantyOk') : t('warrantyEnded')) + '</span>' +
        '</div>' +
        '<div class="kasa-meta">' +
          '<span><b>' + fmtDate(it.date) + '</b>' + t('purchase') + '</span>' +
          '<span><b>' + (end ? fmtDate(end.toISOString()) : '—') + '</b>' + t('warrantyEnd') + '</span>' +
          '<span><b>' + esc(it.store || '—') + '</b>' + t('place') + '</span>' +
        '</div>' +
        '<div class="kasa-log"><h4>' + t('history') + '</h4>' + log + '</div>' +
        '<div class="kasa-actions">' +
          '<button class="kasa-act" data-act="service">' + t('serviceReq') + '</button>' +
          '<button class="kasa-act" data-act="exchange">' + t('exchangeReq') + '</button>' +
          '<button class="kasa-act remove" data-act="remove">' + t('deleteRec') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  if(kasaForm){
    kasaForm.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(kasaForm);
      var serial = (fd.get('serial') || '').trim();
      var product = fd.get('product');
      var date = fd.get('date');
      var store = (fd.get('store') || '').trim();

      var items = getKasa();
      if(items.some(function(x){ return x.serial.toLowerCase() === serial.toLowerCase(); })){
        kasaMsg.className = 'kasa-note err';
        kasaMsg.textContent = t('dupSerial');
        return;
      }
      items.unshift({
        serial: serial, product: product, date: date, store: store,
        log: [{type:'register', key:'logRegister', at: new Date().toISOString()}]
      });
      saveKasa(items);
      kasaForm.reset();
      kasaMsg.className = 'kasa-note ok';
      kasaMsg.textContent = t('regOk');
      setTimeout(function(){ kasaMsg.textContent = ''; kasaMsg.className = 'kasa-note'; }, 4000);
    });
  }

  if(kasaList){
    kasaList.addEventListener('click', function(e){
      var btn = e.target.closest('.kasa-act');
      if(!btn) return;
      var card = btn.closest('.kasa-card');
      var idx = parseInt(card.getAttribute('data-index'), 10);
      var items = getKasa();
      if(!items[idx]) return;
      var act = btn.getAttribute('data-act');

      if(act === 'remove'){
        items.splice(idx, 1);
      } else {
        items[idx].log = items[idx].log || [];
        items[idx].log.unshift({
          type: act,
          key: act === 'service' ? 'logService' : 'logExchange',
          at: new Date().toISOString()
        });
      }
      saveKasa(items);
    });
  }

  renderKasa();

  // -------------------------------------------------------------- orders ---
  var ORDERS_KEY = 'rugen_orders';
  var STOCK = { 'tactical-belt':64, 'plate-carrier':18, 'holster':92, 'head-lamp':37 };
  window.RUGEN = window.RUGEN || {}; window.RUGEN.STOCK = STOCK;
  var FLOW_ORDER   = ['packaging','handed','transit','distribution','delivered'];
  var FLOW_REQUEST = ['pending','approved','production','packaging','handed','transit','distribution','delivered'];
  function flowFor(o){ return o.type === 'request' ? FLOW_REQUEST : FLOW_ORDER; }
  function exceedsStock(items){
    return items.some(function(it){ var s = STOCK[it.slug]; return s != null && it.qty > s; });
  }
  window.RUGEN = window.RUGEN || {};
  window.RUGEN.exceedsStock = exceedsStock;

  function getOrders(){
    try{ return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveOrders(list){
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    renderOrders();
  }
  function addOrder(lines, type){
    type = type === 'request' ? 'request' : 'order';
    var list = getOrders();
    var seq = list.length + 1;
    var prefix = type === 'request' ? 'TLP-' : 'RGN-';
    list.unshift({
      no: prefix + new Date().getFullYear() + '-' + String(1000 + seq),
      at: new Date().toISOString(),
      type: type,
      status: type === 'request' ? 'pending' : 'packaging',
      lines: lines
    });
    saveOrders(list);
  }
  window.RUGEN.addOrder = addOrder;
  function statusLabel(st){
    return STR['st_' + st] ? t('st_' + st) : st;
  }

  var activeWrap = document.getElementById('activeOrders');
  var activeCnt  = document.getElementById('activeCount');

  function orderCard(o, idx){
    var qty = o.lines.reduce(function(s2, l){ return s2 + l.qty; }, 0);
    var total = o.lines.reduce(function(s2, l){ return s2 + l.qty * l.price; }, 0);
    var lines = o.lines.map(function(l){
      return '<div class="order-line"><span class="ln">' + esc(l.name) + '</span>' +
             '<span class="lq">' + l.qty + ' × ' + formatPrice(l.price) + '</span></div>';
    }).join('');

    var flow = flowFor(o);
    var si = flow.indexOf(o.status);
    var delivered = o.status === 'delivered';
    var typeChip = '<span class="order-type ' + (o.type === 'request' ? 'req' : 'ord') + '">' +
                   (o.type === 'request' ? t('typeRequest') : t('typeOrder')) + '</span>';

    // vertical timeline (display only — status is driven by RUGEN, not the dealer)
    var track = '<div class="order-track"><ol class="track-vert">' +
      flow.map(function(st, i){
        var cls = i < si ? 'done' : (i === si ? 'current' : '');
        return '<li class="tv-step ' + cls + '"><span class="tv-bead"></span>' +
               '<span class="tv-lbl">' + statusLabel(st) + '</span></li>';
      }).join('') + '</ol></div>';

    return '<article class="order-card">' +
      '<div class="order-top">' +
        '<div><div class="order-no">' + typeChip + esc(o.no) + '</div>' +
        '<div class="order-date">' + fmtDate(o.at) + '</div></div>' +
        '<div class="order-sum">' +
          (delivered ? '<span class="order-badge">' + t('completed') + '</span>'
                     : '<div class="amt">' + formatPrice(total) + '</div>') +
          '<div class="qty">' + t('items').replace('%s', o.lines.length) + ' · ' + qty + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="order-lines">' + lines + '</div>' +
      track +
    '</article>';
  }

  function renderOrders(){
    if(!activeWrap) return;
    // only in-progress orders/requests are tracked here (completed ones drop off)
    var list = getOrders().filter(function(o){ return o.status !== 'delivered'; });
    activeWrap.innerHTML = list.length
      ? list.map(function(o, i){ return orderCard(o, i); }).join('')
      : '<div class="orders-empty">' + t('noActive') + '</div>';
    function countLabel(n){
      var unit = LANG === 'en' ? (n === 1 ? 'order' : 'orders') : 'sipariş';
      return n + ' ' + unit;
    }
    if(activeCnt) activeCnt.textContent = countLabel(list.length);
  }


  renderOrders();

  // ------------------------------------------------------------ checkout ---
  var ckList  = document.getElementById('checkoutList');
  var ckCount = document.getElementById('checkoutCount');
  var ckSub   = document.getElementById('ckSub');
  var ckVat   = document.getElementById('ckVat');
  var ckTotal = document.getElementById('ckTotal');
  var ckBtn   = document.getElementById('checkoutBtn');
  var ckMsg   = document.getElementById('checkoutMsg');

  var cardForm = document.getElementById('cardForm');
  var cardNumInput = cardForm ? cardForm.querySelector('[name="cardnumber"]') : null;
  var expiryInput  = cardForm ? cardForm.querySelector('[name="expiry"]') : null;
  if(cardNumInput){
    cardNumInput.addEventListener('input', function(){
      var digits = cardNumInput.value.replace(/\D/g, '').slice(0, 16);
      cardNumInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
    });
  }
  if(expiryInput){
    expiryInput.addEventListener('input', function(){
      var d = expiryInput.value.replace(/\D/g, '').slice(0, 4);
      expiryInput.value = d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d;
    });
  }

  var cardBlock = document.getElementById('cardBlock');
  var reqNote   = document.getElementById('reqNote');
  var isRequestMode = false;

  function renderCheckout(){
    if(!ckList) return;
    var items = getCart();
    isRequestMode = items.length > 0 && exceedsStock(items);

    if(items.length === 0){
      ckList.innerHTML = '<div class="checkout-empty">' + t('ckEmpty') + '</div>';
    } else {
      ckList.innerHTML = items.map(function(it, i){
        var st = STOCK[it.slug];
        var over = st != null && it.qty > st;
        var warn = over ? '<div class="ci-warn">' +
          (LANG === 'en' ? 'Stock: ' + st + ' — exceeded' : 'Stok: ' + st + ' — aşıldı') + '</div>' : '';
        return '<div class="checkout-item' + (over ? ' over' : '') + '" data-idx="' + i + '">' +
          '<div><div class="ci-t">' + esc(it.name) + '</div>' +
          '<div class="ci-s">' + formatPrice(it.price) + warn + '</div></div>' +
          '<div class="ci-r">' +
            '<span class="ck-qty">' +
              '<button data-act="dec">−</button><span>' + it.qty + '</span><button data-act="inc">+</button>' +
            '</span>' +
            '<span class="ci-line">' + formatPrice(it.price * it.qty) + '</span>' +
            '<button class="ck-remove" data-act="rm">' + t('remove') + '</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    var sub = items.reduce(function(a, it){ return a + it.price * it.qty; }, 0);
    if(ckSub)   ckSub.textContent   = formatPrice(sub);
    if(ckTotal) ckTotal.textContent = formatPrice(sub);
    if(ckCount) ckCount.textContent = t('items').replace('%s', items.length);

    // request mode: hide payment, show "open request"; normal: show card + pay
    if(cardBlock) cardBlock.hidden = isRequestMode;
    if(reqNote)   reqNote.hidden   = !isRequestMode;
    if(ckBtn){
      ckBtn.disabled = items.length === 0;
      ckBtn.textContent = isRequestMode
        ? (LANG === 'en' ? 'Open Request' : 'Talep Aç')
        : (LANG === 'en' ? 'Pay & Place Order' : 'Öde ve Siparişi Tamamla');
    }
  }

  if(ckList){
    ckList.addEventListener('click', function(e){
      var btn = e.target.closest('button[data-act]');
      if(!btn) return;
      var idx = parseInt(btn.closest('.checkout-item').getAttribute('data-idx'), 10);
      var items = getCart();
      if(!items[idx]) return;
      var act = btn.getAttribute('data-act');
      if(act === 'inc') items[idx].qty += 1;
      if(act === 'dec') items[idx].qty = Math.max(1, items[idx].qty - 1);
      if(act === 'rm')  items.splice(idx, 1);
      saveCart(items);
      renderCheckout();
    });
  }

  if(ckBtn){
    ckBtn.addEventListener('click', function(){
      var items = getCart();
      if(items.length === 0) return;

      // stock exceeded -> go review & submit the request instead of paying
      if(isRequestMode){
        location.href = pagePrefix() + 'talep.html';
        return;
      }

      if(cardForm && cardForm.offsetParent !== null && !cardForm.reportValidity()){
        ckMsg.style.color = 'var(--rust)';
        ckMsg.textContent = t('cardIncomplete');
        return;
      }
      ckMsg.style.color = '';
      addOrder(items.map(function(it){
        return { slug: it.slug, name: it.name, price: it.price, qty: it.qty };
      }), 'order');
      saveCart([]);
      renderCheckout();
      ckMsg.textContent = t('ckPlaced');
      ckBtn.disabled = true;
      setTimeout(function(){ location.href = pagePrefix() + 'siparislerim.html'; }, 1400);
    });
  }

  renderCheckout();

  // -------------------------------------------------------- request page ---
  var reqList = document.getElementById('reqList');
  if(reqList){
    var reqCount = document.getElementById('reqCount');
    var reqProducts = document.getElementById('reqProducts');
    var reqUnits = document.getElementById('reqUnits');
    var reqValue = document.getElementById('reqValue');
    var reqSubmit = document.getElementById('reqSubmit');
    var reqMsg = document.getElementById('reqMsg');

    function renderRequest(){
      var items = getCart();
      if(items.length === 0){
        reqList.innerHTML = '<div class="checkout-empty">' + t('reqEmpty') + '</div>';
      } else {
        reqList.innerHTML = items.map(function(it){
          var st = STOCK[it.slug];
          var over = st != null && it.qty > st;
          var tag = over
            ? '<span class="req-flag">' + (LANG === 'en' ? 'stock ' + st : 'stok ' + st) + '</span>'
            : '';
          return '<div class="checkout-item">' +
            '<div><div class="ci-t">' + esc(it.name) + '</div>' +
            '<div class="ci-s">' + formatPrice(it.price) + tag + '</div></div>' +
            '<div class="ci-r"><span class="ci-line">' + it.qty + ' ' +
              (LANG === 'en' ? 'units' : 'adet') + '</span></div>' +
          '</div>';
        }).join('');
      }
      var units = items.reduce(function(a, it){ return a + it.qty; }, 0);
      var val = items.reduce(function(a, it){ return a + it.qty * it.price; }, 0);
      if(reqCount)    reqCount.textContent    = t('items').replace('%s', items.length);
      if(reqProducts) reqProducts.textContent = items.length;
      if(reqUnits)    reqUnits.textContent    = units;
      if(reqValue)    reqValue.textContent    = formatPrice(val);
      if(reqSubmit)   reqSubmit.disabled      = items.length === 0;
    }
    window.RUGEN.renderRequest = renderRequest;
    renderRequest();

    if(reqSubmit){
      reqSubmit.addEventListener('click', function(){
        var items = getCart();
        if(items.length === 0) return;
        addOrder(items.map(function(it){
          return { slug: it.slug, name: it.name, price: it.price, qty: it.qty };
        }), 'request');
        saveCart([]);
        renderRequest();
        reqMsg.textContent = t('reqPlaced');
        reqSubmit.disabled = true;
        setTimeout(function(){ location.href = pagePrefix() + 'siparislerim.html'; }, 1500);
      });
    }
  }

  // --------------------------------------------------------- register page --
  var regForm = document.getElementById('regForm');
  if(regForm){
    var regRoleSwitch = document.getElementById('regRole');
    var regRole = 'user';
    function setRegRole(r){
      regRole = r;
      document.body.classList.toggle('reg-user', r === 'user');
      document.body.classList.toggle('reg-seller', r === 'seller');
      if(regRoleSwitch){
        regRoleSwitch.querySelectorAll('.role-opt').forEach(function(o){
          var on = o.getAttribute('data-role') === r;
          o.classList.toggle('active', on);
          o.setAttribute('aria-checked', on ? 'true' : 'false');
        });
      }
    }
    setRegRole('user');
    if(regRoleSwitch){
      regRoleSwitch.addEventListener('click', function(e){
        var opt = e.target.closest('.role-opt');
        if(opt) setRegRole(opt.getAttribute('data-role'));
      });
    }

    var regErr = document.getElementById('regError');
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      regForm.querySelectorAll('input').forEach(function(i){ i.classList.remove('invalid'); });

      // which fields are required for the current role
      var required = Array.prototype.slice.call(regForm.querySelectorAll('[data-req]'));
      if(regRole === 'seller') required = required.concat(Array.prototype.slice.call(regForm.querySelectorAll('[data-req-seller]')));
      else required = required.concat(Array.prototype.slice.call(regForm.querySelectorAll('[data-req-user]')));

      var missing = false;
      required.forEach(function(i){
        if(!i.value.trim()){ i.classList.add('invalid'); missing = true; }
      });
      if(missing){ regErr.textContent = t('regFill'); return; }

      var email = regForm.querySelector('[name="email"]').value.trim().toLowerCase();
      var pass  = regForm.querySelector('[name="password"]').value;
      if(pass.length < 6){
        regForm.querySelector('[name="password"]').classList.add('invalid');
        regErr.textContent = t('regShortPass'); return;
      }
      if(findAccount(email)){ regErr.textContent = t('regExists'); return; }

      var accts = storedAccounts();
      accts[email] = {
        pass: pass, role: regRole,
        name: (regForm.querySelector('[name="fullname"]')||{}).value || '',
        company: (regForm.querySelector('[name="company"]')||{}).value || '',
        taxid: (regForm.querySelector('[name="taxid"]')||{}).value || '',
        contact: (regForm.querySelector('[name="contact"]')||{}).value || ''
      };
      localStorage.setItem(ACCT_KEY, JSON.stringify(accts));

      regErr.style.color = 'var(--olive)';
      regErr.textContent = t('regDone');
      regForm.reset(); setRegRole('user');
      setTimeout(function(){ location.href = pagePrefix() + 'index.html'; }, 1400);
    });

    var toLogin = document.getElementById('regToLogin');
    if(toLogin){
      toLogin.addEventListener('click', function(e){
        e.preventDefault();
        location.href = pagePrefix() + 'index.html';
      });
    }
  }

  // --------------------------------------------------------- contact form --
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    var contactMsg = document.getElementById('contactMsg');
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var missing = false;
      contactForm.querySelectorAll('[data-req]').forEach(function(i){
        i.classList.remove('invalid');
        if(!i.value.trim()){ i.classList.add('invalid'); missing = true; }
      });
      if(missing){ contactMsg.style.color = 'var(--rust)'; contactMsg.textContent = t('contactFill'); return; }
      contactMsg.style.color = 'var(--olive)';
      contactMsg.textContent = t('contactSent');
      contactForm.reset();
      setTimeout(function(){ contactMsg.textContent = ''; }, 5000);
    });
  }

  // ------------------------------------------------- interface menu (vault) --
  var kasaToggle = document.getElementById('kasaToggle');
  var ifaceMenu  = document.getElementById('ifaceMenu');
  var ifaceLogout = document.getElementById('ifaceLogout');

  function closeIface(){ if(ifaceMenu) ifaceMenu.classList.remove('open'); 
    if(kasaToggle) kasaToggle.setAttribute('aria-expanded','false'); }

  if(kasaToggle && ifaceMenu){
    kasaToggle.addEventListener('click', function(e){
      e.stopPropagation();
      var open = ifaceMenu.classList.toggle('open');
      kasaToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(!ifaceMenu.classList.contains('open')) return;
      if(ifaceMenu.contains(e.target) || kasaToggle.contains(e.target)) return;
      closeIface();
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeIface(); });
    window.addEventListener('scroll', closeIface, {passive:true});
  }
  if(ifaceLogout){
    ifaceLogout.addEventListener('click', function(){
      clearSession();
      closeIface();
      location.href = pagePrefix() + 'index.html';
    });
  }

  // ------------------------------------------------------- language switch --
  var langToggle = document.getElementById('langToggle');
  if(langToggle){
    langToggle.addEventListener('click', function(){
      LANG = (LANG === 'en') ? 'tr' : 'en';
      localStorage.setItem(LANG_KEY, LANG);
      applyLang();
    });
  }
  applyLang();

  // interface pages are role-specific: send anyone else back to the home page
  (function(){
    var need = document.body.getAttribute('data-requires-role');
    if(!need) return;
    var sess = getSession();
    if(!sess || sess.role !== need){
      location.replace(pagePrefix() + 'index.html');
    }
  })();

  // ------------------------------------------------------------- filters --
  var chips = document.querySelectorAll('.shop-filters .chip');
  var cards = document.querySelectorAll('.shop-grid .product-card');
  if(chips.length && cards.length){
    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('active'); });
        chip.classList.add('active');
        var want = chip.getAttribute('data-filter');
        cards.forEach(function(card){
          var show = want === 'all' || card.getAttribute('data-family') === want;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
