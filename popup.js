// Copyright (c) 2014, Jitendra Nair
// All rights reserved.

// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

// 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those of the authors and should not be interpreted as representing official policies, either expressed or implied, of the copyright holders.

(function(_ctl_jn,$,undefined){

    
    var cleanTabList = function (){
        var tlist = document.getElementById("_ctl_jn_list");
        tlist.innerHTML = "";
    };
    
    _ctl_jn.main =  function () {
        chrome.tabs.query({currentWindow: true}, function(tabs) {
	        for (var i=0;i<tabs.length;i++){
                console.log( "url: " + tabs[i].url);
                var $div_tab = getEntry(tabs[i]);
                $("div#_ctl_jn_list").append($div_tab);
            }
        });
    };
    var favicon = function(tab){
        var img = document.createElement("img");
        if (tab.favIconUrl &&
            ( tab.favIconUrl.indexOf("http://" == 0) ||
              tab.favIconUrl.indexOf("https://") == 0 ) ){
                  img.src = tab.favIconUrl ;
              };
        return img;
    };

    var setTitle = function(tab){
        var div_tab_title = document.createElement("div");
        //var span = document.createElement("span");
        div_tab_title.className = "_ctl_jn_tab_title";
        div_tab_title.title = tab.title;
        div_tab_title.innerHTML = tab.title;
         return div_tab_title;
    };

    var setTabRemover = function(tabmap){
        var div = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = "X";
        span.className = "_ctl_jn_tab_remove";
        span.title = 'Close Tab' ;
        $(span).click(function(){
            chrome.tabs.remove( $(this).parents("._ctl_jn_tab_cont").data("tid"));
            cleanTabList();
            _ctl_jn.main();
        });
        $(div).css({"float":"right","padding":"4px"}).append(span);
        $(tabmap.div_tab).append(div);
        return tabmap.div_tab;
    };

    var setTabActive = function(tabmap){
        if (tabmap.tab.active) {
            $(tabmap.div_tab).addClass('active');
            $(tabmap.div_tab_title).addClass('active');
        }
        return tabmap.div_tab;
    };

    var getEntry = function(tab) {
        var div_tab = document.createElement("div");
        div_tab.className = "_ctl_jn_tab_cont";
        $(div_tab).data({tid: tab.id});
        $(div_tab).click(function(){
            chrome.tabs.update( $(this).data("tid"), {active : true} );
            console.log("select tab");
        });
        var img = favicon(tab);
        $(div_tab).append(img);
        var div_tab_title = setTitle(tab);
        $(div_tab).append(div_tab_title);
        var tabmap =  {tab:tab,
                       div_tab:div_tab,div_tab_title:div_tab_title};
        div_tab = setTabActive(tabmap);
        div_tab = setTabRemover(tabmap);
        return(div_tab);
    };
}(window._ctl_jn = window._ctl_jn || {},jQuery));

document.addEventListener('DOMContentLoaded', function () {
  _ctl_jn.main();
});
