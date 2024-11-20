import adsBidding from './adsBidding/springfieldnewssun.com.json';
import adsTxt from './adstxt/springfieldnewssun.com.json';
import blacklist from './mostReadBlacklist/springfieldnewssun.com.json';

export default {
  dfp_id: 21849707860,
  fbPagesId: '73484672682',
  fbAppId: '1793003357612189',
  siteName: 'springfield-news-sun',
  siteFullname: 'Springfield News-Sun',
  cdnOrg: 'coxohio',
  cdnSite: 'springfield-news-sun',
  siteDomainURL: 'https://www.springfieldnewssun.com',
  websiteURL: 'https://www.springfieldnewssun.com',
  websiteLogo:
    'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/ESSF3ZPUYRH7RAH4D7SUTHQCMM.png',
  googleLogo:
    'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/ESSF3ZPUYRH7RAH4D7SUTHQCMM.png',
  orgName: 'Springfield News Sun',
  domainTwitterURL: 'https://twitter.com/springfieldnews',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  domainFacebookURL: 'https://www.facebook.com/springfieldnewssun',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  domainPinterestURL: '',
  pinterestURL: 'https://www.pinterest.com/pin/create/button/?url=',
  pinterestShareLogo:
    'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.coxohio/X6F5HYVHVRHNBOGAKEVUZURWKQ.png',
  domainRedditURL: 'https://www.reddit.com/domain/springfieldnewssun.com/',
  redditURL: 'https://www.reddit.com/submit?url=',
  logoWhite: '/resources/logos/SpringfieldNews/sns_trusted_white.svg',
  footerLogo: '/resources/logos/SpringfieldNews/logo-full.svg',
  logo: '/resources/logos/SpringfieldNews/logo-full.svg',
  logoRedesign: '/resources/logos/SpringfieldNews/logo-full.svg',
  burgerWhiteLogo: '/resources/logos/SpringfieldNews/SNS_White.svg',
  logoShort: '/resources/logos/SpringfieldNews/logo-short.svg',
  logoHamburger: '/resources/logos/SpringfieldNews/logo-mobile-hamburger.svg',
  logoPlaceholder: '/resources/logos/SpringfieldNews/placeholder.svg',
  logoOgImage: '/resources/logos/SpringfieldNews/logo-ogimage.png',
  mail: 'mailto:?Subject=',
  sites: ['springfield-news-sun'],
  breakingNewsID: 'MDEEBOSQDNEZRK6ZZELXGDVG2E',
  breakingLiveVideoID: 'HV4DOKFKSZF35CA4XLCK4BHIPY',
  breakingNewsID_sandbox: '2DFNDMIGWBCSNNVURFGVQV2MDI',
  breakingLiveVideoID_sandbox: 'DJ5HSRZBBBAZ7EJ3VMNYD3DMW4',
  investigationsID: 'KEGKV67YSBDMJHAVAVDQVMQ3OI',
  investigationsID_sandbox: 'DYZEY34MWRCN7E7B7MOJVB33P4',
  domainBlockerTracking: 'https://rtwa.springfieldnewssun.com',
  featuredVideoPlayerRules: {
    startPlaying: true,
    muteON: true,
    autoplayNext: true,
  },
  inlineVideoPlayerRules: {
    startPlaying: false,
    muteON: true,
    autoplayNext: true,
  },
  weatherLocationId: 330116,
  nativo: {
    sandbox: {
      lazyLoad: true,
      boapPTD: '1118370',
      moapPTD: '1118371',
    },
    prod: {
      lazyLoad: false,
      boapPTD: '1053969',
      moapPTD: '1100010',
    },
  },
  metrics: {
    siteID: 'springfieldnews',
    siteMetro: 'oh: dayton',
    siteFormat: 'news',
    gtmContainerKey: 'GTM-NSH3PS4',
    ampGtmID: 'GTM-T46L3LB',
    ampGtmTriggers: {
      loginStart: '34',
      loginFailed: '33',
      loginAborted: '31',
      loginComplete: '32',
      logoutStart: '35',
      logoutComplete: '35',
    },
    sandbox: {
      sophiActive: false,
    },
    prod: {
      sophiActive: false,
    },
  },
  adsPath: 'dayton_np/spns_web_default',
  favicon: '/resources/icons/favicons/Ohio/springfield-news-sun-favicon.ico',
  appleIcon: '/resources/icons/appleTouch/ohio/SNS-AppleTouch-152x152-2.png',
  adsTxt,
  ads: {
    sandbox: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '',
    },
    prod: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '',
    },
  },
  connext: {
    sandbox: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'stage',
      siteCode: 'NS',
      configCode: 'NS_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
      pubParam: 'SNS',
      activateUrl: 'https://test-subscribe.springfieldnewssun.com/',
      activateAmpPaywallUrl:
        'https://test-subscribe.springfieldnewssun.com/ohpaywall',
      activateAmpInlineUrl:
        'https://test-subscribe.springfieldnewssun.com/ohpaywall',
      authClientId: 'osxgXLnLyH8UQDKML8sCr8TdgR7R7vA2',
      authDomainName: 'ajc-dev.us.auth0.com',
    },
    prod: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'prod',
      siteCode: 'NS',
      configCode: 'NS_PROD_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
      pubParam: 'SNS',
      activateUrl: 'https://subscribe.springfieldnewssun.com/',
      activateAmpPaywallUrl:
        'https://subscribe.springfieldnewssun.com/ohpaywall',
      activateAmpInlineUrl:
        'https://subscribe.springfieldnewssun.com/ohpaywall',
      authClientId: 'YU4z4uuLFa24n6ZwPnnhoqhCeEqpLKVq',
      authDomainName: 'ajc-prod.us.auth0.com',
    },
  },
  oneTrust: {
    sandbox: {
      oneTrustIsEnabled: true,
      oneTrustScriptId: 'a33858f1-3b91-4172-a61c-ba61758ee396-test',
    },
    prod: {
      oneTrustIsEnabled: true,
      oneTrustScriptId: 'a33858f1-3b91-4172-a61c-ba61758ee396',
    },
  },
  video: {
    sandbox: {
      cmsId: 2536851,
    },
    prod: {
      cmsId: 2536851,
    },
  },
  chartbeat: {
    blacklist,
    host: 'springfieldnewssun.com',
  },
  darkModeSubscribe:
    'https://subscribe.springfieldnewssun.com/?g2i_campaign=snssite&g2i_source=digital-site&g2i_medium=headerlink',
};
