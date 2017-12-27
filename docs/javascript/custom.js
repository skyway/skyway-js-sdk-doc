document.addEventListener('DOMContentLoaded', function(){
  // Identifies the language from URL.
  let langInURL = location.href.match(/(skyway-js-sdk-doc|:8000)\/(\w{2})\//);
  langInURL = langInURL && langInURL[2];
  let html = document.getElementsByTagName('html')[0];
  switch (langInURL) {
    case 'ja':
      html.classList.add('ja');
      break;
    case 'en':
      html.classList.add('en');
      break;
  }

  let baseHtml = '';
  let customHtml = '';

  // Switch the side menu.
  baseHtml = document.querySelector('.md-nav__list');
  customHtml
    = '<hr>'
    + '<li class="md-nav__item ja-item"><a href="https://webrtc.ecl.ntt.com/" class="md-nav__link">SkyWayに戻る</li>'
    + '<li class="md-nav__item en-item"><a href="https://webrtc.ecl.ntt.com/en/" class="md-nav__link">back to ECLWebRTC</li>';
  baseHtml.innerHTML += customHtml;

  // Switch the social link on footer.
  baseHTML = document.querySelector('.md-footer-social__link');
  if (html.classList.contains('en')) {
    baseHTML.href = "https://webrtc.ecl.ntt.com/en/";
  }

});
