// alert( 'Hello, world!' );


function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file' && (ev.dataTransfer.items[i].type.match('^image/'))) {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
        // processImg(file)

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.height = 600, img.width = 600; // Fix image resizing

        // Placed Canvas under tester div to see how image changed
        const div = document.getElementById("tester");

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = "contrast(200%) grayscale()";
        img.onload = function(){
          ctx.drawImage(img, 0, 0);
        }

        div.appendChild(canvas);

      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}


function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}


function processImg(file) {
  let src = cv.imread(file.name);
  let dst = new cv.Mat();

  // You can try more different parameters
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  cv.imshow('img_bw', dst);
  src.delete(); 
  dst.delete();

  console.log('Finished Processing');
}
