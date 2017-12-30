
/**
 * Created by zhengweiliang on 2017/7/25.
 */
export function createStockBasicChart(res)
{
    return {
        title: {
            text: '基本面'
        },
        tooltip: {

        },
        legend:{
            x: 'center',
            y: 'bottom',
            data: ["市盈率", "每股公积金", "每股收益", "每股净资", "市净率", "收入同比", "利润同比", "毛利率", "净利润率"]
        },
        xAxis: {
            data: res.data.date
        },
        yAxis: {},
        series: [{
            name: "市盈率",
            type: "line",
            data: res.data.pe
        },{
            name: "每股公积金",
            type: "line",
            data: res.data.per_share
        },{
            name: "每股收益",
            type: "line",
            data: res.data.esp
        },{
            name: "每股净资",
            type: "line",
            data: res.data.bvps
        },{
            name: "市净率",
            type: "line",
            data: res.data.pb
        },{
            name: "收入同比",
            type: "line",
            data: res.data.rev
        },{
            name: "利润同比",
            type: "line",
            data: res.data.profit
        },{
            name: "毛利率",
            type: "line",
            data: res.data.gpr
        },{
            name: "净利润率",
            type: "line",
            data: res.data.npr
        }
        ]
    }

}
