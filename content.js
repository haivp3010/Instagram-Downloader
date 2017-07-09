// Get reference to Download button image
var download_black = chrome.extension.getURL("download_black.png");
var download_white = chrome.extension.getURL("download_white.png");

var batchDownloading = false;

function addDownloadBtn() {
  $('._ghat4._68sx3:not(:has(>.btnDownload))').append('<a class="btnDownload" role="button"><span class="_soakw" style="background-image: url(' + download_black + '); background-repeat: no-repeat; background-position: center; width: 24px; height: 24px; display: inline-block; background-color: transparent; border: none; cursor: pointer; padding: 8px;"></span></a>');
}

function getImgLink(element) {
  if (element.find("video").length) {
    return element.find("video").prop("src");
  } else {
    var src = element.find("img").prop("src");
    return getHDImgLink(src);
  }
}

function getHDImgLink(src) {
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

var target = document.querySelector('body');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    var newNodes = mutation.addedNodes;
    if (newNodes != null) {
      addDownloadBtn();
    }
  });
});

function getZipFileName(link) {
  var last1 = link.lastIndexOf('/');
  var last2 = link.lastIndexOf('/', last1 - 1);
  return link.substring(last2 + 1, last1);
}

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

function downloadPhotosFromSharedData(sharedData, saveFileName) {
  var photoObjects = sharedData.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges;
  var promises = [];
  var fileNames = [];
  photoObjects.forEach(function(obj) {
    fileNames.push(obj.node.display_url.substr(obj.node.display_url.lastIndexOf('/') + 1));
    promises.push(fetch(getHDImgLink(obj.node.display_url)));
  });

  var progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.bottom = '20px';
  progressBar.style.right = '20px';
  progressBar.style.width = '200px';
  progressBar.style.height = '30px';
  progressBar.style.backgroundColor = 'lightgreen';
  progressBar.style.opacity = '0.9';
  progressBar.style.textAlign = 'center';
  progressBar.style.verticalAlign = 'middle';
  progressBar.style.lineHeight = '30px';
  progressBar.style.zIndex = '999999';

  var progressText = document.createElement('span');
  progressText.innerHTML = 'Downloading...';
  progressText.style.color = 'white';
  progressBar.appendChild(progressText);

  document.body.appendChild(progressBar);

  Promise.all(promises).then(function(responses) {
    promises = [];
    responses.forEach(function(response) {
      promises.push(response.blob());
    });
    return Promise.all(promises);
  }).then(function(blobs) {
    var zip = new JSZip();
    for (var i = 0; i < fileNames.length; i++) {
      zip.file(fileNames[i], blobs[i]);
    }
    zip.generateAsync({type: 'blob'}).then(function(content) {
      batchDownloading = false;
      document.body.removeChild(progressBar);
      saveAs(content, saveFileName);
    });
  }).catch(function(err) {
    batchDownloading = false;
    document.body.removeChild(progressBar);
    alert("Error downloading images.");
  });
}

$('body').on('click', '.btnDownload', function(event) {
  if ($(this).closest('article').find('._eusuj').length) { // multiple photos
    if (batchDownloading) {
      alert("Please wait for the current batch download to finish.");
      return;
    }
    else
      batchDownloading = true;

    var parent = $(this.closest('._rgrbt'));
    var itemLink = parent.find('._5l4x8')[0].href;

    $.get(itemLink, function(response) {
      var doc = document.implementation.createHTMLDocument('New document');
      doc.documentElement.innerHTML = response;
      var command = doc.body.getElementsByTagName('script')[0].innerHTML;
      var sharedData = JSON.parse(command.substring(command.indexOf('=') + 1, command.length - 1));
      downloadPhotosFromSharedData(sharedData, getZipFileName(itemLink));
    });
  } else {
    var dl = document.createElement('a');
    dl.href = getImgLink($(this).parent().parent().prev());
    dl.download = "";
    dl.click();
  }
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
  var parent = $(this).closest('._8mlbc');
  var itemLink = parent.find('a').first()[0].href;
  // for multiple photos
  if (parent.find('.coreSpriteSidecarIconLarge').length) {
    // prevent duplicate download
    if (batchDownloading) {
      alert("Please wait for the current batch download to finish.");
      return;
    }
    else
      batchDownloading = true;

    $.get(itemLink, function(response) {
      var doc = document.implementation.createHTMLDocument('New document');
      doc.documentElement.innerHTML = response;
      var command = doc.body.getElementsByTagName('script')[0].innerHTML;
      var sharedData = JSON.parse(command.substring(command.indexOf('=') + 1, command.length - 1));
      downloadPhotosFromSharedData(sharedData, getZipFileName(itemLink));
    });
  } else { // for single photo
    var dl = document.createElement('a');
    dl.download = "";

    if (parent.find('.coreSpriteVideoIconLarge').length) {
      $.get(itemLink, function(response) {
        var doc = document.implementation.createHTMLDocument('New document');
        doc.documentElement.innerHTML = response;
        dl.href = doc.head.querySelector("[property='og:video']").content;
        dl && dl.click();
      });
    } else {
      dl.href = getImgLink(parent);
      dl.click();
      $('style:last-child').remove();
    }
  }
});

$('body').on('change mouseover scroll', function(event) {
  addDownloadBtn();
});

$(document).ready(function() {
  setTimeout(addDownloadBtn(), 2000);
});



// Configuration of the observer:
var config = {
  attributes: true,
  childList: true,
  characterData: true
};

// pass in the target node, as well as the observer options
observer.observe(target, config);

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