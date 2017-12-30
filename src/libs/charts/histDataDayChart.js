/**
 * Created by zhengweiliang on 2017/7/25.
 */
//开盘(open)，收盘(close)，最低(lowest)，最高(highest)
import {colorList,labelFont} from './constant'
import {formatTime} from 'echarts/lib/util/format'

export function createHistDataDayChart(res) {

    return {
        animation: false,
        color: colorList,
        title: {
            text: 'K线图'
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['日K', 'MA5', 'MA10', 'MA20']
        },
        tooltip: {
            triggerOn: 'none',
            transitionDuration: 0,
            confine: true,
            bordeRadius: 4,
            borderWidth: 1,
            borderColor: '#333',
            backgroundColor: 'rgba(255,255,255,0.9)',
            textStyle: {
                fontSize: 12,
                color: '#333'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {
                    top: 60
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            }
        },
        axisPointer: {
            link: [{
                xAxisIndex: [0, 1]
            }]
        },
        dataZoom: [{
            type: 'slider',
            xAxisIndex: [0, 1],
            realtime: false,
            start: 20,
            end: 70,
            top: 65,
            height: 20,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '120%'
        }, {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 30,
            height: 20
        }],
        xAxis: [{
            type: 'category',
            data: res.data.date,
            boundaryGap : false,
            axisLine: { lineStyle: { color: '#777' } },
            axisLabel: {
                formatter: function (value) {
                    return formatTime('MM-dd', value);
                }
            },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                show: true
            }
        }, {
            type: 'category',
            gridIndex: 1,
            data: res.data.date,
            scale: true,
            boundaryGap : false,
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: { lineStyle: { color: '#777' } },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                    show: true,
                    margin: 30,
                    color: '#B80C00'
                }
            }
        },{
            type: 'category',
            gridIndex: 2,
            data: res.data.date,
            scale: true,
            boundaryGap : false,
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: { lineStyle: { color: '#777' } },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                    show: true,
                    margin: 30,
                    color: '#B80C00'
                }
            }
        }],
        yAxis: [{
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            }
        }, {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        },{
            scale: true,
            gridIndex: 2,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }],
        grid: [{
            left: 20,
            right: 20,
            top: 60,
            height: 200
        }, {
            left: 20,
            right: 20,
            height: 40,
            top: 300
        },{
            left: 20,
            right: 20,
            height: 50,
            top: 355
        }],
        graphic: [{
            type: 'group',
            left: 'center',
            top: 70,
            width: 300,
            bounding: 'raw',
            children: [{
                id: 'MA5',
                type: 'text',
                style: {fill: colorList[1], font: labelFont},
                left: 0
            }, {
                id: 'MA10',
                type: 'text',
                style: {fill: colorList[2], font: labelFont},
                left: 'center'
            }, {
                id: 'MA20',
                type: 'text',
                style: {fill: colorList[3], font: labelFont},
                right: 0
            }]
        }],
        series: [{
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#7fbe9e'
                },
                emphasis: {
                    color: '#140'
                }
            },
            data: res.data.volume
        }, {
            type: 'candlestick',
            name: '日K',
            data: res.data.hist,
            itemStyle: {
                normal: {
                    color: '#ef232a',
                    color0: '#14b143',
                    borderColor: '#ef232a',
                    borderColor0: '#14b143'
                },
                emphasis: {
                    color: 'black',
                    color0: '#444',
                    borderColor: 'black',
                    borderColor0: '#444'
                }
            }
        }, {
            name: 'MA5',
            type: 'line',
            data: res.data.ma5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }, {
            name: 'MA10',
            type: 'line',
            data: res.data.ma10,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }, {
            name: 'MA20',
            type: 'line',
            data: res.data.ma20,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }, {
            name: '换手率',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: res.data.turnover,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }]
    };
}
