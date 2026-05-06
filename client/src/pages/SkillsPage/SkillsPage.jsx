import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { RotatingLines } from "react-loader-spinner"

import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'

import { apiUrls } from "../../api"

import './SkillsPage.css'

const SkillsPage = () => {

    const navigate = useNavigate()

    const [skillsData, setSkillsData] = useState([])
    const [levelsData, setLevelsData] = useState([])
    const [selectedSkillId, setSelectedSkillId] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {

        const getAllSkills = async () => {
            setLoading(true)
            try {
                const res = await axios.get(apiUrls.getSkillsApi)
                if (res.status == 200) {
                    setLoading(false)
                    console.log(res)
                    setSkillsData(res?.data?.data)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error?.response?.data?.message || "Server not Responding")
            }
        }

        const getAllLevels = async () => {
            setLoading(true)
            try {
                const res = await axios.get(apiUrls.getLevelsApi)
                if (res.status == 200) {
                    console.log(res)
                    setLoading(false)
                    setLevelsData(res?.data?.data)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error?.response?.data?.message || "Server not Responding")
            }
        }


        getAllSkills()
        getAllLevels()

    }, [])

    const handleSkillClick = (skill) => {
        setSelectedSkillId(skill)
        setShowModal(true)
    }

    const handleLevelClick = (level) => {
        console.log("Skill id:", selectedSkillId.id, "Level Id:", level.id)
        handleClose()
        navigate(`/quiz?skill=${selectedSkillId.name.toLowerCase()}&level=${level.name.toLowerCase()}`, {
            state: {
                skillId: selectedSkillId.id,
                levelId: level.id
            }
        })
    }

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Container fluid className="vh-100 d-flex flex-column">
                <h3>Skills</h3>
                <p>Choose a skill to start quiz and test your knowledge</p>
                <Row className="mt-5">
                    <>
                        {loading && <div className="d-flex align-items-center justify-content-center">
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
                            /></div>}

                        {error && <h5 className="fw-bold text-danger text-center">{error}</h5>}

                        {skillsData.map(skill => (
                            <Col xs={6} md={4} lg={3} key={skill.id} className="mb-3 d-flex justify-content-center flex-wrap">
                                <Card style={{ width: '12rem' }} className="skill-card">
                                    <Card.Img variant="top" src={skill.imageUrl} className="p-4" />
                                    <Card.Body className="text-center">
                                        <Card.Title className="fw-bold" style={{ fontSize: "1rem" }}>{skill.name}</Card.Title>
                                        <Button variant="primary" onClick={() => handleSkillClick(skill)}>Start Quiz</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose} animation centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Skill Level</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
                    {levelsData.map(level => (
                        <button
                            onClick={() => handleLevelClick(level)}
                            className="levels-btn p-2"
                            key={level.id}
                            style={{ backgroundColor: level.name == "Easy" ? "#14e845" : level.name == "Medium" ? "#e9b414" : "#c41b29" }}
                        >{level.name}
                        </button>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SkillsPage