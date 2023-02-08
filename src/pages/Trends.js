import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'

import '../styles/trends.css'
export default function Trends() {
    return (
        <>
            <div className="container">
                <div className="row  justify-content-center align-items-center">
                    <div className="col-10">
                        <div className="mb-3 mt-5 text-center">
                            <h5>Your Shop</h5>
                            <p>
                                Click Manage to setup your shop, manage leads
                                and process orders..
                            </p>
                        </div>
                    </div>
                    <div className="col-5">
                        <div class="flex-sm-column  flex-column flex-md-row flex-lg-row d-flex mb-3">
                            <input
                                type="text"
                                class="form-control form_control"
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <button
                                class="btn trand_btnsearch"
                                id="basic-addon2">
                                Search
                            </button>{' '}
                        </div>{' '}
                    </div>
                    <div className="col-10 mt-5">
                        <div className="card trand_card mb-3 p-3">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <img
                                        src="/assets/avatar.jpg"
                                        height="100px"
                                    />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <strong className="stong_title">
                                        ABC Midea{' '}
                                        <span class="badge bg-bdg">
                                            facebook
                                        </span>
                                    </strong>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Page Id:{' '}
                                            <span>
                                                234567589{' '}
                                                <span class="badge bg-bdg">
                                                    status
                                                </span>{' '}
                                                <span class="badge bg-bdg">
                                                    updated token
                                                </span>
                                            </span>
                                        </strong>
                                    </div>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Subscribe on: <span>234567589</span>
                                        </strong>
                                    </div>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Expire on: <span>234567589</span>
                                        </strong>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <button className="btn trand_btnbox  me-2">
                                            MANAGE
                                        </button>
                                        <button className="btn trand_btnbox ">
                                            REMOVE LICENSE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>{' '}
                        <div className="card trand_card mb-3 p-3">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <img
                                        src="/assets/avatar.jpg"
                                        height="100px"
                                    />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <strong className="stong_title">
                                        My Business{' '}
                                        <span class="badge bg-bdg">
                                            facebook
                                        </span>
                                    </strong>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Page Id:{' '}
                                            <span>
                                                234567589{' '}
                                                <span class="badge bg-bdg">
                                                    status
                                                </span>{' '}
                                                <span class="badge bg-bdg">
                                                    updated token
                                                </span>
                                            </span>
                                        </strong>
                                    </div>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Subscribe on: <span>234567589</span>
                                        </strong>
                                    </div>
                                    <div className="d-flex">
                                        <strong className="stong_title">
                                            Expire on: <span>234567589</span>
                                        </strong>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <button className="btn trand_btnbox  me-2">
                                            MANAGE
                                        </button>
                                        <button className="btn trand_btnbox ">
                                            REMOVE LICENSE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mb-5">
                            <button className="btn trand_btnanot ">
                                + Create Another Shop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
