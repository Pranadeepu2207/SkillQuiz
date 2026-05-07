import { useEffect, useState } from "react"
import { ProgressBar } from 'react-bootstrap'
import { useLocation } from "react-router-dom"
import axios from "axios"
import { apiUrls } from "../../api"
import { RotatingLines } from "react-loader-spinner"

import "./QuestionsPage.css"

const QuestionsPage = () => {
    const location = useLocation()

    const { skillId, levelId } = location.state

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [questionsData, setQuestionsData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})

    useEffect(() => {

        const getQuestions = async () => {
            setLoading(true)
            try {
                const res = await axios.get(apiUrls.getQuestionsApi(skillId, levelId))
                if (res.status == 200) {
                    console.log(res)
                    setLoading(false)
                    setQuestionsData(res?.data?.data)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error?.response?.data?.message || "Server not Responding")
            }
        }

        getQuestions()
    }, [levelId, skillId])

    console.log(`from questions Page skillId = ${skillId}, levelId = ${levelId}`)


    const handleSelect = (option) => {
        setAnswers(prev => ({
            ...prev,
            [questionsData[currentIndex].id]: option
        }))
    }

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < questionsData.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handleSubmit = async () => {

        const payload = {
            skillId,
            levelId,
            answers: Object.keys(answers).map(questionIdx => (
                {
                    questionId: Number(questionIdx),
                    selectedOption: answers[questionIdx]
                }
            ))
        }

        console.log(payload)
        try {
            const res = await axios.post(apiUrls.submitQUiz, payload)
            if (res.status == 200) {
                console.log(res)
            }
        } catch (err) {
            console.log(err)
        }
    }


    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center">
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
        )
    }

    if (error) return <h5 className="text-danger text-center">{error}</h5>


    const currentQuestion = questionsData[currentIndex]
    // console.log("current question", currentQuestion)
    const selectedOption = answers[currentQuestion?.id]

    const now = ((currentIndex + 1) / questionsData.length) * 100

    return (
        <div className="p-5 vh-100 questions-page-bg-container">
            <h5>{currentQuestion?.Skill?.name} - {currentQuestion?.Level?.name}</h5>
            <ProgressBar className="mt-3 d-none d-md-block" style={{ color: "#6366F1" }} now={now} label={`${now}%`} />

            <h4 className="mt-5 mb-3">{currentIndex + 1}. {currentQuestion?.question}</h4>

            {currentQuestion?.options.map((opt, i) => (
                <div key={i} className="mb-3">

                    <label
                        className="d-flex align-items-center p-2"
                        style={{
                            background: selectedOption === opt ? "#6366F1" : "#eee",
                            color: selectedOption === opt ? "#fff" : "#000",
                            borderRadius: "6px",
                            cursor: "pointer"
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
                <button className="btn btn-secondary" onClick={handleBack} disabled={currentIndex == 0}>Back</button>
                {currentIndex === questionsData.length - 1 ? (
                    <button className="btn btn-success" disabled={!selectedOption} onClick={handleSubmit}>Submit</button>
                ) : (
                    <button className="btn btn-primary" onClick={handleNext} disabled={!selectedOption}>Next</button>
                )}

            </div>

        </div>
    )
}

export default QuestionsPage