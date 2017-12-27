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

  let isRoot = !langInURL;
  if (isRoot) {
    html.classList.add('root');
  }

  let baseHtml = '';
  let customHtml = '';

  // Switch the side menu.
  baseHtml = document.querySelector('.md-nav__list');
  customHtml
    = '<hr>'
    + '<li class="md-nav__item ja-item hidden-root-item"><a href="https://webrtc.ecl.ntt.com/js-sdk.html" class="md-nav__link backlink"><span class="fa fa-arrow-left"></span> JavaScript SDKに戻る</li>'
    + '<li class="md-nav__item ja-item hidden-root-item"><a href="https://webrtc.ecl.ntt.com/developer.html" class="md-nav__link backlink"><span class="fa fa-arrow-left"></span> 開発者に戻る</li>'
    + '<li class="md-nav__item ja-item"><a href="https://webrtc.ecl.ntt.com/" class="md-nav__link backlink"><span class="fa fa-home"></span> SkyWayに戻る</li>'
    + '<li class="md-nav__item en-item hidden-root-item"><a href="https://webrtc.ecl.ntt.com/en/js-sdk.html" class="md-nav__link backlink"><span class="fa fa-arrow-left"></span> back to JavaScript SDK</li>'
    + '<li class="md-nav__item en-item hidden-root-item"><a href="https://webrtc.ecl.ntt.com/en/developer.html" class="md-nav__link backlink"><span class="fa fa-arrow-left"></span> back to Developer</li>'
    + '<li class="md-nav__item en-item"><a href="https://webrtc.ecl.ntt.com/en/" class="md-nav__link backlink"><span class="fa fa-home"></span> back to ECLWebRTC</li>';
  baseHtml.innerHTML += customHtml;

  // Switch the social link on footer.
  baseHTML = document.querySelector('.md-footer-social__link');
  if (html.classList.contains('en')) {
    baseHTML.href = "https://webrtc.ecl.ntt.com/en/";
  }

});
