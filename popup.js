// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("jtabs loading popup.js");

(function(jtabs,$,undefined){

    jtabs.mytabs =  function () {
        console.log("In mytabs()");
        chrome.tabs.query({currentWindow: true}, function(tabs) {
	        console.log("mytabs():In chrome.tabs.query");
            for (var i=0;i<tabs.length;i++){
                console.log( "url: " + tabs[i].url);
                var $div_tab = gen_tab_entry(tabs[i]);
                $("div#jtabs-list").append($div_tab);
            }
        });
    };
    var makeFavicon = function(tab){
        var img = document.createElement("img");
        if (tab.favIconUrl &&
            ( tab.favIconUrl.indexOf("http://" == 0) ||
              tab.favIconUrl.indexOf("https://") == 0 ) ){
                  img.src = tab.favIconUrl ;
                  console.log("favIconUrl:" + tab.favIconUrl);
              };
        return img;
    };
    var setTabTitle = function(tab){
        var div_tab_title = document.createElement("div");
        div_tab_title.className = "tab-title";
        div_tab_title.innerHTML = tab.title;
        return div_tab_title;
    };

    var setTabRemover = function(tabmap){
        var span = document.createElement("span");
        span.innerHTML = "X";
        span.className = "tab-remove";
        span.title = 'Close Tab' ;
        $(tabmap.div_tab).append(span);
        $(tabmap.div_tab).click(function(){
            chrome.tabs.remove( $(this).data("tid"));
            console.log("remove tab");
        });
        return tabmap.div_tab;
    };

    var setActiveTab = function(tabmap){
        if (tabmap.tab.active) {
            $(tabmap.div_tab).addClass('active');
            $(tabmap.div_tab_title).addClass('active');
        }
        return tabmap.div_tab;
    };

    var gen_tab_entry = function(tab) {
        var div_tab = document.createElement("div");
        div_tab.className = "tab-cont";
        $(div_tab).data({tid: tab.id});
        $(div_tab).click(function(){
            chrome.tabs.update( $(this).data("tid"), {active : true} );
            console.log("select tab");
        });
        var img = makeFavicon(tab);
        $(div_tab).append(img);
        var div_tab_title = setTabTitle(tab);
        $(div_tab).append(div_tab_title);
        var tabmap =  {tab:tab,
                       div_tab:div_tab,div_tab_title:div_tab_title};
        div_tab = setActiveTab(tabmap);
        div_tab = setTabRemover(tabmap);
        return(div_tab);
    };
}(window.jtabs = window.jtabs || {},jQuery));

document.addEventListener('DOMContentLoaded', function () {
  jtabs.mytabs();
});
