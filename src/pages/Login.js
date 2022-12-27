import React, { useState } from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

export default function Login({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        window.location.href = '/dashboard'
    }

    return (
        <Container fluid className="mt-5">
            <Row className=" d-flex justify-content-center align-self-center align-items-center height_custom">
                <Col
                    sm={12}
                    xl={4}
                    lg={4}
                    md={4}
                    className=" height_customjustify-content-center align-self-center align-middle my-auto">
                    <Card className="card_custom align-middle">
                        <Card.Body className="justify-content-center">
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }></Form.Control>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="btn_custom w-100 mt-3"
                                    size="lg">
                                    Sign In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
