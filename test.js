var path = require('path');
var fs = require('fs');
var sitemapGenerator = require(path.resolve('./src/index'));
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
const parseURL = require('url-parse');
const urlParser = require('url');

//https://www.toyota.com/owners/parts-service/service-specials/dealer-code/49031/offer-id/10074502 HANG
// https://www.toyota.com/owners/parts-service/service-specials/dealer-code/49030/offer-id/10074502 WORK
var generator = sitemapGenerator('https://www.lexus.com/', {
  allowInitialDomainChange: false,
  decompressResponses: true,
  respectRobotsTxt: true,
  filterByDomain: true,
  scanSubdomains: false,
  stripQuerystring: true,
  ignoreInvalidSSL: true,
  recommendAlternatives: true,
  maxEntriesPerFile: 50000,
  maxDepth: 5,
  deep: false,
  maxConcurrency: 100,
  interval: 250,
  timeout: 120000,
  changeFreq: 'weekly',
  excludeFileTypes: ['gif',
    'jpg',
    'jpeg',
    'png',
    'ico',
    'bmp',
    'ogg',
    'webp',
    'mp4',
    'webm',
    'mp3',
    'ttf',
    'woff',
    'woff2',
    'eot',
    'json',
    'rss',
    'atom',
    'gz',
    'zip',
    'rar',
    '7z',
    'css',
    'js',
    'gzip',
    'exe',
    'svg',
    'xml',
    'pdf',
    'ashx'
  ],
  excludeURLs: ['offer-detail/',
    'offerid=',
    '/feed/',
    '/wp-json',
    '/wp-content/plugins/'
  ],
  excludePatterns: ['-'],
  forcedURLs: [],
  recommendAlternatives: false,
  replaceByCanonical: true
});
var numOfUrls = 0;
generator.on('ready', function() {
  console.log('SITEMAP GENERATOR: CRAWLER IS READY');
  generator.start();
});

generator.on('add', function(queueItem) {
  numOfUrls++;
  console.log('SITEMAP GENERATOR (' + numOfUrls + '): SCANNING ' + queueItem.url + ', DEPTH: ' + queueItem.depth);
  if (numOfUrls === 50) {
    generator.stop();
    console.log('STOPPING THE CRAWLER');
  }
});
generator.on('ignore', function(queueItem) {
  console.log('SITEMAP GENERATOR: IGNORING URL ' + queueItem.url);
});
generator.on('error', function(error) {
  console.log(error);
});

generator.on('done', function(stats) {
  console.log('SITEMAP GENERATOR: SCAN WAS DONE FOR TEST');
  process.exit();
});

//
// const getHTML = (url, done) => {
//   const superagent = require('superagent-interface-promise');
//   superagent.get(url)
//     .then((res) => {
//       done(null, res.text);
//     }, () => {
//       done(null);
//     });
// };
// getHTML('https://pressroom.toyota.com/releases/', console.log);
