import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { API } from 'aws-amplify';
import SyncLoader from 'react-spinners/SyncLoader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import logo from '../assets/logo.png';
import alertExampleImage from '../assets/alert-example.png';

import FeedForm from './FeedForm';

import './Home.css';

const initialFeed = localStorage.getItem('alertSettings');

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedData] = useState(initialFeed ? JSON.parse(initialFeed) : undefined);
  const location = useLocation();

  useEffect(() => {
    const queryObject = queryString.parse(location.search);

    if (
      queryObject.code &&
      queryObject.state &&
      localStorage.getItem('stateParameter') === atob(decodeURIComponent(queryObject.state))
    ) {
      setIsLoading(true);

      // Check if we are adding or deleting alert
      const deleteStatus = localStorage.getItem('deleteStatus');

      const apiName = 'alerts';
      const path = '/alerts';

      if (deleteStatus) {
        const data = {
          code: queryObject.code
        };

        const config = {
          body: data
        };

        API.del(apiName, path, config)
          .then(() => {
            toast.success('Successfully deleted alert.');
          })
          .catch(() => {
            toast.error('Something went wrong. Please try again.');
          })
          .finally(() => {
            localStorage.removeItem('deleteStatus');
            setIsLoading(false);
          });
      } else {
        const data = {
          code: queryObject.code,
          alertSettings: initialFeed
        };

        const config = {
          body: data
        };

        API.post(apiName, path, config)
          .then(() => {
            toast.success('Successfully created alert.');
          })
          .catch(() => {
            toast.error('Something went wrong. Please try again.');
          })
          .finally(() => {
            localStorage.removeItem('stateParameter');
            setIsLoading(false);
          });
      }
    }
  }, [location]);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <div style={{ marginTop: '1rem' }}>
            {isLoading ? (
              <SyncLoader color="#fff" />
            ) : (
              <>
                <ToastContainer position="bottom-right" autoClose={2000} />
                <Row>
                  <Col xs={12} lg={6}>
                    <h1 style={{ color: '#fbfdfe' }}>Discord Alerts</h1>
                    <p style={{ fontSize: '1.125rem' }}>
                      Send notifications to your Discord channel to get notified anytime a new
                      raider is looking for a guild. New player data is sourced from{' '}
                      <a href="https://www.wowprogress.com/">WoWProgress</a>.
                    </p>
                  </Col>
                  <Col xs lg className="img__container">
                    <a href={alertExampleImage}>
                      <img
                        className="demo-img img-fluid"
                        alt="Example of a webhook sent to Discord showing that a raider is looking for a guild."
                        src={alertExampleImage}
                      />
                    </a>
                  </Col>
                </Row>
                <FeedForm data={feedData} />
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                  <Row>
                    <Col>
                      <img className="mb-2" alt="lfr.io logo" src={logo} height="24" width="24" />
                      <small className="d-block mb-3 text-muted">
                        Created by Nick @ <a href="https://wholenanyards.com">wholeNaNyards</a>
                        <br />
                        My{' '}
                        <a href="https://www.wowprogress.com/guild/us/kel-thuzad/Dominance+Hotel">
                          Guild
                        </a>{' '}
                        is recruiting
                      </small>
                    </Col>
                  </Row>
                </footer>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
