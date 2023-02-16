import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../../context/AuthContext'
import config from '../../config/config.json'

import './Leads.css'

let optionsArr = [
    { text: 'Select', id: 'select' },
    { text: 'Who are Complaining', id: 'Complain' },
    { text: 'Who are Appreciating', id: 'Appreciation' },
    { text: 'Queries', id: 'Queries' }
]

const Leads = () => {
    const auth = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState(null)
    const [filteredValues, setFilteredValues] = useState(null)

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

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value)
        console.log('event.target.value', event.target.value)
        // if (event.target.value == 'option1') {
        //     setFilteredValues(option1)
        // } else if (event.target.value == 'option2') {
        //     setFilteredValues(option2)
        // } else {
        //     setFilteredValues(option3)
        // }
    }

    const getLeads = async () => {
        const configData = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`
            }
        }
        // console.log('Hello Arafat')
        // console.log(
        //     `${config.url}/api/comments/users?pageId=${
        //         auth.page ? auth.page.pdageId : null
        //     }&topic=${selectedOption}&type=data`
        // )
        const { data } = await axios.get(
            `${config.url}/api/comments/users?pageId=${
                auth.page ? auth.page.pdageId : null
            }&topic=${selectedOption}&type=data&from=${from}&to=${to}`,
            configData
        )
        console.log(data)
        setFilteredValues(data)
    }

    useEffect(() => {
        getLeads()
    }, [selectedOption])

    const downloadExcel = async () => {
        const response = await axios({
            url: `${config.url}/api/comments/users?pageId=${
                auth.page ? auth.page.pdageId : null
            }&topic=${selectedOption}&type=excel&from=${from}&to=${to}`,
            method: 'GET',
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`
            }
        })

        const href = URL.createObjectURL(response.data)

        const link = document.createElement('a')
        link.href = href
        link.setAttribute(
            'download',
            `userData_${new Date().getTime()}_${selectedOption}_dn.xlsx`
        )
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(href)
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
                        onClick={() => getLeads()}>
                        Apply
                    </button>
                </div>
            </div>

            <div className="row mt-3">
                <div className=" pe-4 pb-4">
                    <select
                        className="select_custom "
                        onChange={handleSelectChange}>
                        {optionsArr.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {selectedOption !== null && (
                        <div className="d-flex">
                            <table className="mt-3  table table-striped table-hover table-responsive">
                                <thead className="table_head">
                                    <tr>
                                        <th>email</th>
                                        <th>phone</th>
                                        <th>madid</th>
                                        <th>fn</th>
                                        <th>ln</th>
                                        <th>ct</th>
                                        <th>gen</th>
                                        <th>age</th> <th>uid</th>
                                    </tr>
                                </thead>
                                <tbody className="table_body">
                                    {filteredValues &&
                                        filteredValues.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.madid}</td>

                                                <td>{data.fn}</td>
                                                <td>{data.ln}</td>
                                                <td>{data.ct}</td>
                                                <td>{data.gen}</td>
                                                <td>{data.age}</td>
                                                <td>{data.uid}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="mt-3" onClick={downloadExcel}>
                                <img
                                    className="img_width ms-2"
                                    src="/assets/download.svg"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Leads
