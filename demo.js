// $("._22yr2").on('click', function() {
//   var src = $(this).find("img").prop("src");
//   var x = 0;
//   var last = 0;
//   var middle = 0;
//   for (var i = 0; i < src.length; i++) {
//     if (src[i] == "/") {
//       x++;
//       last = i;
//       if (x == 4) middle = i;
//     }
//   }
//   var path = src.substring(0, middle);
//   var filename = src.substring(last, src.indexOf("?"));
//   console.log(path + filename);
// });
// Video: ._j5ewm

//$("._8mlbc._vbtk2._t5r8b").live('click', function() {
//  $(this).find("._22yr2").trigger("click");
//});

// $("._sppa1").on('click', function() {
//   $(this).siblings().trigger("click");
// });

//var _0x2489=["\x63\x6C\x69\x63\x6B","\x74\x72\x69\x67\x67\x65\x72","\x73\x69\x62\x6C\x69\x6E\x67\x73","\x6C\x69\x76\x65","\x2E\x5F\x73\x70\x70\x61\x31"];$(_0x2489[4])[_0x2489[3]](_0x2489[0],function(){$(this)[_0x2489[2]]()[_0x2489[1]](_0x2489[0])})

// $(document)
// if ($("._es1du._r3m3z._rgrbt").length == 0) {
//   // Profile page
//
// } else {
//   // Newsfeed
//
// }

// $(document).ajaxComplete( function() {
// if (!$("._es1du._r3m3z._rgrbt").length)
// console.log("Download button");
// });

// Get reference to Download button image
var imgURL = chrome.extension.getURL("download.png");

// Check current page
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
//_8mlbc _vbtk2 _t5r8b
//._qj7yb._8fxp6

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

function getImgLink(element) {
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

$(document).on('click', '.btnDownload', function(event) {
  var dl = document.createElement('a');
  dl.href = getImgLink($(this).parent().parent().prev());
  dl.download = "";
  dl.click();
});

window.onpopstate = function (event) {
    //Track for event changes here and
    //send an intimation to background page to inject code again
    chrome.extension.sendMessage("Rerun script");
};
