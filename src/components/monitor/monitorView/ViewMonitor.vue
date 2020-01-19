<template>
    <div id="canvasContainer" class="canvas-css" v-wave><span> </span>
      <!--<canvas id="watermark-canvas" style="display:none;margin:0 auto;border:1px solid #aaa;">您的浏览器尚不支持canvas</canvas>-->
      <!--<img ref="main"  :src= this.imageSource["main"] alt="">-->
      <!--<img ref="outerFrame"  src="outerFrame"  alt="">-->
    </div>
</template>

<script>
    import main from '../transformer1.jpg'
    import outerFrame from '../ganlanzhi.png'

    export default {
      props:[
        'MajorTask',
        'MajorBO'
      ],
      data: function () {
        return {
          canvasContext: "",
          waveImage: "",
          canvasWidth: "",
          canvasHeight: "",
          needAnimate: false,
          outerFrame:"../ganlanzhi.png",
          imageSource:{
            "main":"../transformer1.jpg",
            "outerFrame":"../ganlanzhi.png",
          },
          TextArray:[
            "额定容量（kVA）",
            "空载损耗（kW）",
            "额定电流(A):",
            "负载损耗（kW）",
            "有功功率",
            "无功功率",
          ],
          MonitorConfig:[
            {
              "label":"额定容量",
              "value":50,
              "unit":"（kVA）",
            },
            {
              "label":"空载损耗",
              "value":0.3,
              "unit":"（kW）"
            },
            {
              "label":"额定电流",
              "value":2.8,
              "unit":"（A）"
            },
            {
              "label":"负载损耗",
              "value":0.2,
              "unit":"（kW）"
            },
          ]
        }
      },
      methods: {
        init(canvasContainer) {
          canvasContainer = document.getElementById(canvasContainer);
          var canvas = document.createElement('canvas');
          this.canvasContext = canvas.getContext('2d');
          this.canvasWidth = canvasContainer.offsetWidth;
          this.canvasHeight = canvasContainer.offsetHeight;
          canvas.setAttribute('width', this.canvasWidth);
          canvas.setAttribute('height', this.canvasHeight);
          canvasContainer.appendChild(canvas);

          // var waveImage = this.$refs.main;
          var waveImage = new Image();
          waveImage.src = main;

          // var monitorFrame = this.$refs.outerFrame;
          var monitorFrame = new Image();
          monitorFrame.src = outerFrame;

          var baseX = 270;
          var baseY = 180;
          waveImage.onload = () => {
            this.canvasContext.drawImage(waveImage, 0, 0);
            this.canvasContext.font="30px microsoft yahei";
            this.canvasContext.fillStyle = "rgba(255,255,0,0.9)";

            this.canvasContext.fillText("150kva干式变压器",baseX,baseY);
            for(var i = 0;i < this.MonitorConfig.length; i++){
              var textToShow = this.MonitorConfig[i]["label"];
              var valueToShow = this.MonitorConfig[i]["value"];
              var unitToShow = this.MonitorConfig[i]["unit"];
              textToShow = textToShow + " :  " + valueToShow + " " + unitToShow;
              this.canvasContext.fillText(textToShow,baseX,baseY+50*i+50);
            }
          };
          this.canvasContext.globalAlpha = 0.8;
          monitorFrame.onload = () => {
            this.canvasContext.drawImage(monitorFrame, 100, 30, 600, 600);
          };
        },
      },
      mounted() {
        this.init("canvasContainer");
        // alert("ViewMonitor收到来自主框架App - Layout 的信息--MajorBO = " + this.MajorBO + " ; MajorTask = " + this.MajorTask);
      }
    }
</script>

<style scoped>
  .canvas-css{
    width:1500px;
    height:1200px;
    overflow:hidden;
    /*border-radius:50%;*/
    /*background:rgba(255,203,103,.6);*/
    margin:100px auto;
    position:relative;
    text-align:center;
    display:table-cell;
    vertical-align:middle;
  }
  .canvasContainer span{
    display:inline-block;
    color:#fff;
    font-size:20px;
    position:relative;
    z-index:2;}
  .canvasContainer canvas{
    position:absolute;
    left:0;
    top:0;
    z-index:1;
  }
</style>
