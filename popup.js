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
                
                $("div#jtabs-list").each(function(index,element){
                    var div = document.createElement("div");
                    div.className = "tabc";
                    var span = document.createElement("span");
                    var img = document.createElement("img");
                    if (tabs[i].favIconUrl && 
                        ( tabs[i].favIconUrl.indexOf("http://" == 0) ||
                          tabs[i].favIconUrl.indexOf("https://") == 0 ) ){
                              img.src = tabs[i].favIconUrl ;
                              console.log("favIconUrl:" + tabs[i].favIconUrl);
                    };
                    var divtab = document.createElement("div");
                    
                    divtab.className = "tab";
                    divtab.innerHTML = tabs[i].title;
                    $(divtab).data({tid: tabs[i].id});
                    $(divtab).click(function(){
                        chrome.tabs.update( $(this).data("tid"), {active : true} );
                        console.log("select tab");
                    });
                    $(this).append(div);
                    //$(span).append(img);
                    $(div).append(img);
                    $(div).append(divtab);
                    
                    if (tabs[i].active) $(divtab).css({"color":"lightblue"});
                });
            }
        });
    };
}(window.jtabs = window.jtabs || {},jQuery));

document.addEventListener('DOMContentLoaded', function () {
  jtabs.mytabs();
});
