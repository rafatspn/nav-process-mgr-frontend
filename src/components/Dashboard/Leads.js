import React, { useState, useEffect } from 'react'
import './Leads.css'

let option1 = [
    {
        id: 1,
        email: 'Data 1',
        phone: 'phone 1',
        madid: 'cdg',
        fn: 'cdg',
        ln: 'cdg',
        ct: 'cdg',
        gen: 'cdg',
        age: '123',
        uid: '12'
    }
]
let option2 = [
    {
        id: 1,
        email: 'Data 1',
        phone: 'phone 1',
        madid: 'abc',
        fn: 'abc',
        ln: 'abc',
        ct: 'abc',
        gen: 'abc',
        age: '123',
        uid: '12'
    }
]
let option3 = [
    {
        id: 1,
        email: 'Data 1',
        phone: 'phone 1',
        madid: 'gggg',
        fn: 'gggg',
        ln: 'gggg',
        ct: 'gggg',
        gen: 'gggg',
        age: '123',
        uid: '12'
    },
    {
        id: 1,
        email: 'Data 1',
        phone: 'phone 1',
        madid: 'ffff',
        fn: 'ffff',
        ln: 'ffff',
        ct: 'ffff',
        gen: 'ffff',
        age: '123',
        uid: '12'
    },
    {
        id: 1,
        email: 'Data 1',
        phone: 'phone 1',
        madid: 'jjjj',
        fn: 'jjjj',
        ln: 'jjjj',
        ct: 'jjjj',
        gen: 'jjjj',
        age: '123',
        uid: '12'
    }
]
let optionsArr = ['select', 'option1', 'option2', 'option3']

const Leads = () => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [filteredValues, setFilteredValues] = useState(null)

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value)
        console.log('event.target.value', event.target.value)
        if (event.target.value == 'option1') {
            setFilteredValues(option1)
        } else if (event.target.value == 'option2') {
            setFilteredValues(option2)
        } else {
            setFilteredValues(option3)
        }
    }

    return (
        <>
            <div className="row mt-4">
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
                <div className=" pe-4 pb-4">
                    <select
                        className="select_custom "
                        onChange={handleSelectChange}>
                        {optionsArr.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
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
                                    {filteredValues.map((data) => (
                                        <tr key={data.id}>
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
                            <div className="mt-3">
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
