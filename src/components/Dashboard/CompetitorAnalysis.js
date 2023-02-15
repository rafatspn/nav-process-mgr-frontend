import React, { useEffect } from 'react'
import axios from 'axios'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import config from '../../config/config.json'

import './CompetitorAnalysis.css'

const CompetitorAnalysis = () => {
    useEffect(() => {
        const generateGraph = async () => {
            const configData = {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('user')).token
                    }`
                }
            }

            let pageId = '730393906972869'
            const { data } = await axios.get(
                `${config.url}/api/posts/competitor/${pageId}`,
                configData
            )

            let activityData = data.activityData

            drawBarChart('activityChart', activityData, 'name', 'activityScore')

            let sentimentData = data.sentimentData

            drawImageBarChart('sentimentChart', sentimentData)
        }

        generateGraph()
    }, [])

    const drawImageBarChart = (destinationDiv, finalData) => {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
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
                wheelX: 'panX',
                wheelY: 'zoomX',
                layout: root.verticalLayout
            })
        )

        // Data
        var colors = chart.get('colors')

        var data = finalData
        for (let i = 0; i < data.length; i++) {
            if (data[i].sentimentScore == NaN) {
                data[i].sentimentScore = 0
            }
            data[i].columnSettings = { fill: colors.next() }
        }
        // var data = [
        //     {
        //         country: 'Shah Cement',
        //         visits: 0.88,
        //         icon: 'https://e7.pngegg.com/pngimages/726/726/png-clipart-smiling-emoji-illustration-emoji-happiness-smiley-sticker-applause-love-heart.png',
        //         columnSettings: { fill: colors.next() }
        //     },
        //     {
        //         country: 'Seven Rings',
        //         visits: 0.88,
        //         icon: 'https://e7.pngegg.com/pngimages/726/726/png-clipart-smiling-emoji-illustration-emoji-happiness-smiley-sticker-applause-love-heart.png',
        //         columnSettings: { fill: colors.next() }
        //     },
        //     {
        //         country: 'Crown Cement',
        //         visits: 0.72,
        //         icon: 'https://icon2.cleanpng.com/20180202/veq/kisspng-emoji-blushing-smiley-clip-art-blushing-emoji-png-hd-5a753fbd3e1a52.2262150515176334692544.jpg',
        //         columnSettings: { fill: colors.next() }
        //     },
        //     {
        //         country: 'Premier Cement',
        //         visits: 0.63,
        //         icon: 'https://icon2.cleanpng.com/20180202/veq/kisspng-emoji-blushing-smiley-clip-art-blushing-emoji-png-hd-5a753fbd3e1a52.2262150515176334692544.jpg',
        //         columnSettings: { fill: colors.next() }
        //     }
        // ]

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'name',
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 30
                }),
                bullet: function (root, axis, dataItem) {
                    return am5xy.AxisBullet.new(root, {
                        location: 0.5,
                        sprite: am5.Picture.new(root, {
                            width: 24,
                            height: 24,
                            centerY: am5.p50,
                            centerX: am5.p50,
                            src: dataItem.dataContext.icon
                        })
                    })
                }
            })
        )

        xAxis.get('renderer').labels.template.setAll({
            paddingTop: 20
        })

        xAxis.data.setAll(data)

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        )

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'sentimentScore',
                categoryXField: 'name'
            })
        )

        series.columns.template.setAll({
            tooltipText: '{categoryX}: {valueY}',
            tooltipY: 0,
            strokeOpacity: 0,
            templateField: 'columnSettings'
        })

        series.data.setAll(data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear()
        chart.appear(1000, 100)
    }

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

            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary">
                            Activity of Competitors
                        </h5>
                        <div id="activityChart"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary">Market Sentiment</h5>
                        <div id="sentimentChart"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-lg-2 col-sm-6 col-md-2"></div>
                <div className="col-lg-2 col-sm-6 col-md-2">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                    <div className="pBox c1">0%-20%</div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-2">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                    <div className="pBox c2">20%-40%</div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-2">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                    <div className="pBox c3">40%-60%</div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-2">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                    <div className="pBox c4">60%-80%</div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-2">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                    <div className="pBox c5">80%-100%</div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_img mb-2"
                            src="/assets/cp.jpg"
                        />
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <h6 className="text-center">78.8%</h6>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-4">
                    <div class="progress progress_custom">
                        <div
                            class="progress-bar bg-warning w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_emoji  mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_img mb-2"
                            src="/assets/cp.jpg"
                        />
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <h6 className="text-center">78.8%</h6>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-4">
                    <div class="progress progress_custom">
                        <div
                            class="progress-bar bg-warning w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_emoji  mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_img mb-2"
                            src="/assets/cp.jpg"
                        />
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <h6 className="text-center">78.8%</h6>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-4">
                    <div class="progress progress_custom">
                        <div
                            class="progress-bar bg-warning w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_emoji  mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_img mb-2"
                            src="/assets/cp.jpg"
                        />
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <h6 className="text-center">78.8%</h6>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-4">
                    <div class="progress progress_custom">
                        <div
                            class="progress-bar bg-warning w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-md-4">
                    <div className="d-flex justify-content-center">
                        <img
                            className="img_width_emoji  mb-2"
                            src="/assets/emoji.webp"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompetitorAnalysis
