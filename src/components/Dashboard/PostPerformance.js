import React, { useEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Kelly from '@amcharts/amcharts5/themes/Kelly'
import './PostPerformance.css'
import axios from 'axios'
import config from '../../config/config.json'

const PostPerformance = () => {
    const [totalComments, setTotalComments] = useState(0)
    const [totalfFeedback, setTotalfFeedback] = useState(0)
    const [totalQueries, setTotalQueries] = useState(0)
    const [postOneTotal, setPostOneTotal] = useState(0)
    const [postTwoTotal, setPostTwoTotal] = useState(0)
    const [postThreeTotal, setPostThreeTotal] = useState(0)
    const [topThreePosts, setTopThreePosts] = useState([])

    useEffect(async () => {
        let typeOfComments = [
            {
                Area: 'Others',
                Count: 4623
            },
            {
                Area: 'Appreciation',
                Count: 944
            },
            {
                Area: 'Complain',
                Count: 160
            },
            {
                Area: 'Dealership',
                Count: 133
            },
            {
                Area: 'Query',
                Count: 556
            },
            {
                Area: 'Want to order',
                Count: 7
            }
        ]
        setTotalComments(6423)
        drawBarChartWithImage('typeOfComments', typeOfComments, 'Area', 'Count')

        // let typeOfFeedback = [
        //     {
        //         Topic: 'Complain',
        //         Count: 160,
        //         icon: 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/05-512.png'
        //     },
        //     {
        //         Topic: 'Appreciation',
        //         Count: 944,
        //         icon: 'https://www.seekpng.com/png/full/134-1341039_big-image-positive-icon.png'
        //     }
        // ]
        // setTotalfFeedback(1104)
        // drawBarChartWithImage(
        //     'typeOfFeedback',
        //     typeOfFeedback,
        //     'Topic',
        //     'Count'
        // )

        let typeOfFeedback = [
            {
                type: 'Appreciation',
                count: 944
            },
            {
                type: 'Complain',
                count: 160
            }
        ]
        drawPieChart('typeOfFeedback', typeOfFeedback)

        let typeOfQueries = [
            {
                Topic: 'Price',
                Count: 521
            },
            {
                Topic: 'Contact Number',
                Count: 19
            },
            {
                Topic: 'Job Seeking',
                Count: 12
            },
            {
                Topic: 'Usage',
                Count: 4
            }
        ]
        setTotalQueries(556)
        drawBarChartWithImage('typeOfQueries', typeOfQueries, 'Topic', 'Count')

        let typeOfComplainNegativeComments = [
            {
                type: 'Gift',
                count: 47
            },
            {
                type: 'Price',
                count: 46
            },
            {
                type: 'Info',
                count: 7
            }
        ]
        drawPieChart(
            'typeOfComplainNegativeComments',
            typeOfComplainNegativeComments
        )

        let typesOfAppreciation = [
            {
                type: 'Wish',
                count: 38
            },
            {
                type: 'Congratulations',
                count: 48
            },
            {
                type: 'Quality',
                count: 14
            }
        ]
        drawPieChart('typesOfAppreciation', typesOfAppreciation)

        const configData = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`
            }
        }

        // let pageId = '730393906972869'
        // const { data } = await axios.get(
        //     `${config.url}/api/posts/performance/${pageId}`,
        //     configData
        // )
        // setTopThreePosts(data.topThreePosts)
        let publicEngagementByPost = [
            {
                post: 'এলো বিশ্ব ফুটবলের গ্রেটেস্ট..',
                comment: 959
            },
            {
                post: 'বাংলাদেশী তরুণ অণুজীব বিজ্ঞানী..',
                comment: 495
            },
            {
                post: 'লাল সবুজেই..',
                comment: 419
            }
        ]
        // let publicEngagementByPost = [
        //     {
        //         post: 'Post 1',
        //         reaction: 190,
        //         comment: 12,
        //         reply: 17,
        //         share: 19,
        //         total: 238
        //     },
        //     {
        //         post: 'Post 2',
        //         reaction: 67,
        //         comment: 14,
        //         reply: 14,
        //         share: 16,
        //         total: 111
        //     },
        //     {
        //         post: 'Post 3',
        //         reaction: 150,
        //         comment: 18,
        //         reply: 12,
        //         share: 11,
        //         total: 191
        //     }
        // ]
        setPostOneTotal(959)
        setPostTwoTotal(495)
        setPostThreeTotal(419)
        drawMultiLineChart('publicEngagementByPost', publicEngagementByPost)
    }, [])

    const drawBarChartWithImage = (
        destinationDiv,
        finalData,
        keyName,
        valueName
    ) => {
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

        for (let i = 0; i < finalData.length; i++) {
            finalData[i].columnSettings = { fill: colors.next() }
        }

        var data = finalData

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: keyName,
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
                valueYField: valueName,
                categoryXField: keyName
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

    const drawPieChart = (destinationDiv, finalData) => {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(destinationDiv)

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)])

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        )

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: 'count',
                categoryField: 'type'
            })
        )

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(finalData)

        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series.appear(1000, 100)
    }

    const drawMultiLineChart = (destinationDiv, finalData) => {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(destinationDiv)

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
            // am5themes_Kelly.new(root)
        ])

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
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'post',
                renderer: am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        )

        xAxis.data.setAll(data)

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
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
                    categoryXField: 'post'
                })
            )

            series.columns.template.setAll({
                tooltipText: '{name}, {categoryX}:{valueY}',
                width: am5.percent(90),
                tooltipY: 0
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

        // makeSeries('Share', 'share')
        // makeSeries('Reply', 'reply')
        makeSeries('Comment', 'comment')
        // makeSeries('Reaction', 'reaction')

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100)
    }

    return (
        <>
            <div className="row mt-4">
                {/* <div className="col-md-2">
                    <label>Page</label>
                    <select className="form-control">
                        <option value="GoZayaan">GoZayaan</option>
                    </select>
                </div> */}
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
                                    What people are talking about
                                </h5>
                                <h5 className="text-success">
                                    Total: {totalComments}
                                </h5>
                            </div>
                        </div>
                        <div id="typeOfComments"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="row">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary pb-3">
                                    Customer Perception
                                </h5>
                                {/* <h5 className="text-success">
                                    Total: {totalfFeedback}
                                </h5> */}
                            </div>
                        </div>
                        <div id="typeOfFeedback"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="row">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary pb-3">
                                    What people wants to know
                                </h5>
                                <h5 className="text-success">
                                    Total: {totalQueries}
                                </h5>
                            </div>
                        </div>
                        <div id="typeOfQueries"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-6">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary pb-3">Type of Complain</h5>
                        <div id="typeOfComplainNegativeComments"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary pb-3">
                            Type of Appreciation
                        </h5>
                        <div id="typesOfAppreciation"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary">
                            Public Engagement By Post (Top 3 Posts)
                        </h5>
                        <div id="publicEngagementByPost"></div>
                        <div className="row mt-4 text-center">
                            <div className="col-md-4">
                                <h6>Total Engagement: {postOneTotal}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>Total Engagement: {postTwoTotal}</h6>
                            </div>
                            <div className="col-md-4">
                                <h6>Total Engagement: {postThreeTotal}</h6>
                            </div>
                        </div>

                        <div className="row mt-4 text-center">
                            <div className="col-md-4">
                                <a
                                    href="https://www.facebook.com/730393906972869_6416874951658041"
                                    target="_blank"
                                    type="button"
                                    className="btn btn_primary">
                                    Post 1
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a
                                    href="https://www.facebook.com/730393906972869_5459938064018406"
                                    target="_blank"
                                    type="button"
                                    className="btn btn_primary">
                                    Post 2
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a
                                    href="https://www.facebook.com/730393906972869_6499182893427246"
                                    target="_blank"
                                    type="button"
                                    className="btn btn_primary">
                                    Post 3
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostPerformance
