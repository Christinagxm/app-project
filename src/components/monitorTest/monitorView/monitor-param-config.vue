<template>
    <div class="container">
        <section class="dynamic-data">
        <el-table :data="data">
                <el-table-column v-for="(col,index) in tableHeader"
                                 :key="index"
                                 :label="col.title"
                                 :prop="col.prop"
                                 :width="col.prop==='time'?'150':'120'">

                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-view" @click="handleClick(scope.row)"></i>
                        <i class="el-icon-setting"></i>
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete"></i>
                    </template>
                </el-table-column>
        </el-table>

        </section>
        <section class="data-config">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="事件配置" name="1">
                    <el-form>
                        <el-form-item label="警示值配置">
                            <el-button type="primary" @click="warnValueConfig">配置</el-button>
                        </el-form-item>
                        <el-form-item label="操作图标">
                            <el-button type="primary" @click="warnValueConfig">配置</el-button>
                        </el-form-item>
                        <el-form-item label="刷新时间">
                            <el-select value="2s">
                                <el-option value="1" label="2s">2s</el-option>
                                <el-option value="2" label="5s">5s</el-option>
                                <el-option value="3" label="10s">10s</el-option>
                                <el-option value="4" label="30s">30s</el-option>

                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="图标配置" name="2">
                    新增图标  查询已有图标  删除图标
                </el-tab-pane>
            </el-tabs>

        </section>
    </div>
</template>

<script>
    const  data=[
        {deviceNo:'0001',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0002',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0003',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0004',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0005',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0006',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0007',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0008',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'0009',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},
        {deviceNo:'00010',tempreture:'40C',pressure:'500',waterStorage:'467',runtime:'12小时34分',time:'2019-07-01 12:30:00'},

    ];
    const tableHeader=[
        {prop:'deviceNo',title:'设备编号'},
        {prop:'tempreture',title:'温度',unit:'C'},
        {prop:'pressure',title:'压强',unit:'Kpa'},
        {prop:'waterStorage',title:'蓄水量',unit:'t'},
        {prop:'runtime',title:'运行时间'},
        {prop:'time',title:'当前时间'},

    ]
    export default {
        name: "monitor-param-config",
        data:function () {
            return{
                data,
                tableHeader,
                activeTab:'1',
                form:{

                }
            }
        }
    }
</script>

<style scoped>
.container{
    display: flex;
    flex-wrap: nowrap;
    padding: 20px;
}

    .dynamic-data{
        width: 70%;
    }

    .data-config{
        width: 25%;
    }
</style>