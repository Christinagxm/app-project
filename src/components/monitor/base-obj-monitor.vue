<template>
    <table class="obj-table">
        <tr>
            <th :colspan="propShowConfig.columnNum">{{objData.name}}<span class="status-circle"
                                                                          :class="statusClass"></span></th>
        </tr>
        <tr v-for="(data,index) in dataGroup" :key="index">
            <td v-for="(item,index) in data" :key="index">
                <attr-text :item="item" @statusChange="statusChange" :attr-rules="dataRules[item.attr]"></attr-text>
            </td>
        </tr>
    </table>
</template>

<script>
    import AttrText from "./monitorComp/attr-text";
    export default {
        name: "base-obj-monitor",
        components: {AttrText},
        props: {
            objData: {
                type: Object,
                default: () => {
                    return {
                        id: '0001',
                        name: '设备0001'
                    }
                }
            }
        },
        created: function () {
            this.fetchData();
        },
        data: function () {
            return {
                status: 0,// 0正常 1预警  2 错误
                propShowConfig: {
                    columnNum: 1,
                    common: 1,//1 键值对  2 带图键值对
                    valueShowLayout: 1,// 1 left/right  2 top/bottom
                },
                dataRules: {},
                dataObj: [],
                updateIntervalID: '',
                updateInterval: 5000,
                statusObj: {}
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
            statusClass: function () {
                return this.status === 1 ? 'status-warn' : this.status === 2 ? 'status-error' : 'status-common';
            }
        },
        methods: {
            fetchData: function () {
                //查找dataRule规则
                this.dataRules = {
                    ratedCapacity: {
                        max: {
                            value: 60,
                            warnValue: 53
                        },
                        min: {
                            value: 20,
                            warnValue: 25
                        }
                    },
                    emptyLoss: {
                        max: {value: 0.8}
                    },
                    ratedElec: {
                        min: {value: 2.4},
                        max: {value: 7.2}
                    },
                    loadLoss: {
                        max: {value: 0.7}
                    }

                };
                //查找dataObj
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
                        "value": 0.2,
                        "unit": "（kW）"
                    },
                    {
                        "attr": "ratedElec",
                        "label": "额定电流",
                        "value": 1.8,
                        "unit": "（A）"
                    },
                    {
                        "attr": "loadLoss",
                        "label": "负载损耗",
                        "value": 0.2,
                        "unit": "（kW）"
                    },
                ];
                //设置定时器，动态更新
                let that = this;
                this.updateIntervalID = setInterval(function () {
                    that.dataObj = that.dataObj.map(x => {
                        let tmp = JSON.parse(JSON.stringify(x));
                        let value = Number.parseFloat(tmp.value);
                        let randomNum = value > 1 ? 1 : 0.1;
                        tmp.value = value % 1 === 0 ? value + randomNum : (value + randomNum).toFixed(1);
                        return tmp;
                    })
                }, that.updateInterval);
            },
            statusChange: function (statusObj) {
                let key = Object.keys(statusObj)[0];
                this.statusObj[key] = statusObj[key];
                this.status = Object.values(this.statusObj).reduce((s1, s2) => s1 > s2 ? s1 : s2);
            },
        },

        beforeDestroy: function () {
            clearInterval(this.updateIntervalID);
        }
    }
</script>

<style scoped>
    th {
        border-bottom: 1px solid cornflowerblue;
    }

    .obj-table {
        border: 1px solid cornflowerblue;
    }

    .status-circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        margin-left: 10px;
    }

    .status-common {
        background: #00af00;
        box-shadow: 0px 0px 5px #00af00;
    }

    .status-warn {
        background: #e2e05a;
        box-shadow: 0px 0px 5px #e2e05a;
    }

    .status-error {
        background: red;
        box-shadow: 0px 0px 5px red;
    }
</style>