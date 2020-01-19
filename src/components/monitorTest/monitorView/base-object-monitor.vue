<template>
    <div>
        <section class="device-section">
            <header class="device-header">工艺参数</header>
            <el-form label-width="100px" class="device-form">
                <el-form-item v-for="(device,index) in deviceParams" :key="index" :label="device.label">
                    <div class="device-param-value"><span>{{device.value}}</span><span>{{device.unit}}</span></div>
                </el-form-item>
            </el-form>
        </section>

    </div>
</template>

<script>
    export default {
        name: "base-object-monitor",
        created: function () {
            this.fetchData();
        },
        data: function () {
            return {
                TextArray: [
                    "额定容量（kVA）",
                    "空载损耗（kW）",
                    "额定电流(A):",
                    "负载损耗（kW）",
                    "有功功率",
                    "无功功率",
                ],
                deviceParams: [
                    {
                        "label": "额定容量",
                        "value": 50,
                        "unit": "（kVA）",
                    },
                    {
                        "label": "空载损耗",
                        "value": 0.3,
                        "unit": "（kW）"
                    },
                    {
                        "label": "额定电流",
                        "value": 2.8,
                        "unit": "（A）"
                    },
                    {
                        "label": "负载损耗",
                        "value": 0.2,
                        "unit": "（kW）"
                    },
                ],
                fetchIntervalID: ''
            }
        },
        methods: {
            fetchData: function () {
                let _this = this;
                console.log('fetchData');
                this.fetchIntervalID = window.setInterval(function () {
                    //异步接口调用
                    console.log(_this.deviceParams);
                    _this.deviceParams = _this.deviceParams.map((x) => {
                        if (x.value > 1) {
                            x.value += 1;
                        } else {
                            x.value = (x.value + 0.1).toFixed(1);
                        }
                        return x;
                    })
                }, 30000);
            }
        },
        destroyed: function () {
            clearInterval(this.fetchIntervalID);
        }

    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .device-section {
        margin-left: 100px;
        margin-top: 120px;
        border: 1px solid lightgray;
        width: fit-content;
        padding: 10px;
    }

    .device-header {
        font-size: 15px;
        font-weight: bold;
        padding: 10px;
    }

    .device-form {
        width: fit-content;
    }

    .device-param-value {
        width: 150px;
    }

    .el-form-item {
        margin-bottom: 0px;
    }
</style>