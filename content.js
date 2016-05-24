// Get reference to Download button image
var download_black = chrome.extension.getURL("download_black.png");
var download_white = chrome.extension.getURL("download_white.png");

function addDownloadBtn() {
  $('<a href="javascript:void(0);" class="btnDownload"></a>').insertAfter($('._es1du._r3m3z._rgrbt:not(.downloadable)').find('._ebwb5._1tv0k._327yi'));
  $('._es1du._r3m3z._rgrbt').addClass('downloadable');
}

function setBtnStyle() {
  $('.btnDownload').css('background-image', 'url(' + download_black + ')');
  $('.btnDownload').css('background-size', 'cover');
  $('.btnDownload').css('width', '30px');
  $('.btnDownload').css('height', '30px');
  $('.btnDownload').css('margin-right', '10px');
}

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

function newsfeedProcess() {
  addDownloadBtn();
  setBtnStyle();

  // Observer
  var target = document.querySelector('._qj7yb._8fxp6').children[0];
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

function profileProcess() {
  $('._nljxa').on('mouseenter', '._sppa1', function() {
    console.log($(this).append('<a style="background-image: url(' + download_white + '); width: 30px; height: 30px; background-size: contain; margin: 5px auto;"></a>'));
  });
}
