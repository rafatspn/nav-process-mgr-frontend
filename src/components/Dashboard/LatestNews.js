import React, { useEffect, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import axios from 'axios'

import './LatestNews.css'
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

function Card({ title, description, imageUrl, dateTime, name, url, category }) {
    return (
        <div className="mb-2">
            <a href={url} target="_blank" className="text-decoration-none">
                <div className="card card_news">
                    <div className="d-flex mb-2 justify-content-end">
                        {/* <span className="me-2">0</span> */}
                        {/* <img
                        className="me-2 img_width"
                        src="/assets/heart-regular.svg"
                    />
                    <img
                        className=" img_width2"
                        src="/assets/xmark-solid.svg"
                    /> */}
                    </div>
                    {category && (
                        <img
                            src="https://images.prothomalo.com/prothomalo-bangla%2F2020-12%2Fec3a4dcd-b1a4-4cd6-b2ab-083eba916d31%2Fprothomalo_bangla_2020_09_4dc58fa1_4e01_4fe8_bb4e_366278f87917_govt.png?auto=format%2Ccompress&format=webp&w=768&dpr=1.0"
                            height="150px"
                        />
                    )}
                    {!category && <img src={imageUrl} height="150px" />}
                    <h6 className="mt-2 ellipsis-title">{title}</h6>
                    <p className="ellipsis">{description}</p>
                    <span className="mb-1">
                        <strong>Date:</strong>{' '}
                        {new Date(dateTime).toLocaleString('en-US')}{' '}
                        {/* <strong>an hour ago</strong> */}
                    </span>
                    <span className="mb-1">
                        <strong>Source:</strong> {name}
                    </span>
                </div>{' '}
            </a>
        </div>
    )
}

const LatestNews = () => {
    const [allData, setAllData] = useState({})
    const [allMasterData, setAllMasterData] = useState({})
    const [govtNewsNoOfClick, setGovtNewsNoOfClick] = useState(1)
    const [ecnecNoOfClick, setEcnecNoOfClick] = useState(1)
    const [constNewsNoOfClick, setConstNewsNoOfClick] = useState(1)
    const [cementNewsNoOfClick, setCementNewsNoOfClick] = useState(1)

    useEffect(() => {
        const getAllData = async () => {
            const configData = {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('user')).token
                    }`
                }
            }

            let pageId = '730393906972869'
            const { data } = await axios.get(
                `${config.url}/api/news/${pageId}`,
                configData
            )
            latestNewsChart(data.latestNeswData)
            setAllMasterData(JSON.parse(JSON.stringify(data)))

            data.govtProjectNews = data.govtProjectNews.slice(0, 10)
            data.ecnecNews = data.ecnecNews.slice(0, 10)
            data.constructionNews = data.constructionNews.slice(0, 10)
            data.cementNews = data.cementNews.slice(0, 10)

            setAllData(data)
        }

        getAllData()
    }, [])

    function latestNewsChart(newsData) {
        var canv = document.getElementById('latestNews')
        var input = []
        am4core.useTheme(am4themes_animated)
        //var chart = am4core.create("chartdiv", am4charts.XYChart);
        var chart = am4core.create(canv, am4charts.XYChart)
        chart.paddingRight = 20
        //{topic: "Gas Crisis", date: "2019-10-10T00:00:00.000Z", count: 2},
        for (var i = 0; i < newsData.length; i++) {
            let entry = {}
            entry.date = newsData[i].date.slice(0, 10)
            entry.topic = newsData[i].topic
            if (newsData[i].topic == 'Govt Project') {
                entry.value = newsData[i].count
                //entry.value2 = 0;
                //entry.value3 = 0;
                //entry.value4 = 0;
                //entry.value5 = 0;
            } else if (newsData[i].topic == 'ECNEC') {
                //entry.value = 0;
                entry.value2 = newsData[i].count
                //entry.value3 = 0;
                //entry.value4 = 0;
                //entry.value5 = 0;
            } else if (newsData[i].topic == 'Construction') {
                //entry.value = 0;
                //entry.value2 = 0;
                entry.value3 = newsData[i].count
                //entry.value4 = 0;
                //entry.value5 = 0;
            } else if (newsData[i].topic == 'Cement Industry') {
                //entry.value = 0;
                //entry.value2 = 0;
                //entry.value3 = 0;
                entry.value4 = newsData[i].count
                //entry.value5 = 0;
            }
            input.push(entry)
        }
        console.log(input)
        chart.data = input

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'date'
        categoryAxis.renderer.opposite = true

        // Create value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.renderer.inversed = true
        valueAxis.title.text = 'Trend of News'
        valueAxis.renderer.minLabelPosition = 0.01
        valueAxis.maxPrecision = 0

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries())
        series1.dataFields.valueY = 'value'
        series1.dataFields.categoryX = 'date'
        series1.name = 'Govt Project'
        series1.strokeWidth = 3
        series1.bullets.push(new am4charts.CircleBullet())
        series1.tooltipText = 'Govt Project in {date}: {value}'
        series1.legendSettings.valueText = '{value}'
        series1.visible = false

        // var series2 = chart.series.push(new am4charts.LineSeries())
        // series2.dataFields.valueY = 'value2'
        // series2.dataFields.categoryX = 'date'
        // series2.name = 'ECNEC'
        // series2.strokeWidth = 3
        // series2.bullets.push(new am4charts.CircleBullet())
        // series2.tooltipText = 'ECNEC in {date}: {value2}'
        // series2.legendSettings.valueText = '{value2}'

        var series3 = chart.series.push(new am4charts.LineSeries())
        series3.dataFields.valueY = 'value3'
        series3.dataFields.categoryX = 'date'
        series3.name = 'Construction'
        series3.strokeWidth = 3
        series3.bullets.push(new am4charts.CircleBullet())
        series3.tooltipText = 'Construction in {date}: {value3}'
        series3.legendSettings.valueText = '{value3}'

        var series4 = chart.series.push(new am4charts.LineSeries())
        series4.dataFields.valueY = 'value4'
        series4.dataFields.categoryX = 'date'
        series4.name = 'Cement Industry'
        series4.strokeWidth = 3
        series4.bullets.push(new am4charts.CircleBullet())
        series4.tooltipText = 'Cement Industry in {date}: {value4}'
        series4.legendSettings.valueText = '{value4}'

        // var series5 = chart.series.push(new am4charts.LineSeries())
        // series5.dataFields.valueY = 'value5'
        // series5.dataFields.categoryX = 'date'
        // series5.name = 'Others'
        // series5.strokeWidth = 3
        // series5.bullets.push(new am4charts.CircleBullet())
        // series5.tooltipText = 'Others in {date}: {value5}'
        // series5.legendSettings.valueText = '{value5}'

        // Add chart cursor
        chart.cursor = new am4charts.XYCursor()
        chart.cursor.behavior = 'zoomY'

        // Add legend
        chart.legend = new am4charts.Legend()
    }

    const loadMore = (callFor) => {
        if (callFor === 'Govt Project') {
            let start = govtNewsNoOfClick * 10
            let end = start + 10
            let lastTenElements = allMasterData.govtProjectNews.slice(
                start,
                end
            )
            setAllData({
                ...allData,
                govtProjectNews: [
                    ...allData.govtProjectNews,
                    ...lastTenElements
                ]
            })
            setGovtNewsNoOfClick(govtNewsNoOfClick + 1)
            console.log(allMasterData.govtProjectNews)
        } else if (callFor === 'ECNEC') {
            let start = ecnecNoOfClick * 10
            let end = start + 10
            let lastTenElements = allMasterData.ecnecNews.slice(start, end)
            console.log(lastTenElements)
            setAllData({
                ...allData,
                ecnecNews: [...allData.ecnecNews, ...lastTenElements]
            })
            console.log(allData.ecnecNews)
            setEcnecNoOfClick(ecnecNoOfClick + 1)
            console.log(start, end, ecnecNoOfClick, allMasterData.ecnecNews)
        } else if (callFor === 'Construction') {
            let start = constNewsNoOfClick * 10
            let end = start + 10
            let lastTenElements = allMasterData.constructionNews.slice(
                start,
                end
            )
            setAllData({
                ...allData,
                constructionNews: [
                    ...allData.constructionNews,
                    ...lastTenElements
                ]
            })
            setConstNewsNoOfClick(constNewsNoOfClick + 1)
            console.log(allMasterData.constructionNews)
        } else if (callFor === 'Cement Industry') {
            let start = cementNewsNoOfClick * 10
            let end = start + 10
            let lastTenElements = allMasterData.cementNews.slice(start, end)
            setAllData({
                ...allData,
                cementNews: [...allData.cementNews, ...lastTenElements]
            })
            setCementNewsNoOfClick(cementNewsNoOfClick + 1)
            console.log(allMasterData.cementNews)
        }
    }

    return (
        <>
            <div className="container-fluid pb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="bg-white rounded p-4 shadow">
                            <div id="latestNews"></div>
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
                                <span className="head">ECNEC</span>
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
                                <span className="butan2 btn">Notice</span>
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
                    <div className="col-lg-3 col-md-3 col-3">
                        {allData.govtProjectNews &&
                            allData.govtProjectNews.map((cardData, index) => (
                                <Card
                                    className="w-100"
                                    key={index}
                                    {...cardData}
                                />
                            ))}
                        <div className="d-flex justify-content-center">
                            {allMasterData.govtProjectNews &&
                                allMasterData.govtProjectNews.length > 10 && (
                                    <button
                                        type="button"
                                        className=" mt-3 btn btn_outline_danger"
                                        onClick={() =>
                                            loadMore('Govt Project')
                                        }>
                                        Load More
                                    </button>
                                )}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3">
                        {allData.ecnecNews &&
                            allData.ecnecNews.map((cardData, index) => (
                                <Card
                                    className="w-100"
                                    key={index}
                                    {...cardData}
                                />
                            ))}
                        <div className="d-flex justify-content-center">
                            {allMasterData.ecnecNews &&
                                allMasterData.ecnecNews.length > 10 && (
                                    <button
                                        type="button"
                                        className=" mt-3 btn btn_outline_danger"
                                        onClick={() => loadMore('ECNEC')}>
                                        Load More
                                    </button>
                                )}
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-3">
                        {allData.constructionNews &&
                            allData.constructionNews.map((cardData, index) => (
                                <Card
                                    className="w-100"
                                    key={index}
                                    {...cardData}
                                />
                            ))}
                        <div className="d-flex justify-content-center">
                            {allMasterData.constructionNews &&
                                allMasterData.constructionNews.length > 10 && (
                                    <button
                                        type="button"
                                        className=" mt-3 btn btn_outline_danger"
                                        onClick={() =>
                                            loadMore('Construction')
                                        }>
                                        Load More
                                    </button>
                                )}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3">
                        {allData.cementNews &&
                            allData.cementNews.map((cardData, index) => (
                                <Card
                                    className="w-100"
                                    key={index}
                                    {...cardData}
                                />
                            ))}
                        <div className="d-flex justify-content-center">
                            {allMasterData.cementNews &&
                                allMasterData.cementNews.length > 10 && (
                                    <button
                                        type="button"
                                        className=" mt-3 btn btn_outline_danger"
                                        onClick={() =>
                                            loadMore('Cement Industry')
                                        }>
                                        Load More
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestNews
