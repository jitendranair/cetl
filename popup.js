// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("jtabs loading popup.js");

var mytabs =  function () {
        console.log("In mytabs()");
        chrome.tabs.query({currentWindow: true}, function(tabs) {
	        // Toggle the pinned status
	        //var current = tabs[0];
	        //chrome.tabs.update(current.id, {'pinned': !current.pinned});
            console.log("mytabs():In chrome.tabs.query");
            for (var i=0;i<tabs.length;i++){
                console.log(tabs[i].url);
                $("ul#jtabs-list").each(function(index,element){
                    var a = document.createElement("a");
                    var br = document.createElement("br");
                    a.href = tabs[i].url;
                    a.innerHTML = tabs[i].title;
                    $(a).data({tid: tabs[i].id}).append(br);
                    $(a).click(function(){
                        chrome.tabs.update( $(this).data("tid"), {active : true} );
                        console.log("select tab");
                    });
                    $(this).append(a);
                });
            }
        });
};

document.addEventListener('DOMContentLoaded', function () {
  mytabs();
});
