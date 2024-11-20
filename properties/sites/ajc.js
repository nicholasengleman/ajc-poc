import adsBidding from './adsBidding/ajc.com.json';
import adsTxt from './adstxt/ajc.com.json';
import appAdsTxt from './appadstxt/ajc.com.json';
import mostReadBlacklist from './mostReadBlacklist/ajc.com.json';

export default {
  defaultSiteTitle: 'AJC',
  siteName: 'ajc',
  fbPagesId: '13310147298',
  fbAppId: '366816260017522',
  siteTag: 'ajc',
  siteFullname: 'Atlanta Journal-Constitution',
  cdnOrg: 'ajc',
  cdnSite: 'ajc',
  dfpId: '21849707860',
  activeStoryLayout: 'article_singlecolumn',
  siteDomainURL: 'https://www.ajc.com',
  siteNavHierarchy: 'TopNavRedesign',
  websiteURL: 'https://www.ajc.com',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  instagramURL: '//instagram.com/ajcnews',
  breakingNewsID: 'USNZPBNLV5EULFTENZZP52ECZQ',
  breakingLiveVideoID: '2UPLSZACARBEVG2PQVZLQLO7D4',
  breakingNewsID_sandbox: 'FFQQGJZMN5A3RHYWFUIESE3RYI',
  breakingLiveVideoID_sandbox: 'PI5DD6OFEVFMHNDHZKI3XU7SSQ',
  investigationsID: 'Q6TG7E74UJEBNOWO7KVQ2IEB44',
  investigationsID_sandbox: 'QSG4BBVHRBFGRFV53MCMBEACAA',
  logoWhite: '/resources/logos/AJC/logo-white.svg',
  domainTwitterURL: 'https://twitter.com/ajc',
  domainFacebookURL: 'https://facebook.com/ajc',
  domainInstagramURL: 'https://www.instagram.com/ajcnews',
  domainBlockerTracking: 'https://rtwa.ajc.com',
  newsletterSignupURL:
    'https://services.coxnewspapers.com/ajcnewslettersubscribeservice',
  querylyID: '7df706a05cdd4141',
  queryly: {
    dev: {
      enabled: true,
    },
    sandbox: {
      enabled: true,
    },
    prod: {
      enabled: true,
    },
  },
  sophi: {
    dev: {
      enableSophiPaywall: false,
    },
    sandbox: {
      enableSophiPaywall: false,
    },
    prod: {
      enableSophiPaywall: false,
    },
  },
  piano: {
    dev: {
      isEnabled: true,
      host: 'vx-sandbox.ajc.com',
      aid: 'LaROuvoBsu',
      accessRids: ['RJ9579J', 'RBQGLAA'],
      paywallId: 'EXPF2IPO9ED7',
      essentialDigitalPassRid: 'RBQGLAA',
      cxenseSiteId: '5858447862403942691',
    },
    sandbox: {
      isEnabled: true,
      host: 'vx-sandbox.ajc.com',
      aid: 'LaROuvoBsu',
      accessRids: ['RJ9579J', 'RBQGLAA'],
      paywallId: 'EXPF2IPO9ED7',
      essentialDigitalPassRid: 'RBQGLAA',
      cxenseSiteId: '5858447862403942691',
    },
    prod: {
      isEnabled: true,
      host: 'vx.ajc.com',
      aid: 'P3Z2gSespu',
      accessRids: ['RQTPATU', 'RTLBNJF'],
      paywallId: 'EXSBLLTU9NAX',
      essentialDigitalPassRid: 'RTLBNJF',
      cxenseSiteId: '5858447862403942691',
    },
  },
  metrics: {
    siteID: 'ajc',
    siteMetro: 'ga: atlanta',
    siteFormat: 'news',
    gtmContainerKey: 'GTM-WT4CBT7',
    ampGtmID: 'GTM-WQBXD72',
    ampGtmTriggers: {
      loginStart: '35',
      loginFailed: '42',
      loginAborted: '43',
      loginComplete: '39',
      logoutStart: '41',
      logoutComplete: '41',
    },
    dev: {
      sophiActive: false,
      GA4ConfigId: 'G-XWJ5K0TSHY',
    },
    sandbox: {
      sophiActive: false,
      GA4ConfigId: 'G-XWJ5K0TSHY',
    },
    prod: {
      sophiActive: false,
      GA4ConfigId: 'G-5HXB1QX6N6',
    },
  },
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
  favicon: '/resources/icons/favicons/AJC/favicon.ico',
  appleIcon: '/resources/icons/appleTouch/ajc/favicon-apple-touch-icon-2.png',
  weatherPageUrl: '/atlanta-weather/',
  adsPath: 'atlanta_np/ajc_web_default',
  adsTxt,
  appAdsTxt,
  nativo: {
    dev: {
      lazyLoad: true,
      moapPTD: '1114521',
      boapPTD: '1097469',
    },
    sandbox: {
      lazyLoad: true,
      moapPTD: '1114521',
      boapPTD: '1097469',
    },
    prod: {
      lazyLoad: false,
      moapPTD: '1099909',
      boapPTD: '1099013',
    },
  },
  ads: {
    dev: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
      prebidJs: 'prebid3.23.0.js',
    },
    sandbox: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
      prebidJs: 'prebid3.23.0.js',
    },
    prod: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: true,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
      prebidJs: 'prebid3.23.0.js',
    },
  },
  connext: {
    dev: {
      isEnabled: false,
      allowMeter: true,
    },
    sandbox: {
      isEnabled: false,
      clientCode: 'ajc',
      environment: 'stage',
      siteCode: 'AJC',
      configCode: 'AJC_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
      pubParam: 'AJC',
      activateUrl: 'https://test-subscribe.ajc.com/',
      activateAmpPaywallUrl: 'https://test-subscribe.ajc.com/startgwamp',
      activateAmpInlineUrl: 'https://test-subscribe.ajc.com/startamp',
      authClientId: 'fPa1b3KLfGmHfZXfYKc0WtQQ9X37pwYu',
      authDomainName: 'ajc-dev.us.auth0.com',
    },
    prod: {
      isEnabled: false,
      clientCode: 'ajc',
      environment: 'prod',
      configCode: 'AJC_PROD_DEFAULT',
      siteCode: 'AJC',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
      pubParam: 'AJC',
      activateUrl: 'https://subscribe.ajc.com/',
      activateAmpPaywallUrl: 'https://subscribe.ajc.com/startgwamp',
      activateAmpInlineUrl: 'https://subscribe.ajc.com/startamp',
      authClientId: 'jTd6xcS8s8VS4DOa7t3yn4EEWtvnqv4M',
      authDomainName: 'ajc-prod.us.auth0.com',
    },
  },
  oneTrust: {
    dev: {
      oneTrustIsEnabled: true,
      oneTrustScriptId: '3f90be06-fb98-4e53-ba60-c20b5bbde2d4-test',
    },
    sandbox: {
      oneTrustIsEnabled: true,
      oneTrustScriptId: '3f90be06-fb98-4e53-ba60-c20b5bbde2d4-test',
    },
    prod: {
      oneTrustIsEnabled: true,
      oneTrustScriptId: '3f90be06-fb98-4e53-ba60-c20b5bbde2d4',
    },
  },
  video: {
    dev: {
      cmsId: 2531688,
    },
    sandbox: {
      cmsId: 2531688,
    },
    prod: {
      cmsId: 2528054,
    },
  },
  chartbeat: {
    blacklist: mostReadBlacklist,
    host: 'ajc.com',
  },
  editorsPicks: {
    dev: 'UZG4A6L2JBCZ5IKJGJXNFHTP2E',
    sandbox: 'UZG4A6L2JBCZ5IKJGJXNFHTP2E',
    prod: 'DTSNNI7Z2RBX7DHMNGU52KDCVI',
  },
  investigations: {
    dev: 'UZG4A6L2JBCZ5IKJGJXNFHTP2E',
    sandbox: 'UZG4A6L2JBCZ5IKJGJXNFHTP2E',
    prod: 'XRV7L22CLZDURCMKARMKA3JR74',
  },
  darkModeSubscribe:
    '/start/?g2i_campaign=ajcsite&g2i_source=digital-site&g2i_medium=headerlink',
  ampEnabled: false,
  personalizedElectionAlerts: {
    dev: {
      postUrl:
        'https://ace1dslexc.execute-api.us-east-1.amazonaws.com/stg/ajcelectionnewslettersubscribeservice',
    },
    sandbox: {
      postUrl:
        'https://ace1dslexc.execute-api.us-east-1.amazonaws.com/stg/ajcelectionnewslettersubscribeservice',
    },
    prod: {
      postUrl:
        'https://services.coxnewspapers.com/ajcelectionnewslettersubscribeservice',
    },
  },
};
