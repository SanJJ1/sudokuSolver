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
    // console.log(text);
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
      if (ev.dataTransfer.items[i].kind === 'file' && (ev.dataTransfer.items[i].type.match('^image/'))) {
        var file = ev.dataTransfer.items[i].getAsFile();
        recognizeText(file);
        console.log('... file[' + i + '].name = ' + file.name);
        // processImg(file)

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.height = 600, img.width = 600;

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
        console.log(ctx);

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
<<<<<<< HEAD
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
=======
}
>>>>>>> c4d90955f1f499bcbffeb9330600b85a74bae7f8
