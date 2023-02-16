import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import config from '../../config/config.json'

import './CompetitorAnalysis.css'
function ProgressBar({ progress }) {
    const progressBarStyle = {
        width: `${progress * 100}%`,
        height: '10px',
        backgroundColor: '#ffc107',
        borderRadius: '10px'
    }

    return (
        <div className="progress mb-2">
            <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={progressBarStyle}
                aria-valuenow={progress * 100}
                aria-valuemin="0"
                aria-valuemax="100"></div>
        </div>
    )
}
const CompetitorAnalysis = () => {
    const [graphData, setGraphData] = useState()
    const [loading, setLoading] = useState(false)

    const currentDate = new Date()
    const sixMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 12,
        currentDate.getDate()
    )
    const fromDate = sixMonthsAgo.toISOString().slice(0, 10)
    const toDate = currentDate.toISOString().slice(0, 10)

    const [from, setFrom] = useState(fromDate)
    const [to, setTo] = useState(toDate)

    const generateGraph = async () => {
        setLoading(true)
        const configData = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`
            }
        }

        let pageId = '730393906972869'
        const { data } = await axios.get(
            `${config.url}/api/posts/competitor/${pageId}?from=${from}&to=${to}`,
            configData
        )
        setLoading(false)
        setGraphData(data)
        console.log('graphData', graphData)

        // for (let i = 0; i < graphData.length; i++) {
        //     setProgress(graphData[i].sentimentData)
        // }
        // console.log('progress', progress)
        let activityData = data.activityData

        drawBarChart('activityChart', activityData, 'name', 'activityScore')
    }

    useEffect(() => {
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
            <div className="row mt-3">
                {/* <div className="col-md-2">
                    <label>Filter</label>
                    <select className="form-control">
                        <option value="24hours">Last 24 hours</option>
                        <option value="7days">Last 7 days</option>
                        <option value="1month">Last 1 month</option>
                        <option value="custom">Custom range</option>
                    </select>
                </div> */}
                <div className="col-md-2">
                    <label>From</label>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2">
                    <label>To</label>
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 ">
                    <label className="d-block">&nbsp;</label>
                    <button
                        type="date"
                        className="btn btn_primary"
                        onClick={() => generateGraph()}>
                        Apply
                    </button>
                </div>
            </div>
            {loading && (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h5>Loading..</h5>
                    </div>
                </div>
            )}
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="pb-3">
                            <h5 className="text-primary">
                                Post engagement by activity
                            </h5>
                            <small>
                                This graph shows total post vs total engagement
                            </small>
                        </div>
                        <div id="activityChart"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="pb-3">
                            <h5 className="text-primary">Market Sentiment</h5>
                            <small>
                                This shows how people perceive each brand, with
                                figures above 50% indicating positive sentiment
                                and figures below 50% indicating negative
                                sentiment, while 50% is neutral
                            </small>
                        </div>
                        <div className="row text-center mb-5">
                            <div className="col-lg-2 col-sm-6 col-md-2"></div>

                            <div className="col-lg-2 col-sm-6 col-md-2">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="img_width mb-2"
                                        src="https://e7.pngegg.com/pngimages/726/726/png-clipart-smiling-emoji-illustration-emoji-happiness-smiley-sticker-applause-love-heart.png"
                                    />
                                </div>
                                <div className="pBox c1">0.61-1.00</div>
                            </div>
                            <div className="col-lg-2 col-sm-6 col-md-2">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="img_width mb-2"
                                        src="https://icon2.cleanpng.com/20180202/veq/kisspng-emoji-blushing-smiley-clip-art-blushing-emoji-png-hd-5a753fbd3e1a52.2262150515176334692544.jpg"
                                    />
                                </div>
                                <div className="pBox c2">0.21-0.60</div>
                            </div>
                            <div className="col-lg-2 col-sm-6 col-md-2">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="img_width mb-2"
                                        src="https://www.pngfind.com/pngs/m/10-102223_download-slightly-smiling-emoji-icon-emojis-png-ios.png"
                                    />
                                </div>
                                <div className="pBox c3">-0.20-0.20</div>
                            </div>
                            <div className="col-lg-2 col-sm-6 col-md-2">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="img_width mb-2"
                                        src="https://www.transparentpng.com/thumb/sad-emoji/Ej7iyi-sad-emoji-cut-out.png"
                                    />
                                </div>
                                <div className="pBox c4">-0.60--0.21</div>
                            </div>
                            <div className="col-lg-2 col-sm-6 col-md-2">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="img_width mb-2"
                                        src="https://img.favpng.com/0/25/24/face-with-tears-of-joy-emoji-crying-laughter-sticker-png-favpng-gxKCtgzxBTVc3b4cdSe49qkJd_t.jpg"
                                    />
                                </div>
                                <div className="pBox c5">-1.00--0.61</div>
                            </div>
                        </div>
                        {graphData &&
                            graphData.sentimentData &&
                            graphData.sentimentData.map((dt) => (
                                <div className="row mt-3 mb-3">
                                    <div className="col-lg-3 col-sm-6 col-md-4">
                                        <div className="d-flex justify-content-left">
                                            {/* <img
                                                className="img_width_img mb-2"
                                                src="/assets/cp.jpg"
                                            /> */}
                                            <p>{dt.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-sm-6 col-md-4">
                                        {/* <h6 className="text-center mt-2">
                                            {Math.round(
                                                dt.sentimentScore * 100
                                            ).toFixed(2)}
                                            %
                                        </h6> */}
                                        <h6 className="text-center mt-2">
                                            {dt.sentimentScore.toFixed(2)}
                                        </h6>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-md-4 ">
                                        <ProgressBar
                                            className="progress  progress_custom"
                                            progress={dt.sentimentScore}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-4">
                                        <div className="d-flex justify-content-center">
                                            <img
                                                className="img_width_emoji  "
                                                src={dt.icon}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
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
                    <div className="progress progress_custom">
                        <div
                            className="progress-bar bg-warning w-75"
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
                    <div className="progress progress_custom">
                        <div
                            className="progress-bar bg-warning w-75"
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
                    <div className="progress progress_custom">
                        <div
                            className="progress-bar bg-warning w-75"
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

            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="pb-3">
                            <h5 className="text-primary">
                                Most talked topics in the market
                            </h5>
                            <small>
                                This list shows the popularity of the brands in
                                the industry
                            </small>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Page Name</th>
                                        <th scope="col" className="text-center">
                                            Appreciation
                                        </th>
                                        <th scope="col" className="text-center">
                                            Queries
                                        </th>
                                        <th scope="col" className="text-center">
                                            Complain
                                        </th>
                                        <th scope="col" className="text-center">
                                            Order
                                        </th>
                                        <th scope="col" className="text-center">
                                            Irrelivant
                                        </th>
                                        <th scope="col" className="text-center">
                                            Dealership
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {graphData &&
                                        graphData.mattersMostData.map(
                                            (item) => (
                                                <tr>
                                                    <td>{item.pageName}</td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Appreciation' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Queries' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Complain' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Order' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Irrelivant' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.topics.map(
                                                            (childItem) =>
                                                                childItem.name ===
                                                                    'Dealership' && (
                                                                    <span>
                                                                        {
                                                                            childItem.count
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompetitorAnalysis
