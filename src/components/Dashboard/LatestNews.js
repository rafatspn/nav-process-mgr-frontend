import React, { useEffect, useState } from 'react'
import './LatestNews.css'
// import { Link } from 'react-router-dom'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import am5themes_Kelly from '@amcharts/amcharts5/themes/Kelly'
import axios from 'axios'

import config from '../../config/config.json'

const data = [
    {
        title: 'বিএনপির পর আ.লীগও আজকের সমাবেশ স্থগিত করল',
        description:
            ' বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা  বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা সমাবেশ স্থগিত করেছে। বিএনপির ছিল পদযাত্রা। আর ঢাকা মহানগর উত্তর আওয়ামী লীগের ছিল শান্তি সমাবেশ।',
        image: '/assets/aa.webp',
        date: '12/11/2023',
        source: 'Prothom alo',
        strength: '0'
    },
    {
        title: 'বিএনপির পর আ.লীগও আজকের সমাবেশ স্থগিত করল',
        description:
            ' বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা  বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা সমাবেশ স্থগিত করেছে। বিএনপির ছিল পদযাত্রা। আর ঢাকা মহানগর উত্তর আওয়ামী লীগের ছিল শান্তি সমাবেশ।',
        image: '/assets/aa.webp',
        date: '12/11/2023',
        source: 'Prothom alo',
        strength: '0'
    },
    {
        title: 'বিএনপির পর আ.লীগও আজকের সমাবেশ স্থগিত করল',
        description:
            ' বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা  বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা সমাবেশ স্থগিত করেছে। বিএনপির ছিল পদযাত্রা। আর ঢাকা মহানগর উত্তর আওয়ামী লীগের ছিল শান্তি সমাবেশ।',
        image: '/assets/aa.webp',
        date: '12/11/2023',
        source: 'Prothom alo',
        strength: '0'
    },
    {
        title: 'বিএনপির পর আ.লীগও আজকের সমাবেশ স্থগিত করল',
        description:
            ' বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা  বিএনপির পর আওয়ামী লীগও আজ বৃহস্পতিবার তাদের ডাকা সমাবেশ স্থগিত করেছে। বিএনপির ছিল পদযাত্রা। আর ঢাকা মহানগর উত্তর আওয়ামী লীগের ছিল শান্তি সমাবেশ।',
        image: '/assets/aa.webp',
        date: '12/11/2023',
        source: 'Prothom alo',
        strength: '0'
    }
]
function Card({ title, description, image, date, source, strength }) {
    return (
        <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="card card_news ">
                <div className="d-flex mb-2 justify-content-end">
                    {/* <span className="me-2">0</span> */}
                    <img
                        className="me-2 img_width"
                        src="/assets/heart-regular.svg"
                    />
                    <img
                        className=" img_width2"
                        src="/assets/xmark-solid.svg"
                    />
                </div>
                <img src={image} height="150px" />
                <h6 className="mt-2">{title}</h6>
                <p>{description}</p>
                <span className="mb-1">
                    <strong>Date:</strong> {date} <strong>an hour ago</strong>
                </span>
                <span className="mb-1">
                    <strong>Source:</strong> {source}
                </span>
                <span className="mb-1">
                    <strong>Strength:</strong> {strength}
                </span>
            </div>{' '}
        </div>
    )
}
const LatestNews = () => {
    const [totalComments, setTotalComments] = useState(0)
    const [totalfFeedback, setTotalfFeedback] = useState(0)
    const [totalQueries, setTotalQueries] = useState(0)
    const [postOneTotal, setPostOneTotal] = useState(0)
    const [postTwoTotal, setPostTwoTotal] = useState(0)
    const [postThreeTotal, setPostThreeTotal] = useState(0)
    const [topThreePosts, setTopThreePosts] = useState([])

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
                `${config.url}/api/posts/performance/${pageId}`,
                configData
            )
            console.log(data)

            let typeOfComments = data.talkingAbout
            let tcmnt = 0

            for (let i = 0; i < typeOfComments.length; i++) {
                if (typeOfComments[i].area == 'Others') {
                    typeOfComments[i].count = Math.round(
                        typeOfComments[i].count * 0.1
                    )
                }
                tcmnt = tcmnt + typeOfComments[i].count
            }

            setTotalComments(tcmnt)
            drawBarChartWithImage(
                'typeOfComments',
                typeOfComments,
                'area',
                'count'
            )

            let typeOfFeedback = data.perception
            drawPieChart('typeOfFeedback', typeOfFeedback)

            let typeOfQueriesa = [
                {
                    topic: 'Price',
                    count: 1021
                },
                {
                    topic: 'Contact Number',
                    count: 97
                },
                {
                    topic: 'Job Seeking',
                    count: 12
                },
                {
                    topic: 'Usage',
                    count: 122
                }
            ]
            setTotalQueries(1252)
            drawBarChartWithImage(
                'typeOfQueriesa',
                typeOfQueriesa,
                'topic',
                'count'
            )

            let typeOfComplainNegativeComments = [
                {
                    type: 'Gift',
                    count: 37
                },
                {
                    type: 'Price',
                    count: 36
                },
                {
                    type: 'Info',
                    count: 7
                },
                {
                    type: 'Quality',
                    count: 20
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

            setTopThreePosts(data.topThreePosts)
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

            setPostOneTotal(959)
            setPostTwoTotal(495)
            setPostThreeTotal(419)
            // drawMultiLineChart('publicEngagementByPost', publicEngagementByPost)

            let sentimentData = data.publicSentiment
            for (let i = 0; i < sentimentData.length; i++) {
                if (sentimentData[i].sentiment === 'Unknown') {
                    sentimentData.splice(i, 1)
                }
            }
            drawColumnChartWithImageBullets('publicSentiment', sentimentData)

            let topicData = []
            let topPostData = data.postTopics.postData
            for (let n = 0; n < data.postTopics.topicData.length; n++) {
                topicData.push([
                    {
                        x: am5.percent(50),
                        y: am5.percent(50),
                        image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg',
                        children: data.postTopics.topicData[n]
                    }
                ])
            }
            drawForcedDirectedTreeGraphs('postAnatomy_1', topicData[0])
            drawForcedDirectedTreeGraphs('postAnatomy_2', topicData[1])
            drawForcedDirectedTreeGraphs('postAnatomy_3', topicData[2])
            drawForcedDirectedTreeGraphs('postAnatomy_4', topicData[3])
        }
        generateGraph()
    }, [])

    const drawForcedDirectedTreeGraphs = (destinationDiv, data) => {
        var root = am5.Root.new(destinationDiv)

        root.setThemes([am5themes_Animated.new(root)])

        var container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: root.verticalLayout
            })
        )

        var series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
                downDepth: 1,
                initialDepth: 1,
                topDepth: 0,
                valueField: 'count',
                categoryField: 'name',
                childDataField: 'children',
                xField: 'x',
                yField: 'y',
                minRadius: 30,
                manyBodyStrength: -200
            })
        )

        // Disable circles
        // series.circles.template.set('forceHidden', true)
        // series.outerCircles.template.set('forceHidden', true)

        // ... except for central node
        // series.circles.template.adapters.add(
        //     'forceHidden',
        //     function (forceHidden, target) {
        //         return target.dataItem.get('depth') != 0 ? false : forceHidden
        //     }
        // )

        // Set up labels
        series.labels.template.setAll({
            fill: am5.color(0x000000),
            y: 50,
            //y: am5.percent(10),
            oversizedBehavior: 'none'
        })

        // Use adapter to leave central node label centered
        // series.labels.template.adapters.add('y', function (y, target) {
        //     return target.dataItem.get('depth') == 0 ? 0 : y
        // })

        // Use template.setup function to prep up node with an image
        series.nodes.template.setup = function (target) {
            target.events.on('dataitemchanged', function (ev) {
                var icon = target.children.push(
                    am5.Picture.new(root, {
                        width: 70,
                        height: 70,
                        centerX: am5.percent(50),
                        centerY: am5.percent(50),
                        src: ev.target.dataItem.dataContext.image
                    })
                )
            })
        }

        series.data.setAll(data)

        series.set('selectedDataItem', series.dataItems[0])
    }

    const drawColumnChartWithImageBullets = (destinationDiv, data) => {
        var root = am5.Root.new(destinationDiv)

        root.setThemes([am5themes_Animated.new(root)])

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'none',
                wheelY: 'none',
                paddingBottom: 50,
                paddingTop: 40
            })
        )

        var xRenderer = am5xy.AxisRendererX.new(root, {})
        xRenderer.grid.template.set('visible', false)

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                paddingTop: 40,
                categoryField: 'sentiment',
                renderer: xRenderer
            })
        )

        var yRenderer = am5xy.AxisRendererY.new(root, {})
        yRenderer.grid.template.set('strokeDasharray', [3])

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: yRenderer
            })
        )

        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Income',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'count',
                categoryXField: 'sentiment',
                sequencedInterpolation: true,
                calculateAggregates: true,
                maskBullets: false,
                tooltip: am5.Tooltip.new(root, {
                    dy: -30,
                    pointerOrientation: 'vertical',
                    labelText: '{valueY}'
                })
            })
        )

        series.columns.template.setAll({
            strokeOpacity: 0,
            cornerRadiusBR: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusTL: 10,
            maxWidth: 50,
            fillOpacity: 0.8
        })

        var currentlyHovered

        series.columns.template.events.on('pointerover', function (e) {
            handleHover(e.target.dataItem)
        })

        series.columns.template.events.on('pointerout', function (e) {
            handleOut()
        })

        function handleHover(dataItem) {
            if (dataItem && currentlyHovered != dataItem) {
                handleOut()
                currentlyHovered = dataItem
                var bullet = dataItem.bullets[0]
                bullet.animate({
                    key: 'locationY',
                    to: 1,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                })
            }
        }

        function handleOut() {
            if (currentlyHovered) {
                var bullet = currentlyHovered.bullets[0]
                bullet.animate({
                    key: 'locationY',
                    to: 0,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                })
            }
        }

        var circleTemplate = am5.Template.new({})

        series.bullets.push(function (root, series, dataItem) {
            var bulletContainer = am5.Container.new(root, {})
            var circle = bulletContainer.children.push(
                am5.Circle.new(
                    root,
                    {
                        radius: 34
                    },
                    circleTemplate
                )
            )

            var maskCircle = bulletContainer.children.push(
                am5.Circle.new(root, { radius: 27 })
            )

            var imageContainer = bulletContainer.children.push(
                am5.Container.new(root, {
                    mask: maskCircle
                })
            )

            var image = imageContainer.children.push(
                am5.Picture.new(root, {
                    templateField: 'logo',
                    centerX: am5.p50,
                    centerY: am5.p50,
                    width: 60,
                    height: 60
                })
            )

            return am5.Bullet.new(root, {
                locationY: 0,
                sprite: bulletContainer
            })
        })

        series.set('heatRules', [
            {
                dataField: 'valueY',
                min: am5.color(0x6771dc),
                max: am5.color(0x6771dc),
                target: series.columns.template,
                key: 'fill'
            },
            {
                dataField: 'valueY',
                min: am5.color(0x67b7dc),
                max: am5.color(0x67b7dc),
                target: circleTemplate,
                key: 'fill'
            }
        ])

        series.data.setAll(data)
        xAxis.data.setAll(data)

        var cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
        cursor.lineX.set('visible', false)
        cursor.lineY.set('visible', false)

        cursor.events.on('cursormoved', function () {
            var dataItem = series.get('tooltip').dataItem
            if (dataItem) {
                handleHover(dataItem)
            } else {
                handleOut()
            }
        })

        series.appear()
        chart.appear(1000, 100)
    }

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
            {/* <iframe
                src="http://103.187.95.197:5500/home.html"
                style={{ height: '100vh', width: '100%' }}></iframe> */}
            <div className="container-fluid p-4">
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
                            <div id="typeOfQueriesa"></div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom">
                            <div className="d-flex">
                                <div className="me">
                                    <img
                                        className="img_width"
                                        src="/assets/waterfire.jpg"
                                    />
                                </div>
                                <span className="head">Govt Project</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom2">
                            <div className="d-flex">
                                <div className="me">
                                    <img
                                        className="img_width2"
                                        src="/assets/water.webp"
                                    />
                                </div>
                                <span className="head">Economical</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom3">
                            <div className="d-flex">
                                <div className="me">
                                    <img
                                        className="img_width"
                                        src="/assets/medicine.webp"
                                    />
                                </div>
                                <span className="head">Construction</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom4">
                            <div className="d-flex">
                                <div className="me">
                                    <img
                                        className="img_width"
                                        src="/assets/blokchain.png"
                                    />
                                </div>
                                <span className="head">Cement Industry</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_topic">
                            <div className="d-flex">
                                <span className="head_topic">Topics:</span>
                                <span className="butan btn">Bridge</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_topic">
                            <div className="d-flex">
                                <span className="head_topic">Topics:</span>
                                <span className="butan2 btn">Income</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_topic">
                            <div className="d-flex">
                                <span className="head_topic">Topics:</span>
                                <span className="butan3 btn">
                                    Construction matirial
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_topic">
                            <div className="d-flex">
                                <span className="head_topic">Topics:</span>
                                <span className="butan4 btn">Cement</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    {data.map((cardData) => (
                        <Card key={cardData.title} {...cardData} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LatestNews
