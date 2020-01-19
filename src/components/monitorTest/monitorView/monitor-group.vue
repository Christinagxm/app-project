<template>
    <div class="container">
        <base-object-monitor class="device-info"
                             v-for="device in dataList"
                             :key="device.id"
                             :device="device"
        ></base-object-monitor>
    </div>
</template>

<script>
    import BaseObjectMonitor from "./base-object-monitor2";
    export default {
        name: "monitor-group",
        components: {BaseObjectMonitor},
        created: function () {
            this.fetchData();
        },
        data:function () {
            return{
                dataList:[]
            }
        },
        methods:{
            fetchData:function () {
                //获取所有的设备列表
                this.dataList = [
                    {
                        id:'10001',
                        name:'10001'
                    },
                    {
                        id:'10002',
                        name:'10002'
                    },
                    {
                        id:'10003',
                        name:'10003'
                    },
                    {
                        id:'10004',
                        name:'10004'
                    },
                    {
                        id:'10005',
                        name:'10005'
                    },
                    {
                        id:'10006',
                        name:'10006'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

    .container{
        display: flex;
        flex-wrap: wrap;
    }
    .device-info{
        margin: 20px;
    }
</style>