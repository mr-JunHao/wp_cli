const pageData = {
  width: window.innerWidth,
  height: window.innerHeight
}
const resultData = [
  [
    ['ca'], 1
  ],
  [
    ['dc'], 2
  ],
  [
    ['ba'], 3
  ],
  [
    ['ab'], 4
  ],
  [
    ['bb'], 5
  ],
  [
    ['cc'], 6
  ],
  [
    ['db'], 7
  ],
  [
    ['da'], 8
  ],
  [
    ['bc'], 9
  ],
  [
    ['cb'], 10
  ],
  [
    ['ac'], 11
  ],
  [
    ['aa'], 12
  ]
]

function createdText({
  text,
  font,
  color,
  y
}) {
  let fontText = new createjs.Text(text, font, color);
  fontText.textAlign = 'center'
  fontText.y = y
  fontText.x = pageData.width / 2
  return fontText;
}

class ExportResult {
  constructor(option) {
    this.cvs = 'resultDraw'
    this.result = (() => {
      // console.log(option.result)
      for (let data of resultData) {
        if (option.result == data[0]) {
          return data[1];
        }
      }
    })()
    this.nickName = '' || option.nickName;
  }
  init() {
    // const resultDraw = document.getElementById()
    const resultDraw = document.createElement('canvas')
    const stage = new createjs.Stage(resultDraw)
    const result = new createjs.Bitmap(require('src/img/result-' + this.result + '.jpg'))
    const qrcode = new createjs.Bitmap(require('src/img/qrcode.png'))
    const image = new Image();
    const shape = new createjs.Shape();
    $('#resultNum').attr('src',require('src/img/result-' + this.result + '.jpg'))
    // resultDraw.style.display = 'none';
    // document.body.appendChild(resultDraw);
    sessionStorage.setItem('result',this.result);
    resultDraw.width = pageData.width
    resultDraw.height = pageData.height
    shape.graphics.beginFill("#f5f5f5").drawRect(0,0,pageData.width,pageData.height);
    const resultText = createdText({
      text: "你的爱情基因",
      font: `bold ${34/2}px 宋体 `,
      color: "#2a2a2a",
      y: 80 / 2
    })
    const nameText = createdText({
      text: this.nickName,
      font: `bold ${34/2}px 宋体 `,
      color: "#2a2a2a",
      y: 30 / 2
    })
   
    result.image.addEventListener('load', e => {
      Object.assign(result, {
        scaleX: 0.5,
        scaleY: 0.5,
        x: (pageData.width - (result.image.width / 2)) / 2,
        y: 10
      })
      // 168 / 2
      // stage.addChild(qrcode)
      // stage.addChild(nameText)
      loadCode();
    })
    function loadCode(){
      Object.assign(qrcode, {
        scaleX: 140 / 2 / qrcode.image.width,
        scaleY: 140 / 2 / qrcode.image.height,
        x: pageData.width - (218 / 2),
        y: 860 / 2
      })
      stage.addChild(shape,result)
      stage.addChild(nameText,resultText)
      stage.addChild(qrcode)
      console.log('update')
      stage.update()
      // console.log(stage.toDataURL())
      image.src = stage.canvas.toDataURL("image/jpeg", 1.0);
      image.className = 'cvs';
      // image.style.left = - (pageData.width - (result.image.width / 2)) / 2+ 'px'
      image.width = 750 / 2;
      image.height = 1180 / 2;
      
      document.querySelector('.result-wrap .result').appendChild(image);
      // document.body.removeChild(resultDraw)
    }
    createjs.Ticker.addEventListener('tick', update);
    
    function update(event) {
      stage.update()
    }
    
  }
}


export default ExportResult;
