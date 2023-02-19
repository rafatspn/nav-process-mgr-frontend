import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import config from '../config/config.json'
import { AuthContext } from '../context/AuthContext'

import '../styles/home.css'

export default function Home() {
    const auth = useContext(AuthContext)
    const [pages, setPages] = useState([])
    useEffect(() => {
        const getPages = async () => {
            const configData = {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('user')).token
                    }`
                }
            }

            const { data } = await axios.get(
                `${config.url}/api/users/934522851260163/pages`,
                configData
            )
            setPages(data)

            console.log('creationDate', data.creationDate)
        }

        getPages()
    }, [])

    const [searchResults, setSearchResults] = useState(pages)
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        setSearchResults(pages)
    }, [pages])
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)

        let results = pages.filter((item) => {
            if (typeof item === 'string') {
                return item.toLowerCase().includes(searchTerm.toLowerCase())
            } else {
                return JSON.stringify(item)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }
        })
        setSearchResults(results)
    }

    const setPageDetails = (page) => {
        console.log(page)
        auth.managePage(page)
    }

    console.log('pages', searchResults)
    return (
        <>
            <div className="container">
                <div className="row  justify-content-center align-items-center">
                    <div className="col-10">
                        <div className="mb-3 mt-5 text-center">
                            <h5>Your Pages</h5>
                            {/* <p>
                                Click Manage to setup your shop, manage leads
                                and process orders..
                            </p> */}
                        </div>
                    </div>
                    {/* <div className="col-5">
                        <div className="flex-sm-column  flex-column flex-md-row flex-lg-row d-flex mb-3">
                            <input
                                type="text"
                                className="form-control form_control"
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button
                                className="btn trand_btnsearch"
                                id="basic-addon2">
                                Search
                            </button>{' '}
                        </div>{' '}
                    </div> */}
                    <div className="col-10 mt-5">
                        {searchResults &&
                            searchResults.map((page, idx) => (
                                <div
                                    className="card trand_card mb-3 p-3"
                                    key={idx}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={page.profilePicture}
                                                height="100px"
                                                onClick={page.pageURL}
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <strong className="stong_title">
                                                {page.pageName}

                                                <a href={page.pageURL}>
                                                    {' '}
                                                    <span className="badge bg-bdg">
                                                        facebook
                                                    </span>
                                                </a>
                                            </strong>
                                            <div className="d-flex">
                                                <strong className="stong_title">
                                                    Page Id:{' '}
                                                    <span>
                                                        {page.pageId}
                                                        <span className="badge bg-bdg">
                                                            status
                                                        </span>{' '}
                                                        <span className="badge bg-bdg">
                                                            updated token
                                                        </span>
                                                    </span>
                                                </strong>
                                            </div>
                                            <div className="d-flex">
                                                <strong className="stong_title">
                                                    Subscribe on:{' '}
                                                    <span>
                                                        {new Date(
                                                            Date.parse(
                                                                page.creationDate
                                                            )
                                                        ).toLocaleString()}
                                                    </span>
                                                </strong>
                                            </div>
                                            {/* <div className="d-flex">
                                                <strong className="stong_title">
                                                    Expire on:{' '}
                                                    <span>234567589</span>
                                                </strong>
                                            </div> */}
                                            {/* <div className="d-flex mt-3">
                                                <button
                                                    className="btn trand_btnbox me-2"
                                                    onClick={() =>
                                                        setPageDetails(page)
                                                    }>
                                                    MANAGE
                                                </button>
                                                <button className="btn trand_btnbox ">
                                                    REMOVE LICENSE
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {/* <div className="d-flex justify-content-end align-items-center mb-5">
                            <button className="btn trand_btnanot ">
                                + Create Another Shop
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
