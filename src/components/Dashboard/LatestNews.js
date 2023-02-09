import React, { useEffect, useState } from 'react'
import './LatestNews.css'
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
                    <span className="me-2">0</span>
                    <span>X</span>
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
            drawBarChartWithImage(
                'typeOfQueries',
                typeOfQueries,
                'topic',
                'count'
            )
        }
        generateGraph()
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
                            <div id="typeOfQueries"></div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom">
                            <div className="d-flex">
                                <div className="me">
                                    {/* <img src="" /> */}0
                                </div>
                                <span className="head">Govt Project</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom2">
                            <div className="d-flex">
                                <div className="me">
                                    {/* <img src="" /> */}0
                                </div>
                                <span className="head">Economical</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom3">
                            <div className="d-flex">
                                <div className="me">
                                    {/* <img src="" /> */}0
                                </div>
                                <span className="head">Construction</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card card_custom4">
                            <div className="d-flex">
                                <div className="me">
                                    {/* <img src="" /> */}0
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
