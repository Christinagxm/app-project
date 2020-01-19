<template>
    <div class="param-col" :class="validateValue(item)">
        <span :class="paramLabelClass">{{item.label}}</span>
        <span :class="labelValueShowClass">
                        <span :class="paramValueClass">{{item.value}}</span>
                        <span v-if="item.unitIcon"><img :src="item.unitIcon" alt="unitIcon"/> </span>
                        <span v-else :class="paramUnitClass">{{item.unit}}</span>
                    </span>
    </div>
</template>

<script>
    export default {
        name: "attr-text",
        props: {
            item: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            attrRules: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            valueShowLayout: {
                type: Number,
                default: 1  // 1 left/right  2 top/bottom
            }
        },
        data: function () {
            return {
                paramLabelClass: 'param-label',
                paramValueClass: 'param-value',
                paramUnitClass: 'param-unit',
                warnClass: 'warn-value',
                errorClass: 'error-value',
                status: 0 //0 正常  1 报警  2 错误
            }
        },
        computed: {
            labelValueShowClass: function () {
                if (this.valueShowLayout == 2) {
                    return 'param-value-pair';
                } else {
                    return '';
                }
            }
        },
        methods: {
            validateValue: function (item) {
                let rule = this.attrRules;
                if (rule) {
                    let value = Number.parseFloat(item.value);
                    if (!Number.isNaN(value)) {
                        let minWarn, minError, maxWarn, maxError;
                        let minValue = rule.min ? rule.min.value : undefined;
                        let minWarnValue = rule.min ? rule.min.warnValue : undefined;
                        minError = minValue !== undefined ? item.value < minValue : false;
                        minWarn = minWarnValue !== undefined ? item.value >= minValue && item.value <= minWarnValue : false;

                        let maxValue = rule.max ? rule.max.value : undefined;
                        let maxWarnValue = rule.max ? rule.max.warnValue : undefined;
                        maxError = maxValue !== undefined ? item.value > maxValue : false;
                        maxWarn = maxWarnValue !== undefined ? item.value >= maxWarnValue && item.value <= maxValue : false;

                        this.status = minWarn || maxWarn ? 1 : minError || maxError ? 2 : 0;
                    }
                    let statusObj = {}
                    statusObj[item.attr] = this.status;
                    this.$emit('statusChange', statusObj);
                    return this.status === 1 ? 'warn-value' : this.status === 2 ? 'error-value' : '';

                } else {
                    return '';
                }
            },
        }
    }
</script>

<style scoped>

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

    .param-col {
        font: bold 13px "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;;
        padding: 5px 10px 5px 10px;
        color: #fff;
    }

    .warn-value {
        color: #e2e05a;
    }

    .error-value {
        color: red;
    }
</style>