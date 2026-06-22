import { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import { apiUrls } from "../../api";
import api from "../../axiosInterceptor";
import { RotatingLines } from "react-loader-spinner";

import { CheckCircleFill, XCircleFill, QuestionCircleFill, JournalText, ChevronRight, ArrowLeft } from "react-bootstrap-icons";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./QuestionsPage.css";

const QuestionsPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { skillId, levelId } = location.state || {};

    const QUIZ_TIME = 10 * 60;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [questionsData, setQuestionsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const [resultData, setResultData] = useState(null);

    const [showReview, setShowReview] = useState(false);
    const [reviewType, setReviewType] = useState("");

    const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

    useEffect(() => {

        if (!skillId || !levelId) {
            navigate("/");
        }

    }, [skillId, levelId, navigate])

    useEffect(() => {

        const getQuestions = async () => {

            setLoading(true);

            try {

                const res = await api.get(
                    apiUrls.getQuestionsApi(skillId, levelId)
                );

                if (res.status === 200) {
                    setQuestionsData(res?.data?.data);
                }

            } catch (error) {

                setError(
                    error?.response?.data?.message ||
                    "Server not Responding"
                );

            } finally {
                setLoading(false);
            }
        };

        getQuestions();

    }, [skillId, levelId]);

    const formatTime = (seconds) => {

        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleSelect = (option) => {

        setAnswers(prev => ({
            ...prev,
            [questionsData[currentIndex].id]: option
        }));
    };

    const handleBack = () => {

        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {

        if (currentIndex < questionsData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleSubmit = async () => {
        // const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        // const userId = userInfo.id

        if (loading || resultData) return;

        const payload = {
            skillId,
            levelId,
            answers: Object.keys(answers).map(questionId => ({
                questionId: Number(questionId),
                selectedOption: answers[questionId]
            }))
        };

        setLoading(true);

        try {

            const res = await api.post(
                apiUrls.submitQUiz,
                payload
            );

            if (res.status === 200) {
                setResultData(res?.data?.data);
            }

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                "Server not Responding"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (resultData) return;

        if (timeLeft <= 0) {
            Promise.resolve().then(() => handleSubmit());
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, resultData]);



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
                />

            </div>
        );
    }

    if (error) {

        return (
            <h4 className="d-flex align-items-center justify-content-center vh-100 text-danger">
                {error}
            </h4>
        );
    }

    if (resultData && !showReview) {

        const percentage = Math.round(
            (resultData.score / resultData.total) * 100
        );

        const getColor = () => {

            if (percentage >= 80) return "#22c55e";
            if (percentage >= 50) return "#f59e0b";

            return "#ef4444";
        };

        return (
            <Container fluid className="min-vh-100 questions-page-bg-container p-3 p-md-5">

                <div className="d-flex align-items-center gap-2">

                    <button
                        className="btn p-0"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={22} className="text-primary me-1" />
                    </button>

                    <span className="fw-bold d-none d-md-flex text-primary">
                        Back To Skills
                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">

                    <div>

                        <h2 className="fw-bold">
                            Quiz Completed!
                        </h2>

                        <p className="text-secondary mb-0">
                            Great job! Here's how you performed.
                        </p>

                    </div>

                    <button
                        className="retake-quiz-btn d-none d-md-flex"
                        onClick={() => window.location.reload()}
                    >
                        Retake Quiz
                    </button>

                </div>

                <Row className="mt-5">

                    <Col xs={12}>

                        <div className="result-card">

                            <div className="score-section">

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

                                <div className="score-content">

                                    <h1 className="score-value">
                                        {resultData.score}/{resultData.total}
                                    </h1>

                                    <h5>

                                        {percentage >= 80
                                            ? "Excellent Work 🔥"
                                            : percentage >= 50
                                                ? "Great Effort 🚀"
                                                : "Keep Practicing 💪"}

                                    </h5>

                                    <p className="score-desc">

                                        {percentage >= 80
                                            ? "Outstanding performance! You mastered this quiz."
                                            : percentage >= 50
                                                ? "Good effort! Keep practicing."
                                                : "Practice more and come back stronger."}

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
                                            <CheckCircleFill size={24} style={{ color: "#10B981" }} />
                                        </div>

                                        <h4>
                                            {resultData.score}
                                        </h4>

                                        <span>
                                            Correct
                                        </span>

                                    </div>

                                </Col>

                                <Col xs={6} md={3}>

                                    <div className="stats-card">

                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#FEE2E2" }}
                                        >
                                            <XCircleFill size={24} style={{ color: "#EF4444" }} />
                                        </div>

                                        <h4>
                                            {resultData.incorrect.length}
                                        </h4>

                                        <span>
                                            Incorrect
                                        </span>

                                    </div>

                                </Col>

                                <Col xs={6} md={3}>

                                    <div className="stats-card">

                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#FFEDD5" }}
                                        >
                                            <QuestionCircleFill size={24} style={{ color: "#F59E0B" }} />
                                        </div>

                                        <h4>
                                            {resultData.unanswered.length}
                                        </h4>

                                        <span>
                                            Unanswered
                                        </span>

                                    </div>

                                </Col>

                                <Col xs={6} md={3}>

                                    <div className="stats-card">

                                        <div
                                            className="stats-icon-bg"
                                            style={{ background: "#EDE9FE" }}
                                        >
                                            <JournalText size={24} style={{ color: "#6366F1" }} />
                                        </div>

                                        <h4>
                                            {resultData.total}
                                        </h4>

                                        <span>
                                            Questions
                                        </span>

                                    </div>

                                </Col>

                            </Row>

                        </div>

                    </Col>

                </Row>

                <Row className="mt-4 g-3">

                    {resultData.incorrect.length > 0 && (

                        <Col xs={12} md={6}>

                            <div
                                className="review-card"
                                onClick={() => {
                                    setReviewType("incorrect");
                                    setShowReview(true);
                                }}
                            >

                                <div className="review-left">

                                    <div className="review-icon-bg incorrect-bg">
                                        <XCircleFill size={22} style={{ color: "#EF4444" }} />
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

                                <div className="d-flex align-items-center gap-3">

                                    <span className="fw-bold">
                                        {resultData.incorrect.length}
                                    </span>

                                    <ChevronRight size={20} className="text-secondary" />

                                </div>

                            </div>

                        </Col>

                    )}

                    {resultData.unanswered.length > 0 && (

                        <Col xs={12} md={6}>

                            <div
                                className="review-card"
                                onClick={() => {
                                    setReviewType("unanswered");
                                    setShowReview(true);
                                }}
                            >

                                <div className="review-left">

                                    <div className="review-icon-bg unanswered-bg">
                                        <QuestionCircleFill size={22} style={{ color: "#F59E0B" }} />
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

                                <div className="d-flex align-items-center gap-3">

                                    <span className="fw-bold">
                                        {resultData.unanswered.length}
                                    </span>

                                    <ChevronRight size={20} className="text-secondary" />

                                </div>

                            </div>

                        </Col>

                    )}

                </Row>

            </Container>
        );
    }

    if (resultData && showReview) {

        const reviewData =
            reviewType === "incorrect"
                ? resultData.incorrect
                : resultData.unanswered;

        return (
            <Container fluid className="min-vh-100 questions-page-bg-container p-3 p-md-5">

                <div className="d-flex align-items-center gap-2">

                    <button
                        className="btn p-0"
                        onClick={() => setShowReview(false)}
                    >
                        <ArrowLeft size={22} className="text-primary me-1" />
                    </button>

                    <span className="fw-bold text-primary">
                        Back To Results
                    </span>

                </div>

                <div className="mt-4">

                    <h3 className="fw-bold text-capitalize">
                        {reviewType} Questions
                    </h3>

                    <small className="text-secondary">
                        Review your answers and improve your understanding.
                    </small>

                </div>

                <div className="mt-5 d-flex flex-column gap-4">

                    {reviewData.map((item, index) => (

                        <div
                            key={item.questionId}
                            className="review-question-card"
                        >

                            <h5 className="fw-semibold">
                                {index + 1}. {item.question}
                            </h5>

                            <div className="mt-4 d-flex flex-column gap-3">

                                {item.options.map((opt, i) => {

                                    const isCorrect =
                                        opt === item.correctAnswer;

                                    const isSelected =
                                        opt === item.selectedAnswer;

                                    return (
                                        <div
                                            key={i}
                                            className={`review-option
                                                ${isCorrect ? "correct-option" : ""}
                                                ${isSelected ? "selected-option" : ""}
                                            `}
                                        >

                                            <span>
                                                {opt}
                                            </span>

                                            {isCorrect && (
                                                <span className="option-badge correct-badge">
                                                    Correct
                                                </span>
                                            )}

                                            {isSelected && !isCorrect && (
                                                <span className="option-badge wrong-badge">
                                                    Your Answer
                                                </span>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    ))}

                </div>

            </Container>
        );
    }

    const currentQuestion = questionsData[currentIndex];

    const selectedOption =
        answers[currentQuestion?.id];

    const progress =
        ((currentIndex + 1) / questionsData.length) * 100;

    const isDangerTime = timeLeft <= 30;

    return (
        <div className="p-3 p-md-5 min-vh-100 questions-page-bg-container">

            <div className="d-flex justify-content-between align-items-center">

                <h5>
                    {currentQuestion?.Skill?.name} - {currentQuestion?.Level?.name}
                </h5>

                <div className={`timer-box ${isDangerTime ? "danger-timer" : ""}`}>
                    ⏱ {formatTime(timeLeft)}
                </div>

            </div>

            <ProgressBar
                className="mt-3"
                now={progress}
                label={`${Math.round(progress)}%`}
            />

            <h3 className="mt-5 mb-4">
                {currentIndex + 1}. {currentQuestion?.question}
            </h3>

            {currentQuestion?.options.map((opt, i) => (

                <div key={i} className="mb-3">

                    <label
                        className={`d-flex align-items-center p-3 option-label ${
                            selectedOption === opt ? "selected" : ""
                        }`}
                    >

                        <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={opt}
                            checked={selectedOption === opt}
                            onChange={() => handleSelect(opt)}
                            className="d-none"
                        />
                        
                        <span className="custom-check-dot me-3"></span>

                        <span className="option-text">{opt}</span>

                    </label>

                </div>

            ))}

            <div className="d-flex justify-content-between mt-5">

                <button
                    className="btn btn-secondary"
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                >
                    Back
                </button>

                {currentIndex === questionsData.length - 1 ? (

                    <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                ) : (

                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                    >
                        Next
                    </button>

                )}

            </div>

        </div>
    );
};

export default QuestionsPage;