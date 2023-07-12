import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Form, Card, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import config from '../config/config.json'
import { AuthContext } from '../context/AuthContext'
import CustomButton from '../components/Elements/Button'
import FullWidthTextField from '../components/Elements/FullWidthTextField'

import '../styles/home.css'

export default function Home() {
    const auth = useContext(AuthContext)
    const [pages, setPages] = useState([])
    const [competitors, setCompetitors] = useState([])
    const [compURL, setCompURL] = useState('')

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

            const comResp = await axios.get(
                `${config.url}/api/users/934522851260163/competitors`,
                configData
            )

            if (Array.isArray(comResp.data)) {
                setCompetitors(comResp.data)
            }
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
        auth.managePage(page)
    }

    const handleCompetitor = (e) => {
        setCompURL(e.target.value)
    }

    const getCompetitors = async () => {
        let configData = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('user')).token
                }`
            }
        }

        const { data } = await axios.get(
            `${config.url}/api/users/${
                JSON.parse(localStorage.getItem('user')).userId
            }/competitors`,
            configData
        )

        setCompetitors(data)
    }

    const handleAddCompetitor = async () => {
        const response = await axios.post(`${config.process_mgr}/page`, {
            pageURL: compURL,
            addedBy: JSON.parse(localStorage.getItem('user')).userId
        })

        if (response.data?.code === 201) {
            alert('Page added successfully!')
            setCompURL('')
        } else if (response.data?.code === 11000) {
            alert('Page already exists')
        }

        await getCompetitors()
    }
    return (
        <>
            {' '}
            <div
                className="home"
                style={{ display: 'inline-flex', width: '100%' }}>
                <div className="mypages" style={{ width: '50%' }}>
                    <h5 style={{ textAlign: 'center', padding: '20px' }}>
                        My Pages
                    </h5>
                    <div>
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper'
                            }}>
                            {searchResults &&
                                searchResults.map((page, idx) => (
                                    <div>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="Image"
                                                    src={page.profilePicture}
                                                    onClick={page.pageURL}
                                                />
                                            </ListItemAvatar>
                                            <div>
                                                <ListItemText
                                                    primary={page.pageName}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{
                                                                    display:
                                                                        'inline'
                                                                }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary">
                                                                {page.pageId +
                                                                    ' '}
                                                            </Typography>
                                                            <text
                                                                style={{
                                                                    color: 'skyblue'
                                                                }}>
                                                                - Facebook
                                                            </text>
                                                        </>
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        color: '#2ebf8b'
                                                    }}>
                                                    <text>
                                                        Subscribed on:{' '}
                                                        {new Date(
                                                            Date.parse(
                                                                page.creationDate
                                                            )
                                                        ).toLocaleString()}
                                                    </text>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </div>
                                ))}
                        </List>
                    </div>
                </div>
                <div className="competitors" style={{ width: '45%' }}>
                    <h5 style={{ textAlign: 'center', padding: '20px' }}>
                        My Competitors
                    </h5>
                    <div style={{ display: 'flex' }}>
                        <FullWidthTextField
                            label="Competitor's facebook page url"
                            handleChange={handleCompetitor}
                            value={compURL}
                        />
                        <CustomButton
                            iconType="add"
                            label="add"
                            style={{ marginLeft: '2px' }}
                            handleClick={handleAddCompetitor}
                        />
                    </div>

                    <div>
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper'
                            }}>
                            {competitors &&
                                competitors.length > 0 &&
                                competitors.map((page, idx) => (
                                    <div>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="Image"
                                                    src={page.profilePicture}
                                                    onClick={page.pageURL}
                                                />
                                            </ListItemAvatar>
                                            <div>
                                                <ListItemText
                                                    primary={page.pageName}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{
                                                                    display:
                                                                        'inline'
                                                                }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary">
                                                                {page.pageId +
                                                                    ' '}
                                                            </Typography>
                                                            <text
                                                                style={{
                                                                    color: 'skyblue'
                                                                }}>
                                                                - Facebook
                                                            </text>
                                                        </>
                                                    }
                                                />
                                                {/* <div
                                                    style={{
                                                        color: '#2ebf8b'
                                                    }}>
                                                    <text>
                                                        Subscribed on:{' '}
                                                        {new Date(
                                                            Date.parse(
                                                                page.creationDate
                                                            )
                                                        ).toLocaleString()}
                                                    </text>
                                                </div> */}
                                            </div>
                                        </ListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </div>
                                ))}
                            {competitors.length == 0 && (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '30px',
                                        fontSize: '22px',
                                        fontWeight: 'bolder'
                                    }}>
                                    <text>
                                        You have not added any competitor yet.
                                    </text>
                                </div>
                            )}
                        </List>
                    </div>
                </div>
            </div>
        </>
    )
}
