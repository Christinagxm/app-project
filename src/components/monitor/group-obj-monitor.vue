<template>
    <div class="container">
        <monitor-view class="device-info"
                             v-for="device in dataList"
                             :key="device.id"
                             :device="device"
        ></monitor-view>
    </div>
</template>

<script>
    import MonitorView from "./base-obj-monitor";
    export default {
        name: "monitor-group",
        components: {MonitorView},
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