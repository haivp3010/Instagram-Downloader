// Get reference to Download button image
var download_black = chrome.extension.getURL("download_black.png");
var download_white = chrome.extension.getURL("download_white.png");

$(document).on('click', '.btnDownload', function(event) {
  var dl = document.createElement('a');
  dl.href = getImgLink($(this).parent().parent().prev());
  dl.download = "";
  dl.trigger('click');
});

$(document).on('mouseenter', '._sppa1', function() {
  if (!$(this).find('.btnDownloadHover').length)
    $(this).append('<a class="btnDownloadHover" style="background-image: url(' + download_white + '); width: 30px; height: 30px; background-size: contain; margin: 5px auto;"></a>');
});

$(document).on('click', '.btnDownloadHover', function(event) {
  var dl = document.createElement('a');
  dl.download = "";
  
  if ($(this).parent().parent().find('_1lp5e')) {
    var count = 0;
    var loop = setInterval(function() {
      dl.href = $(document).find('video').prop('src');
      count++;
      if (dl.href != "") {
        clearInterval(loop);
        dl.click();
      } else if (count == 20) {
        // If it is taking too long to load the page, simple break
        clearInterval(loop);
      }
    }, 1000);
  } else {
    dl.href = getImgLink($(this).parent().parent());
    dl.click();
  }
});

$(document).on('change mouseover scroll', function(event) {
  addDownloadBtn();
});

$(document).on('click', '._sppa1', function() {
  $(document).ajaxComplete(function() {
    console.log("click");
    $(document).off("ajaxComplete");
  });
  
});

$(document).ready(function() {
  setTimeout(addDownloadBtn(), 2000);
});

function addDownloadBtn() { 
  $('._jveic:not(".downloadable")').prepend('<a href="javascript:void(0);" class="btnDownload" style="background-image: url(' + download_black + '); background-size: contain; width: 30px; height: 30px; margin-right: 10px;"></a>');
  $('._jveic').addClass('downloadable');
}

function getImgLink(element) {
  if (element.find("video").length) {
    return element.find("video").prop("src");
  } else {
    var src = element.find("img").prop("src");
    var x = 0;
    var last = 0;
    var middle = 0;
    for (var i = 0; i < src.length; i++) {
      if (src[i] == "/") {
        x++;
        last = i;
        if (x == 4) middle = i;
      }
    }
    var path = src.substring(0, middle);
    var filename = src.substring(last, src.indexOf("?"));
    return (path + filename);
  }
}

var target = document.querySelector('body');
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var newNodes = mutation.addedNodes;
      if (newNodes != null) {
        addDownloadBtn();
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