import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Container,
    Card,
    Form,
    InputGroup,
    Button,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import logo from "../../assets/logo.png";
import calculator from "../../assets/calculator.png";
import "./LoginPage.css";

const LoginPage = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const onloginUser = (e) => {
        e.preventDefault()
        console.log(email, password)

        setEmail("")
        setPassword("")
    }

    return (
        <>
            <Container fluid className="vh-100">
                <Row className="h-100 g-0">
                    <Col
                        md={6}
                        className="d-none d-md-flex align-items-center justify-content-end pe-lg-5 column-gap-5"
                    >
                        <div style={{ maxWidth: "400px" }}>
                            <img src={logo} alt="logo" />
                            <h3 className="fw-bold">Welcome to</h3>
                            <h2 style={{ color: "var(--primary)" }} className="fw-bold">
                                SkillQuiz
                            </h2>
                            <p className="fw-semibold">Learn. Practice. Achieve.</p>
                            <p className="text-muted">
                                The best platform to practice Quizzes, <br /> improve skills and
                                compete with others.
                            </p>
                            <img src={calculator} alt="quiz" className="w-50 h-50" />
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        md={6}
                        className="d-flex align-items-center justify-content-start ps-lg-5"
                    >
                        <Card
                            style={{ width: "100%", maxWidth: "400px" }}
                            className="p-4 shadow-sm"
                        >
                            <h3
                                style={{ color: "var(--primary)" }}
                                className="text-center fw-bold"
                            >
                                Login
                            </h3>
                            <Form className="mt-3" onSubmit={(e) => onloginUser(e)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3 d-flex flex-column"
                                    controlId="formBasicPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={show ? "text" : "password"}
                                            placeholder="Password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                        />

                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShow(!show)}
                                        >
                                            {show ? <EyeSlash /> : <Eye />}
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <button type="submit" className="login-btn w-100">
                                    Login
                                </button>
                            </Form>
                            <span className="no-account text-center mt-3">
                                Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
                            </span>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
