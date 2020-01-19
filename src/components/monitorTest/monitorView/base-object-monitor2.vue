<template>
    <div class="container">
        <table>
            <thead>
            <tr>
                <th>工艺参数<span class="circle" :class="statusClass"></span></th>
            </tr>
            </thead>
            <tr v-for="(data,index) in dataGroup" :key="index">
                <td class="param-col" :class="validateValue(item)" v-for="(item,index) in data" :key="index">
                    <span class="param-label">{{item.label}}</span>
                    <span :class="labelValueShowClass">
                        <span class="param-value">{{item.value}}</span>
                        <span class="param-unit">{{item.unit}}</span>
                    </span>

                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "base-object-monitor2",
        props: {
            device: Object,
            columnNum: {
                type: Number,
                default: 1
            },
            common: {
                type: Number,
                default: 1
            },//1 键值对  2 带图键值对
            labelValueShow: {
                type: Number,
                default: 1
            },// 1 left/right  2 top/bottom
            updateInterval: {
                type: Number,
                default: 5000
            }
        },
        created: function () {
            this.fetchData();
        },
        data: function () {
            return {
                propRuleConfig: {
                    ratedCapacity: {
                        max: 70,
                        min: 20,
                        warnStyleObj: {
                            color: 'yello',
                        },
                        errorStyleObj: {
                            color: 'red',
                        }
                    },
                    emptyLoss: {
                        max: 0.7
                    },
                    ratedElec: {
                        min: 2.4,
                        max: 5.2
                    },
                    loadLoss: {
                        max: 0.7
                    }

                },
                dataObj: [],
                updateIntervalID: '',
                status: 0,
            }
        },
        computed: {
            dataGroup: function () {
                let dataGroup = [];
                let tmp = this.dataObj.slice();
                while (tmp.length && tmp.length >= this.columnNum) {
                    let row = tmp.slice(0, this.columnNum);
                    dataGroup.push(row);
                    tmp.splice(0, this.columnNum);
                }
                if (tmp.length) {
                    dataGroup.push(tmp.slice(0, tmp.length));
                }
                return dataGroup;
            },
            labelValueShowClass: function () {
                if (this.labelValueShow == 2) {
                    return 'param-value-pair';
                } else {
                    return '';
                }
            },
            statusClass: function () {
                if (this.status) {
                    return 'status-error';
                } else {
                    return 'status-normal'
                }
            }

        },
        methods: {
            validateValue: function (item) {
                let attr = item.attr;
                let rule = this.propRuleConfig[attr];
                if (rule) {
                    let value = Number.parseFloat(item.value);
                    let valid = (rule.min ? value > rule.min : true) && (rule.max ? value < rule.max : true);
                    if(!valid){
                        this.status = 1;
                        return 'param-error';
                    }else{
                        return '';
                    }

                } else {
                    return '';
                }
            },
            fetchData: function () {
                //根据设备信息查询当前设备状态
                this.dataObj = [
                    {
                        "attr": "ratedCapacity",
                        "label": "额定容量",
                        "value": 51,
                        "unit": "（kVA）",
                    },
                    {
                        "attr": "emptyLoss",
                        "label": "空载损耗",
                        "value": 0.3,
                        "unit": "（kW）"
                    },
                    {
                        "attr": "ratedElec",
                        "label": "额定电流",
                        "value": 2.8,
                        "unit": "（A）"
                    },
                    {
                        "attr": "loadLoss",
                        "label": "负载损耗",
                        "value": 0.2,
                        "unit": "（kW）"
                    },
                ];
                let that = this;
                this.updateIntervalID = setInterval(function () {
                    that.dataObj = that.dataObj.map(x => {
                        let tmp = JSON.parse(JSON.stringify(x));
                        let value = Number.parseFloat(tmp.value);
                        let randomNum = value > 1 ? 1 : 0.1;
                        console.log(value);
                        tmp.value = value % 1 === 0 ? value + randomNum : (value + randomNum).toFixed(1);
                        return tmp;
                    })
                }, that.updateInterval);
            }
        },
        beforeDestroy: function () {
            clearInterval(this.updateIntervalID);
        }
    }
</script>

<style scoped>
    .container {
        width: fit-content;
        padding: 10px;
        margin-left: 100px;
    }

    .container header {
        margin: 10px 0px 10px 0px;
    }

    .param-col {
        font: bold 13px "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;;
        padding: 5px 10px 5px 10px;
    }

    .param-label, .param-value, .param-unit {
        margin-right: 10px;
        display: inline-block;
        padding: 5px 0px 5px 0px;
    }

    .param-label {
        width: 140px;
        background: #66a5ee;
    }

    .param-value {
        width: 80px;
        background: #83bbee;
    }

    .param-value-pair {
        display: block;
        margin-top: 5px;
    }

    .param-error {
        color: red;
    }

    .param-unit {
        width: 50px;
        background: #8fc0ee;
    }

    table {
        border: 1px solid #6da6fe;
    }

    td{
        color: white;
    }

    th, td {
        border-bottom: 1px solid #6da6fe;;
    }

    td:last-of-type {
        border-bottom: none;
    }

    .circle {
        margin-left: 10px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
    }

    .status-normal {
        background: #00af00;
    }

    .status-error {
        background: red;
    }

</style>