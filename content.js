// Get reference to Download button image
var download_black = chrome.extension.getURL("download_black.png");
var download_white = chrome.extension.getURL("download_white.png");

$('body').on('click', '.btnDownload', function(event) {
  var dl = document.createElement('a');
  dl.href = getImgLink($(this).parent().parent().prev());
  dl.download = "";
  dl.click();
});

$('body').on('mouseenter', '._22yr2._s3j6d', function() {
  if (!$(this).find('.btnDownloadHover').length)
    $(this).append('<div class="download-container" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: rgba(0, 0, 0, 0.3)"><a class="btnDownloadHover" style="background-image: url(' + download_white + '); width: 30px; height: 30px; background-size: contain; margin: auto; cursor: pointer;"></a></div>');
  $(this).find('.download-container').show();
});

$('body').on('mouseenter', '._sppa1', function() {
  if (!$(this).find('.btnDownloadHover').length)
    $(this).append('<a class="btnDownloadHover" style="background-image: url(' + download_white + '); width: 30px; height: 30px; background-size: contain; margin: 5px auto;"></a>');
});

$('body').on('mouseleave', '._22yr2', function() {
  if (this.classList.length > 1 && !$(this).hasClass('_s3j6d'))
    return;
  $(this).find('.download-container').hide();
});

$('body').on('click', 'a', function(event) {
  if ($(event.target).is('.btnDownloadHover') && !$(event.target).parent().parent().find('._1lp5e').length) {
    event.preventDefault();
  }
});

$('body').on('click', '.btnDownloadHover', function(event) {
  $('<style>body { overflow: visible !important; }</style>').appendTo('head');
  var dl = document.createElement('a');
  dl.download = "";

  if ($(this).parent().parent().find('._1lp5e').length) {
    $('body').css('overflow', 'visible');
    $('<style>._a1rcs._ea084 { display: none; }</style>').appendTo('head');
    var count = 0;
    var loop = setInterval(function() {
      dl.href = $(document).find('video').prop('src');
      count++;
      if (dl.href.indexOf('undefined') == -1) {
        clearInterval(loop);
        dl.click();
        history.back();
        $('style:last-child').remove();
        $('style:last-child').remove();
      } else if (count == 20) {
                // If it is taking too long to load the page, simply break
                clearInterval(loop);
              }
            }, 1000);
  } else {
    dl.href = getImgLink($(this).parent().parent());
    dl.click();
    $('style:last-child').remove();
  }
});

$('body').on('change mouseover scroll', function(event) {
  addDownloadBtn();
});

$(document).ready(function() {
  setTimeout(addDownloadBtn(), 2000);
});

function addDownloadBtn() {
  $('._jveic:not(:has(>.btnDownload))').prepend('<a href="javascript:void(0);" class="btnDownload" style="background-image: url(' + download_black + '); background-repeat: no-repeat; background-size: contain; width: 24px; height: 24px; margin-right: 10px;"></a>');
  $('._ghat4._68sx3:not(:has(>.btnDownload))').append('<a class="btnDownload _7gupx _hd0kr" role="button"><span class="_soakw" style="background-image: url(' + download_black + '); background-repeat: no-repeat; background-size: contain; width: 24px; height: 24px;"></span></a>');
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
    var filename = src.substring(last);
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

function addProfileDownload(parent) {
  var btn = $('<div>')
    .addClass('profileDownloadBtn')
    .css('position', 'absolute')
    .css('width', '100%')
    .css('height', '100%')
    .css('top', '0')
    .css('background-image', 'url(' + download_white + ')')
    .css('background-repeat', 'no-repeat')
    .css('background-position', 'center')
    .css('background-color', 'rgba(25, 29, 28, 0.5')
    .css('display', 'none');
  parent.append(btn);
  return btn;
}

$('body').on('mouseenter', '._5lote._h33fs._vbtk2', function(event) {
  var parent = $(event.target).closest('._5lote._h33fs._vbtk2');;
  if (parent.find('.profileDownloadBtn').length == 0) {
    addProfileDownload(parent);
  }
  parent.find('.profileDownloadBtn').show();
});

$('body').on('mouseleave', '._5lote._h33fs._vbtk2', function(event) {
  var parent = $(event.target).closest('._5lote._h33fs._vbtk2');
  parent.find('.profileDownloadBtn').hide();
});

$('body').on('mouseenter', '._5lote._pfo25._vbtk2', function(event) {
  var parent = $(event.target).closest('._5lote._pfo25._vbtk2');;
  if (parent.find('.profileDownloadBtn').length == 0) {
    addProfileDownload(parent);
  }
  parent.find('.profileDownloadBtn').show();
});

$('body').on('mouseleave', '._5lote._pfo25._vbtk2', function(event) {
  var parent = $(event.target).closest('._5lote._pfo25._vbtk2');
  parent.find('.profileDownloadBtn').hide();
});

$('body').on('mouseenter', '._8gpiy._r43r5', function(event) {
  var parent = $(event.target).closest('._8gpiy._r43r5');;
  if (parent.find('.profileDownloadBtn').length == 0) {
    addProfileDownload(parent);
  }
  parent.find('.profileDownloadBtn').show();
});

$('body').on('mouseleave', '._8gpiy._r43r5', function(event) {
  var parent = $(event.target).closest('._8gpiy._r43r5');
  parent.find('.profileDownloadBtn').hide();
});


$('body').on('click', 'a._5lote._h33fs._vbtk2, ._5lote._pfo25._vbtk2, ._8gpiy._r43r5', function(event) {
  var imgLink = $(this).find('img').attr('src');
  if (imgLink) {
    var link = document.createElement('a');
    link.href = imgLink.replace(/\/s.*x.*\//, '/');
    link.download = "";
    link.click();
  }
  return false;
});