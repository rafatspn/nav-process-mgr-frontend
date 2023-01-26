import React, { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

import './CompetitorAnalysis.css'

const CompetitorAnalysis = () => {
    useEffect(() => {
        const generateGraph = () => {
            let activityData = [
                {
                    name: 'Shah Cement',
                    activityScore: 497
                },
                {
                    name: 'Seven Rings',
                    activityScore: 253
                },
                {
                    name: 'Crown Cement',
                    activityScore: 123
                },
                {
                    name: 'Premier Cement',
                    activityScore: 443
                }
            ]

            drawBarChart('activityChart', activityData, 'name', 'activityScore')
        }

        generateGraph()
    }, [])

    const drawBarChart = (destinationDiv, finalData, keyName, valueName) => {
        var root = am5.Root.new(destinationDiv)

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'none',
                wheelY: 'none'
            })
        )

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 })

        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                categoryField: 'name',
                renderer: yRenderer
            })
        )

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0,
                min: 0,
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        )

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Series 1',
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: 'activityScore',
                sequencedInterpolation: true,
                categoryYField: 'name'
            })
        )

        var columnTemplate = series.columns.template

        columnTemplate.setAll({
            draggable: true,
            cursorOverStyle: 'pointer',
            tooltipText: 'drag to rearrange',
            cornerRadiusBR: 10,
            cornerRadiusTR: 10
        })
        columnTemplate.adapters.add('fill', (fill, target) => {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        columnTemplate.adapters.add('stroke', (stroke, target) => {
            return chart.get('colors').getIndex(series.columns.indexOf(target))
        })

        columnTemplate.events.on('dragstop', () => {
            sortCategoryAxis()
        })

        // Get series item by category
        function getSeriesItem(category) {
            for (var i = 0; i < series.dataItems.length; i++) {
                var dataItem = series.dataItems[i]
                if (dataItem.get('categoryY') == category) {
                    return dataItem
                }
            }
        }

        // Axis sorting
        function sortCategoryAxis() {
            // Sort by value
            series.dataItems.sort(function (x, y) {
                return y.get('graphics').y() - x.get('graphics').y()
            })

            var easing = am5.ease.out(am5.ease.cubic)

            // Go through each axis item
            am5.array.each(yAxis.dataItems, function (dataItem) {
                // get corresponding series item
                var seriesDataItem = getSeriesItem(dataItem.get('category'))

                if (seriesDataItem) {
                    // get index of series data item
                    var index = series.dataItems.indexOf(seriesDataItem)

                    var column = seriesDataItem.get('graphics')

                    // position after sorting
                    var fy =
                        yRenderer.positionToCoordinate(
                            yAxis.indexToPosition(index)
                        ) -
                        column.height() / 2

                    // set index to be the same as series data item index
                    if (index != dataItem.get('index')) {
                        dataItem.set('index', index)

                        // current position
                        var x = column.x()
                        var y = column.y()

                        column.set('dy', -(fy - y))
                        column.set('dx', x)

                        column.animate({
                            key: 'dy',
                            to: 0,
                            duration: 600,
                            easing: easing
                        })
                        column.animate({
                            key: 'dx',
                            to: 0,
                            duration: 600,
                            easing: easing
                        })
                    } else {
                        column.animate({
                            key: 'y',
                            to: fy,
                            duration: 600,
                            easing: easing
                        })
                        column.animate({
                            key: 'x',
                            to: 0,
                            duration: 600,
                            easing: easing
                        })
                    }
                }
            })

            // Sort axis items by index.
            // This changes the order instantly, but as dx and dy is set and animated,
            // they keep in the same places and then animate to true positions.
            yAxis.dataItems.sort(function (x, y) {
                return x.get('index') - y.get('index')
            })
        }

        // Set data
        var data = finalData

        yAxis.data.setAll(data)
        series.data.setAll(data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000)
        chart.appear(1000, 100)
    }
    return (
        <>
            <div className="row mt-4">
                <div className="col-md-2">
                    <label>Filter</label>
                    <select className="form-control">
                        <option value="24hours">Last 24 hours</option>
                        <option value="7days">Last 7 days</option>
                        <option value="1month">Last 1 month</option>
                        <option value="custom">Custom range</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label>From</label>
                    <input type="date" className="form-control" />
                </div>
                <div className="col-md-2">
                    <label>To</label>
                    <input type="date" className="form-control" />
                </div>
                <div className="col-md-2 ">
                    <label className="d-block">&nbsp;</label>
                    <button type="date" className="btn btn_primary ">
                        Apply
                    </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="row">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary pb-3">
                                    Activity of Competitors
                                </h5>
                                {/* <h5 className="text-success">
                                    Total: {totalComments}
                                </h5> */}
                            </div>
                        </div>
                        <div id="activityChart"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompetitorAnalysis
