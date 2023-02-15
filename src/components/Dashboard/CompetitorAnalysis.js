import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import config from '../../config/config.json'

import './CompetitorAnalysis.css'

const CompetitorAnalysis = () => {
    const [graphData, setGraphData] = useState()
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

            setGraphData(data)

            let activityData = data.activityData

            drawBarChart('activityChart', activityData, 'name', 'activityScore')
        }

        generateGraph()
    }, [])

    const drawBarChart = (destinationDiv, finalData) => {
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

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        )

        var data = finalData
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'name',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        )

        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(data)

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            })
        )

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: 'name'
                })
            )

            series.columns.template.setAll({
                tooltipText: '{name}, {categoryX}:{valueY}',
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            })

            series.data.setAll(data)

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear()

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: '{valueY}',
                        fill: root.interfaceColors.get('alternativeText'),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                })
            })

            legend.data.push(series)
        }

        makeSeries('Post', 'post')
        makeSeries('Comment', 'comment')

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
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
            {graphData &&
                graphData.sentimentData &&
                graphData.sentimentData.map((dt) => (
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
                            <h6 className="text-center">
                                {Math.round(dt.sentimentScore * 100).toFixed(2)}
                                %
                            </h6>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-md-4">
                            <div class="progress progress_custom">
                                <div
                                    class="progress-bar bg-warning w-75"
                                    role="progressbar"
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-md-4">
                            <div className="d-flex justify-content-center">
                                <img
                                    className="img_width_emoji  mb-2"
                                    src={dt.icon}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            {/* <div className="row mt-3 mb-3">
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
            </div> */}
        </>
    )
}

export default CompetitorAnalysis
