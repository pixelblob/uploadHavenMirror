// ==UserScript==
// @name         UploadHavenRedirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uploadhaven.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var links = Array.from(document.querySelectorAll("a")).filter(a=>a.href.startsWith("https://uploadhaven.com/download"))
    links.forEach(a=>a.href=`https://pixelboop.net/uploadhaven/download/${a.href.split("/").at(-1)}`)
})();
