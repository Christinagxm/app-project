<template>
    <div class="container">
        <header>工艺参数</header>
        <table>
            <tr v-for="(data,index) in dataGroup" :key="index">
                <td class="param-col" :class="validateValue(item)" v-for="(item,index) in data" :key="index">
                    <span class="param-label" >{{item.label}}</span>
                    <span :class="labelValueShowClass">
                        <span class="param-value" >{{item.value}}</span>
                        <span class="param-unit" >{{item.unit}}</span>
                    </span>

                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "base-object-monitor1",
        created: function () {
            this.fetchData();
        },
        data: function () {
            return {
                propShowConfig: {
                    columnNum: 1,
                    common: 1,
                    labelValueShow: 1,// 1 left/right  2 top/bottom
                    commonStyleConfig:{
                        label:{background:'#66a5ee',color:'white'},
                        value:{background:'#83bbee',color:'white'},
                        unit:{background:'#8fc0ee',color:'white'}
                    },
                    errorStyleConfig:{
                        label:{background:'white',color:'red'},
                        value:{background:'white',color:'red'},
                        unit:{background:'white',color:'red'}
                    }
                },
                propRuleConfig: {
                    ratedCapacity: {
                        max: 60,
                    },
                    emptyLoss: {
                        max: 0.4
                    },
                    ratedElec: {
                        min: 2.4,
                        max: 3.2
                    },
                    loadLoss: {
                        max: 0.7
                    }

                },
                dataObj: [],
                updateIntervalID: '',
                updateInterval: 5000
            }
        },
        computed: {
            dataGroup: function () {
                let dataGroup = [];
                let tmp = this.dataObj.slice();
                while (tmp.length && tmp.length >= this.propShowConfig.columnNum) {
                    let row = tmp.slice(0, this.propShowConfig.columnNum);
                    dataGroup.push(row);
                    tmp.splice(0, this.propShowConfig.columnNum);
                }
                if (tmp.length) {
                    dataGroup.push(tmp.slice(0, tmp.length));
                }
                return dataGroup;
            },
            labelValueShowClass:function () {
                if(this.propShowConfig.labelValueShow==2){
                    return 'param-value-pair';
                }else{
                    return '';
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
                    return valid ? '' : 'param-error';
                } else {
                    return '';
                }
            },
            fetchData: function () {
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

    td {
        color: white;
        border: 1px solid #6da6fe;
    }
</style>