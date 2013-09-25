// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("jtabs loading popup.js");
var jtabs = {
    mytabs: function () {
        console.log("In mytabs()");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	        // Toggle the pinned status
	        //var current = tabs[0];
	        //chrome.tabs.update(current.id, {'pinned': !current.pinned});
            console.log("mytabs():In chrome.tabs.query");
            for (var i=0;i<tabs.length;i++){ 
                console.log(tabs[i]);
            }
            /*
            $.each(function(index,element){
                
            });*/
        });
    },
    
    onload: function() {
        chrome.commands.onCommand.addListener(function(command) {	  
            this.mytabs();
        });
    }
        
};

document.addEventListener('DOMContentLoaded', function () {
  jtabs.mytabs();
});

