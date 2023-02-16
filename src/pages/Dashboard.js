import React from 'react'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import LatestNews from '../components/Dashboard/LatestNews'
import PostPerformance from '../components/Dashboard/PostPerformance'
import CompetitorAnalysis from '../components/Dashboard/CompetitorAnalysis'
import Leads from '../components/Dashboard/Leads'

export default function Dashboard() {
    return (
        <Container fluid>
            <div className="row mt-3">
                <div className="col-md-12">
                    <Tabs
                        defaultActiveKey="latestNews"
                        id="uncontrolled-tab-example">
                        <Tab eventKey="latestNews" title="Latest News">
                            <LatestNews />
                        </Tab>
                        <Tab
                            eventKey="postPerformance"
                            title="Post Performance">
                            <PostPerformance />
                        </Tab>
                        <Tab
                            eventKey="competitorAnalysis"
                            title="Competitor Analysis">
                            <CompetitorAnalysis />
                        </Tab>
                        <Tab eventKey="leads" title="Leads">
                            <Leads />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </Container>
    )
}
