/**
 * # やりたいこと
 * - ヘッダの色をSkyWayカラーに
 * - 以下3リンクをサイドバーに追加 + 多言語対応
 *   - https://webrtc.ecl.ntt.com/js-sdk.html
 *   - https://webrtc.ecl.ntt.com/developer.html
 *   - https://webrtc.ecl.ntt.com/
 *   - たとえば /en を回遊中の場合は、それぞれ /en のもの + 表記も
 * - フッタのナビゲーションの無効化
 * - 最下部のソーシャルリンクのHOMEのリンク先を多言語対応
 *
 * どれも mkdocs.ymlでは変更できない機能のため手動対応
 */

const SKYWAY_MODIFIER = '-skyway';
const SITE_URL = 'https://webrtc.ecl.ntt.com/';
document.addEventListener('DOMContentLoaded', function() {
  // find /en/ or /ja/ or...
  const langInPathname = /\/([a-z]{2})\//.exec(location.pathname);
  // default is ja
  const lang = langInPathname !== null ? langInPathname[1] : 'ja';
  const isRoot = langInPathname === null;

  fixHeaderStyle();
  fixFooterNavigationStyle();
  appendSideBarLink(lang, isRoot);
  fixFooterNavigationSocialHomeLink(lang);
});

function fixHeaderStyle() {
  document.querySelector('.md-header').classList.add(SKYWAY_MODIFIER);
}

function fixFooterNavigationStyle() {
  document.querySelector('.md-footer-nav').classList.add(SKYWAY_MODIFIER);
}

function appendSideBarLink(lang, isRoot) {
  const langData = {
    ja: {
      sdk: 'JavaScript SDKに戻る',
      developer: '開発者に戻る',
      home: 'SkyWayに戻る',
    },
    en: {
      sdk: 'back to JavaScript SDK',
      developer: 'back to Developer',
      home: 'back to ECLWebRTC',
    },
  };
  const navData = [
    { key: 'sdk', path: 'js-sdk.html', icon: 'arrow-left' },
    { key: 'developer', path: 'developer.html', icon: 'arrow-left' },
    { key: 'home', path: '', icon: 'home' },
  ];

  // combine nav and lang data
  const links = navData.map(nav => {
    const path = lang === 'ja' ? nav.path : `${lang}/${nav.path}`;
    return {
      icon: nav.icon,
      text: langData[lang][nav.key],
      href: SITE_URL + path,
    };
  });

  const sideNav = document.querySelector('.md-nav.md-nav--primary');
  // need to create another ul to avoid conflict with material's list toggler
  const dest = document.createElement('ul');
  dest.classList.add('md-nav__list', SKYWAY_MODIFIER);

  // root only needs home
  if (isRoot) {
    const link = links.pop();
    dest.innerHTML += createLinkHtml(link);
  } else {
    for (const link of links) {
      dest.innerHTML += createLinkHtml(link);
    }
  }

  sideNav.append(dest);

  function createLinkHtml({ href, text, icon }) {
    return `<li class="md-nav__item">
      <a href=${href} class="md-nav__link ${SKYWAY_MODIFIER}">
        <span class="fa fa-${icon}"></span>
        ${text}
      </a>
    </li>`;
  }
}

function fixFooterNavigationSocialHomeLink(lang) {
  // default
  if (lang === 'ja') { return; }

  const link = document.querySelector('.md-footer-social__link.fa.fa-home');
  link.href = `${SITE_URL}${lang}`;
}
