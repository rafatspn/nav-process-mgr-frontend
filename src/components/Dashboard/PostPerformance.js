import React, { useEffect, useState, useContext } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import './PostPerformance.css'
import config from '../../config/config.json'
import { AuthContext } from '../../context/AuthContext'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const PostPerformance = () => {
    const auth = useContext(AuthContext)

    const [totalComments, setTotalComments] = useState(0)
    const [totalfFeedback, setTotalfFeedback] = useState(0)
    const [totalQueries, setTotalQueries] = useState(0)
    const [postOneTotal, setPostOneTotal] = useState(0)
    const [postTwoTotal, setPostTwoTotal] = useState(0)
    const [postThreeTotal, setPostThreeTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [topThreePosts, setTopThreePosts] = useState([])
    const [selectedTopic, setSelectedTopic] = useState()
    const [topicComments, setTopicComments] = useState([])
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [data, setData] = useState([
        { comment: 'Comment 1' },
        { comment: 'Comment 2' },
        { comment: 'Comment 3' }
    ])

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
            `${config.url}/api/posts/performance/${pageId}?from=${from}&to=${to}`,
            configData
        )
        setLoading(false)
        setTopThreePosts(data.postTopics.postData)
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
        drawBarChartWithImage('typeOfComments', typeOfComments, 'area', 'count')

        // let typeOfFeedback = data.perception
        // drawPieChart('typeOfFeedback', typeOfFeedback)

        let typeOfQueries = [
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
        drawBarChartWithImage('typeOfQueries', typeOfQueries, 'topic', 'count')

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
        // drawMultiLineChart('publicEngagementByPost', publicEngagementByPost)

        // let sentimentData = data.publicSentiment
        // for (let i = 0; i < sentimentData.length; i++) {
        //     if (sentimentData[i].sentiment === 'Unknown') {
        //         sentimentData.splice(i, 1)
        //     }
        // }
        // drawColumnChartWithImageBullets('publicSentiment', sentimentData)

        let topicData = []
        let topPostData = data.postTopics.postData
        for (let n = 0; n < data.postTopics.topicData.length; n++) {
            topicData.push([
                {
                    x: am5.percent(50),
                    y: am5.percent(50),
                    image: '/assets/shah_cement_logo.png',
                    children: data.postTopics.topicData[n]
                }
            ])
        }
        console.log('logo print ', topicData)
        // let postData_1 = [
        //     {
        //         x: am5.percent(50),
        //         y: am5.percent(50),
        //         image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg',
        //         children: data.postTopics[0]
        //     }
        // ]
        // let postData_2 = [
        //     {
        //         x: am5.percent(50),
        //         y: am5.percent(50),
        //         image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg',
        //         children: data.postTopics[2]
        //     }
        // ]
        // let postData_3 = [
        //     {
        //         x: am5.percent(50),
        //         y: am5.percent(50),
        //         image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg',
        //         children: data.postTopics[3]
        //     }
        // ]
        // let postData = [
        //     {
        //         x: am5.percent(50),
        //         y: am5.percent(50),
        //         image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg',
        //         children: [
        //             {
        //                 name: 'Chrome',
        //                 value: 1,
        //                 image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg'
        //             },
        //             {
        //                 name: 'Firefox',
        //                 value: 2,
        //                 image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg'
        //             },
        //             {
        //                 name: 'IE',
        //                 value: 9,
        //                 image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg'
        //             },
        //             {
        //                 name: 'Safari',
        //                 value: 1,
        //                 image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg'
        //             },
        //             {
        //                 name: 'Opera',
        //                 value: 1,
        //                 image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg'
        //             }
        //         ]
        //     }
        // ]
        drawForcedDirectedTreeGraphs(
            'postAnatomy_1',
            topicData[0],
            topPostData[0]
        )
        drawForcedDirectedTreeGraphs(
            'postAnatomy_2',
            topicData[1],
            topPostData[1]
        )
        drawForcedDirectedTreeGraphs(
            'postAnatomy_3',
            topicData[2],
            topPostData[2]
        )
        drawForcedDirectedTreeGraphs(
            'postAnatomy_4',
            topicData[3],
            topPostData[3]
        )
    }

    useEffect(() => {
        generateGraph()
    }, [])

    const drawForcedDirectedTreeGraphs = (destinationDiv, data, post) => {
        var root = am5.Root.new(destinationDiv)
        const myTheme = am5.Theme.new(root)
        myTheme.rule('Label').setAll({
            fill: am5.color('#171717'),

            fontSize: '.75rem'
        })
        root.setThemes([am5themes_Animated.new(root), myTheme])

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

        series.nodes.template.events.on('click', async function (e) {
            // check if we have a selected data item
            const clickedTopic = e.target.dataItem.dataContext.topic
            console.log(post)

            const configData = {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('user')).token
                    }`
                }
            }

            const { data } = await axios.get(
                `${config.url}/api/comments/topic?topic=${clickedTopic}&postId=${post.postId}`,
                configData
            )

            setTopicComments(data)
            setShow(true)
        })

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

    const filterHandler = () => {
        console.log('')
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {topicComments.map((item, index) => (
                        <div key={index}>
                            <div className="card p-2 mt-1">
                                <span>{item.message}</span>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn_primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="row mt-3">
                {/* <div className="col-md-2">
                    <label>Page</label>
                    <select className="form-control">
                        <option value="GoZayaan">GoZayaan</option>
                    </select>
                </div> */}
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
                        className="form-control"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label>To</label>
                    <input
                        type="date"
                        className="form-control"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
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
            <div className="row mt-5 ms-2 me-2 bg-white rounded p-4 shadow">
                <div className="col-md-4">
                    <div
                        style={{ height: '344px' }}
                        className="b pt-4 pe-4 pb-4">
                        <div className="d-flex justify-content-between mt-2">
                            <h6 className="people_taking  p-2 mb-3 mt-3 ms-4">
                                What people are talking about{' '}
                            </h6>
                        </div>
                        <div className="mt-5-3 p-4 ">
                            <small className="mt-5">
                                This graph shows the number of responses from
                                customers related to each area of conversation
                                in the industry. Please note, only customer
                                perception is taken into account here.
                            </small>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="">
                        <div className="row">
                            {/* <div className="d-flex justify-content-between">
                                <div className="pb-3">
                                    <h5 className="text-primary">
                                        What people are talking about{' '}
                                    </h5>
                                    <small>
                                        This graph shows the number of responses
                                        from customers related to each area of
                                        conversation in the industry. Please
                                        note, only customer perception is taken
                                        into account here.
                                    </small>
                                </div>
                                <h5 className="text-success">
                                    Total: {totalComments}
                                </h5>
                            </div> */}
                            <h5 className="text-success text-end pe-4 mb-4 ms-3">
                                Total: {totalComments}
                            </h5>
                        </div>

                        <div id="typeOfComments"></div>
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="row">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-primary pb-3">
                                    Customer Perception
                                </h5> */}
                {/* <h5 className="text-success">
                                    Total: {totalfFeedback}
                                </h5> */}
                {/* </div>
                        </div>
                        <div id="typeOfFeedback"></div>
                    </div>
                </div> */}
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <div className="pb-3">
                            <h5 className="text-primary">What matters most </h5>
                            <small>
                                This graph shows the various things that
                                customers care about and is categorised into
                                things customers ask about, complain about and
                                appreciate.
                            </small>
                        </div>
                        <Tabs
                            defaultActiveKey="queries"
                            id="justify-tab-example"
                            className="mb-3"
                            justify>
                            <Tab eventKey="queries" title="Queries">
                                <h5 className="text-success">
                                    Total: {totalQueries}
                                </h5>
                                <div id="typeOfQueries"></div>
                            </Tab>
                            <Tab eventKey="appreciation" title="Appreciation">
                                <div id="typesOfAppreciation"></div>
                            </Tab>
                            <Tab eventKey="complain" title="Complain">
                                <div id="typeOfComplainNegativeComments"></div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            {/* <div className="row mt-3">
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
            </div> */}
            {/* <div className="row mt-3 mb-3">
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
            </div> */}
            {/* <div className="row mt-3 mb-3">
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
            </div> */}
            {/* <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary">Public Sentiment</h5>
                        <div id="publicSentiment"></div>
                    </div>
                </div>
            </div> */}
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-4 shadow">
                        <h5 className="text-primary">
                            Public Engagement By Post (Top 4 Posts)
                        </h5>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-6">
                    <div className="bg-white rounded ps-4 pe-4 pb-4 pt-2 shadow post1">
                        {topThreePosts[0] && (
                            <a
                                className="text-primary pb-5 ellipsis mb-3"
                                target="_blank"
                                href={topThreePosts[0].url}>
                                Post 1: {topThreePosts[0].message}
                            </a>
                        )}
                        <div></div>
                        <div id="postAnatomy_1"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded ps-4 pe-4 pb-4 pt-2 shadow post1">
                        {topThreePosts[1] && (
                            <a
                                className="text-primary pb-5 ellipsis"
                                href={topThreePosts[1].url}>
                                Post 2: {topThreePosts[1].message}
                            </a>
                        )}
                        <div className="mt-3" id="postAnatomy_2"></div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-md-6">
                    <div className="bg-white rounded ps-4 pe-4 pb-4 pt-2 shadow post1">
                        {topThreePosts[2] && (
                            <a
                                className="text-primary pb-5 ellipsis"
                                href={topThreePosts[2].url}>
                                Post 3: {topThreePosts[2].message}
                            </a>
                        )}
                        <div id="postAnatomy_3"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded ps-4 pe-4 pb-4 pt-2 shadow post1">
                        {topThreePosts[3] && (
                            <a
                                className="text-primary pb-5 ellipsis"
                                href={topThreePosts[3].url}
                                target="_blank">
                                Post 4: {topThreePosts[3].message}
                            </a>
                        )}
                        <div id="postAnatomy_4"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostPerformance
