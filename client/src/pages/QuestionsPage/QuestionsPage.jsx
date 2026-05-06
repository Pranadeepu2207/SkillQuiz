import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { apiUrls } from "../../api"
import { RotatingLines } from "react-loader-spinner"

const QuestionsPage = () => {
    const location = useLocation()

    const { skillId, levelId } = location.state

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {

        const getQuestions = async () => {
            setLoading(true)
            try {
                const res = await axios.get(apiUrls.getQuestionsApi(skillId, levelId))
                if (res.status == 200) {
                    console.log(res)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error?.response?.data?.message || "Server not Responding")
            }
        }

        getQuestions()
    }, [])

    console.log(`from questions Page skillId = ${skillId}, levelId = ${levelId}`)

    return (
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
            <div>QuestionsPage</div>
        </>
    )
}

export default QuestionsPage