import React from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import LatestNews from "../components/Dashboard/LatestNews";
import PostPerformance from "../components/Dashboard/PostPerformance";
import CompetitorAnalysis from "../components/Dashboard/CompetitorAnalysis";

export default function Dashboard() {
  return (
    <Container fluid>
      <div className="row">
        <div className="col-md-12">
          <Tabs
            defaultActiveKey="postPerformance"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey="latestNews" title="Latest News">
              <LatestNews />
            </Tab>
            <Tab
              className=" ps-5 pe-5 "
              eventKey="postPerformance"
              title="Post Performance"
            >
              <PostPerformance />
            </Tab>
            <Tab eventKey="competitorAnalysis" title="Competitor Analysis">
              <CompetitorAnalysis />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}
