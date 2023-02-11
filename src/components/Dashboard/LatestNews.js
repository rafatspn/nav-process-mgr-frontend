import React, { useEffect, useState } from 'react'
import './LatestNews.css'

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
    return (
        <>
            {/* <iframe
                src="http://103.187.95.197:5500/home.html"
                style={{ height: '100vh', width: '100%' }}></iframe> */}
            <div className="container-fluid p-4">
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
