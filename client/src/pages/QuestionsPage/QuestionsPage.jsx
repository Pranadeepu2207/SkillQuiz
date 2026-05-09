import { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrls } from "../../api";
import { RotatingLines } from "react-loader-spinner";


import backBtn from "../../assets/back-button.png";
import correct from '../../assets/correct.png';
import incorrect from "../../assets/incorrect.png";
import unanswer from "../../assets/unanswer.png";
import total from "../../assets/total.png";
import nxtBtn from "../../assets/next.png"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

import "./QuestionsPage.css";

const QuestionsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { skillId, levelId } = location.state;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [questionsData, setQuestionsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // const [resultData, setResultData] = useState(null);
    const [resultData, setResultData] = useState(true)
    const [showReview, setShowReview] = useState(false);
    const [reviewType, setReviewType] = useState("");

    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true);
            try {
                const res = await axios.get(apiUrls.getQuestionsApi(skillId, levelId));
                if (res.status == 200) {
                    console.log(res);
                    setLoading(false);
                    setQuestionsData(res?.data?.data);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error?.response?.data?.message || "Server not Responding");
            }
        };

        getQuestions();
    }, [levelId, skillId]);

    console.log(`from questions Page skillId = ${skillId}, levelId = ${levelId}`);

    const handleSelect = (option) => {
        setAnswers((prev) => ({
            ...prev,
            [questionsData[currentIndex].id]: option,
        }));
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questionsData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleSubmit = async () => {
        const payload = {
            skillId,
            levelId,
            answers: Object.keys(answers).map((questionIdx) => ({
                questionId: Number(questionIdx),
                selectedOption: answers[questionIdx],
            })),
        };

        console.log(payload);
        setLoading(true);

        try {
            const res = await axios.post(apiUrls.submitQUiz, payload);
            if (res.status == 200) {
                console.log(res);
                setLoading(false);
                setResultData(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error?.response?.data?.message || "Server not Responding");
        }
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100 questions-page-bg-container">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="#8B5CF6"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }

    if (error)
        return (
            <h5 className="d-flex align-items-center justify-content-center text-danger text-center vh-100 questions-page-bg-container">
                {error}
            </h5>
        );

    const percentage = 70

    const getColor = () => {
        if (percentage >= 80) return "#22c55e"
        if (percentage >= 50) return "#f59e0b"
        return "#ef4444"
    }

    if (resultData && !showReview) {
        return (
            <Container fluid className="min-vh-100 questions-page-bg-container p-3 p-md-5">
                <div className="d-flex align-items-center gap-2">
                    <button style={{ cursor: "pointer", outline: "none" }} className="btn p-0">
                        <img style={{ height: "25px", width: "25px" }} src={backBtn} alt="back-to-skills" />
                    </button>
                    <span style={{ color: "var(--secondary)" }} className="d-none d-md-flex fw-bolder">Back To Skills</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                    <div className="d-flex flex-column">
                        <h5>Quiz Completed!</h5>
                        <small>Great job! Here's how you performed.</small>
                    </div>
                    <button className="d-none d-md-flex retake-quiz-btn">Retake Quiz</button>
                </div>

                <Row className="mt-5">

                    <Col xs={12}>

                        <div className="result-card">

                            <div className="score-section">

                                <div className="progress-wrapper">

                                    <div style={{ width: 110, height: 110 }}>
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage}%`}
                                            styles={buildStyles({
                                                textColor: "#111",
                                                pathColor: getColor(),
                                                trailColor: "#e5e7eb",
                                                textSize: "16px"
                                            })}
                                        />
                                    </div>

                                </div>

                                <div className="score-content">

                                    <h1 className="score-value">
                                        7/10
                                    </h1>

                                    <h5 className="mb-2">
                                        Great Effort 🚀
                                    </h5>

                                    <p className="score-desc">
                                        Keep practicing to improve your score and master the concepts.
                                    </p>

                                </div>

                            </div>

                            <Row className="g-3 mt-2">

                                <Col xs={6} md={3}>
                                    <div className="stats-card">
                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#DCFCE7" }}
                                        >
                                            <img src={correct} className="stats-icon" />
                                        </div>

                                        <h4>6</h4>
                                        <span>Correct</span>
                                    </div>
                                </Col>

                                <Col xs={6} md={3}>
                                    <div className="stats-card">
                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#FEE2E2" }}
                                        >
                                            <img src={incorrect} className="stats-icon" />
                                        </div>

                                        <h4>2</h4>
                                        <span>Incorrect</span>
                                    </div>
                                </Col>

                                <Col xs={6} md={3}>
                                    <div className="stats-card">
                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#FFEDD5" }}
                                        >
                                            <img src={unanswer} className="stats-icon" />
                                        </div>

                                        <h4>2</h4>
                                        <span>Unanswered</span>
                                    </div>
                                </Col>

                                <Col xs={6} md={3}>
                                    <div className="stats-card">
                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#EDE9FE" }}
                                        >
                                            <img src={total} className="stats-icon" />
                                        </div>

                                        <h4>10</h4>
                                        <span>Total Questions</span>
                                    </div>
                                </Col>

                            </Row>

                        </div>

                    </Col>

                </Row>
                <Row className="mt-4 g-3">
                    <Col xs={12} md={6}>

                        <div
                            className="review-card incorrect-review"
                        // onClick={() => {
                        //     setReviewType("incorrect")
                        //     setShowReview(true)
                        // }}
                        >

                            <div className="review-left">

                                <div className="review-icon-bg incorrect-bg">
                                    <img src={incorrect} alt="incorrect" className="review-icon" />
                                </div>

                                <div>
                                    <h5 className="mb-1">
                                        Review Incorrect
                                    </h5>

                                    <p className="mb-0">
                                        See mistakes and correct answers
                                    </p>
                                </div>

                            </div>

                            <img style={{ width: "35px", height: "35px" }} src={nxtBtn} alt="view" />

                        </div>

                    </Col>
                    <Col xs={12} md={6}>

                        <div
                            className="review-card unanswered-review"
                        // onClick={() => {
                        //     setReviewType("unanswered")
                        //     setShowReview(true)
                        // }}
                        >

                            <div className="review-left">

                                <div className="review-icon-bg unanswered-bg">
                                    <img src={unanswer} alt="unanswered" className="review-icon" />
                                </div>

                                <div>
                                    <h5 className="mb-1">
                                        Review Unanswered
                                    </h5>

                                    <p className="mb-0">
                                        Revisit skipped questions
                                    </p>
                                </div>

                            </div>

                            <img style={{ width: "35px", height: "35px" }} src={nxtBtn} alt="view" />

                        </div>

                    </Col>

                </Row>
            </Container>
        )
    }

    const currentQuestion = questionsData[currentIndex];
    // console.log("current question", currentQuestion)
    const selectedOption = answers[currentQuestion?.id];

    const now = ((currentIndex + 1) / questionsData.length) * 100;

    return (
        <div className="p-5 vh-100 questions-page-bg-container">
            <h5>
                {currentQuestion?.Skill?.name} - {currentQuestion?.Level?.name}
            </h5>
            <ProgressBar
                className="mt-3 d-none d-md-block"
                style={{ color: "#6366F1" }}
                now={now}
                label={`${now}%`}
            />

            <h4 className="mt-5 mb-3">
                {currentIndex + 1}. {currentQuestion?.question}
            </h4>

            {currentQuestion?.options.map((opt, i) => (
                <div key={i} className="mb-3">
                    <label
                        className="d-flex align-items-center p-2"
                        style={{
                            background: selectedOption === opt ? "#6366F1" : "#eee",
                            color: selectedOption === opt ? "#fff" : "#000",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={opt}
                            checked={selectedOption === opt}
                            onChange={() => handleSelect(opt)}
                            className="me-2"
                        />

                        {opt}
                    </label>
                </div>
            ))}

            <div className="d-flex justify-content-between align-content-center mt-5">
                <button
                    className="btn btn-secondary"
                    onClick={handleBack}
                    disabled={currentIndex == 0}
                >
                    Back
                </button>
                {currentIndex === questionsData.length - 1 ? (
                    <button
                        className="btn btn-success"
                        disabled={!selectedOption}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!selectedOption}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionsPage;
