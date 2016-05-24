addDownloadBtn();
setBtnStyle();

function addDownloadBtn() {
  $('<a href="javascript:void(0);" class="btnDownload"></a>').insertAfter($('._es1du._r3m3z._rgrbt:not(.downloadable)').find('._ebwb5._1tv0k._327yi'));
  $('._es1du._r3m3z._rgrbt').addClass('downloadable');
}

function setBtnStyle() {
  $('.btnDownload').css('background-image', 'url(' + imgURL + ')');
  $('.btnDownload').css('background-size', 'cover');
  $('.btnDownload').css('width', '30px');
  $('.btnDownload').css('height', '30px');
  $('.btnDownload').css('margin-right', '10px');
}

chrome.runtime.sendMessage("getUrl", function(response) {
  if (response == 'https://www.instagram.com/' && $('._es1du._r3m3z._rgrbt').length) {
    console.log("Newsfeed");
    addDownloadBtn();
    setBtnStyle();
    setUpObserver('._qj7yb._8fxp6');
  } else if (/^https:\/\/www.instagram.com\/\w*\/$/.test(response)) {
    // Profile page
    console.log("Profile page!");
  } else {
    console.log("Pic page!");
  }
});

function setUpObserver(elementSelector) {
  // Observer
  var target = document.querySelector(elementSelector).children[0];
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var newNodes = mutation.addedNodes;
      if (newNodes != null) {
        addDownloadBtn();
        setBtnStyle();
      }
    });
  });

  // Configuration of the observer:
  var config = {
  	attributes: true,
  	childList: true,
  	characterData: true
  };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
}
