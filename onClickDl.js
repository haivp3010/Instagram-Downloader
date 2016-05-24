$(document).on('click', '.btnDownload', function(event) {
  var dl = document.createElement('a');
  dl.href = getImgLink($(this).parent().parent().prev());
  dl.download = "";
  dl.click();
});

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
