// import Tesseract from 'tesseract.js';



function recognizeText(f) {
  document.body.append('in progress...\n')
  document.body.append(document.createElement('br'));
  Tesseract.recognize(
  f,// 'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'eng',
  { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    document.body.append(text);
    console.log(text);
  })
}

function dropHandler(ev) {
console.log('File(s) dropped');

// Prevent default behavior (Prevent file from being opened)
ev.preventDefault();

if (ev.dataTransfer.items) {
  // Use DataTransferItemList interface to access the file(s)
  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    // If dropped items aren't files, reject them
    if (ev.dataTransfer.items[i].kind === 'file') {
      var file = ev.dataTransfer.items[i].getAsFile();
      recognizeText(file);
      console.log('... file[' + i + '].name = ' + file.name);

      // const img = document.createElement("img");
      // img.src = URL.createObjectURL(file);
      // img.height = 600, img.width = 600; // Fix image resizing

      // // Placed Canvas under tester div to see how image changed
      // const div = document.getElementById("tester");

      // const canvas = document.createElement("canvas");
      // const ctx = canvas.getContext("2d");
      // canvas.width = img.width;
      // canvas.height = img.height;
      // ctx.filter = "contrast(200%) grayscale()";
      // img.onload = function(){
      //   ctx.drawImage(img, 0, 0);
      // }

      // div.appendChild(canvas);
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