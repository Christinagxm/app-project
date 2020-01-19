<template>
    <div>
        <progresschart
                style="width:100px;height:100px;margin: 0 auto"
                fontSize="15"
                defaultBg="#ccc"
                :percent="percent"
                progressShow
                html="<p>进度</p>"
                :position="['50%', '80%']"
                :rotate="90"
        />
        <progresschart
                style="width:100%;height:200px; display: inline-block;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
                type="pie"
                :percent="percent"
                :data="data2"
                :lineWidth="400"
                :rotate="0"
        />
    </div>
</template>

<script>
    import {progresschart} from "vue-progresschart";

    export default {
        name: "progress-chart-test",
        components: {progresschart},
        // created: function () {
        //     let _this = this;
        //     // let id = setInterval(function () {
        //     //     let data = _this.data2;
        //     //     let s1 = data[0];
        //     //     if (s1.value < 100) {
        //     //         s1.value += 5;
        //     //     }
        //     //     let s2 = data[1];
        //     //     if (s2.value > 0) {
        //     //         s2.value -= 5;
        //     //     } else {
        //     //         clearInterval(id);
        //     //     }
        //     //     console.log(s1.value, s2.value);
        //     // }, 1000);
        // },
        data: function () {
            return {
                data2: [
                    {id: 1, value: 100, color: 'red'},
                    {id: 2, value: 0, color: 'black'}
                ]
            }

        }
    }
</script>

<style scoped>

</style>