<template>
    <div>
        <header>canvasTest</header>
        <canvas id="canvas" width="500px" height="500px"></canvas>
    </div>

</template>
<script>
    export default {
        name: "attr-pie-test",
        mounted: function () {
            this.$nextTick(function () {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                this.cxt = ctx;

                // ctx.fillStyle = 'red';
                // ctx.fillRect(0, 0, 150, 100);
                //
                // ctx.fillStyle = 'green';
                // ctx.fillRect(10, 10, 150, 100);
                // ctx.strokeRect(20, 20, 100, 100);
                // ctx.clearRect(20, 20, 150, 100);
                //
                // ctx.beginPath();
                // ctx.moveTo(100, 100);
                // ctx.lineTo(125, 75);
                // ctx.lineTo(100, 50);
                // ctx.fill();
                //
                // ctx.beginPath();
                // ctx.moveTo(90, 100);
                // ctx.lineTo(65, 75);
                // ctx.lineTo(90, 50);
                // ctx.closePath();
                // ctx.stroke();
                //
                // ctx.beginPath();
                // ctx.arcTo(200, 300, 400, 300, 100);
                // ctx.fill();

                // ctx.beginPath();
                // ctx.arc(30, 30, 20, 0, Math.PI * 2, false);
                // ctx.stroke();
                // ctx.fillStyle = 'red';
                //
                // ctx.beginPath();
                // ctx.moveTo(50, 50);
                // ctx.quadraticCurveTo(75, 75, 100, 50);
                // ctx.stroke();
                //
                // ctx.beginPath();
                // ctx.moveTo(50, 50);
                // ctx.bezierCurveTo(25, 15, 100, 15, 100, 50);
                // ctx.stroke();
                //
                // let rect = new Path2D();
                // rect.rect(100, 100, 20, 30);
                // ctx.stroke(rect);
                //
                // let circle = new Path2D();
                // circle.arc(150, 110, 20, 0, Math.PI * 2);
                // ctx.fill(circle);


                //加载图片
                // let img = new Image();
                // img.onload = function () {
                //     ctx.drawImage(img, 0, 0);
                // }
                // img.src = '../imgs/monkey.jpeg';
                // img.alt = 'money';
                //
                //
                // //饼图百分比
                // ctx.beginPath();
                // ctx.moveTo(150, 100);
                // ctx.arc(100, 100, 50, 0, Math.PI);
                // ctx.closePath();
                // ctx.stroke();
                this.draw1();


            })
        },
        data: function () {
            return {
                current: 0,
                t: 0,
                cxt: '',
                initialVal: 10
            }
        },
        methods: {

            draw1: function () {
                let _this = this;
                this.loadCanvas(_this.initialVal / 100);
                let ID = setInterval(function () {
                    if (_this.initialVal < 100) {
                        _this.initialVal += 10;
                        _this.loadCanvas(_this.initialVal / 100);
                    } else {
                        clearInterval(ID);
                    }
                }, 1000)
            },

            draw(current) {
                let cxt = this.cxt;
// cxt.lineTo(100,0); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
                cxt.arc(100, 100, 80, -0.5 * Math.PI, current * (2 * Math.PI) - Math.PI / 2, false); //绘制一个中心点为（100,100），半径为100，起始点为1.5*Math.PI,终点为2*Math.PI,顺时针的1/4圆
                cxt.closePath(); //创建从当前点回到起始点的路径
                cxt.fill();//填充当前绘图（路径）
//cxt.lineWidth = 10.0; //设置或返回当前的线条宽度
                cxt.stroke(); //绘制已定义的路径
            },

            loadCanvas(now) {
                let _this = this;
                let cxt = _this.cxt;
                cxt.fillStyle = '#FF0000'; //设置或返回用于填充绘画的颜色、渐变或模式 染成红色
                cxt.strokeStyle = "#ff0000"; //设置或返回用于笔触的颜色、渐变或模式
//cxt.lineCap = 'square'; //设置或返回线条的结束端点样式
                cxt.beginPath(); //起始一条路径，或重置当前路径
                cxt.moveTo(100, 100); //把路径移动到画布中的指定点，不创建线条
                let timer = setInterval(function () {
                    if (_this.t > now) {
                        _this.draw(now);//最后一次绘制
                        clearInterval(timer);
                    } else {
                        _this.draw(_this.t);
                        _this.t += 0.005;
                    }
                }, 5);
            }

        }
    }
</script>

<style scoped>
</style>