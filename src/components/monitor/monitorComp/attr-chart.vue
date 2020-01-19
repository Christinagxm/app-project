<template>
    <div id="app">
        <Progress value="16.88">
            <!-- <template v-slot:footer>
              <b>goood</b>
            </template>-->
        </Progress>
        <Progress strokeColor="#FF00AA" value="16.88">
            <template v-slot:footer>
                <b>More Color</b>
            </template>
        </Progress>

        <Progress :radius="50" :strokeWidth="10" value="86.12">
            <template v-slot:footer>
                <b>Bolder & Bigger One</b>
            </template>
        </Progress>

        <Progress
                :transitionDuration="5000"
                :radius="50"
                :strokeWidth="10"
                value="86.12"
        >
            <template v-slot:footer>
                <b>Slow One</b>
            </template>
        </Progress>

        <Progress
                :transitionDuration="5000"
                :radius="55"
                :strokeWidth="10"
                value="86.12567"
        >
            <template v-slot:footer>
                <b>More Precise</b>
            </template>
        </Progress>

        <Progress :transitionDuration="5000" :radius="55" :strokeWidth="10" :value="test">
            <div class="content">{{test}}</div>
            <template v-slot:footer>
                <b>More Precise</b>
            </template>
        </Progress>
    </div>
</template>

<script>
    import Progress from "easy-circular-progress";

    export default {
        name: "app",
        components: {
            Progress
        },
        created: function () {
            let _this = this;
            setInterval(function () {
                _this.test += 1
            }, 1000);
        },
        data: function () {
            return {
                test: 23
            }
        }
    };
</script>

<style scoped>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        height: 100vh;
        color: #fff;
        background: #3e423a;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    body {
        margin: 0;
        padding: 0;
    }
</style>