import { useEffect, useState } from "react"
import api from "../../axiosInterceptor"
import { Container, Row, Col, Form } from "react-bootstrap"
import { RotatingLines } from "react-loader-spinner"
import "./Leaderboard.css"

const AVATAR_COLORS = [
    "#7c3aed", "#0ea5e9", "#10b981",
    "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4",
]

const MEDAL = ["🥇", "🥈", "🥉"]

const getPct = (item) =>
    item.percentage ?? Math.round((item.score / item.totalQuestions) * 100)

const Avatar = ({ name, size = 40, color }) => (
    <div
        className="lb-avatar"
        style={{
            width: size,
            height: size,
            background: color,
            fontSize: Math.round(size * 0.38),
        }}
    >
        {name?.[0]?.toUpperCase()}
    </div>
)

const Podium = ({ data, currentUserId }) => {
    // order: silver (index 1), gold (index 0), bronze (index 2)
    const podiumOrder = [1, 0, 2]
    const barHeights = [72, 100, 56]
    const barColors = ["#0ea5e9", "#7c3aed", "#10b981"]

    return (
        <div className="lb-podium">
            {podiumOrder.map((dataIdx, podIdx) => {
                const item = data[dataIdx]
                if (!item) return null
                const isMe = item.User.id === currentUserId
                const p = getPct(item)
                const avatarColor = isMe
                    ? "#7c3aed"
                    : AVATAR_COLORS[dataIdx % AVATAR_COLORS.length]

                return (
                    <div className="lb-pod" key={item.id}>
                        <div className="lb-pod-crown">{MEDAL[dataIdx]}</div>
                        <div className="lb-pod-top">
                            <Avatar
                                name={item.User.name}
                                size={podIdx === 1 ? 54 : 44}
                                color={avatarColor}
                            />
                            {isMe && <span className="you-pill">you</span>}
                            <div
                                className="lb-pod-bar"
                                style={{
                                    height: barHeights[podIdx],
                                    background: barColors[podIdx] + "22",
                                    borderColor: barColors[podIdx] + "55",
                                }}
                            />
                        </div>
                        <div
                            className="lb-pod-rank-badge"
                            style={{
                                background: barColors[podIdx] + "22",
                                color: barColors[podIdx],
                            }}
                        >
                            #{dataIdx + 1}
                        </div>
                        <div className="lb-pod-name">
                            {item.User.name.split(" ")[0]}
                        </div>
                        <div className="lb-pod-pct">{p}%</div>
                    </div>
                )
            })}
        </div>
    )
}

const ListRow = ({ item, rank, isMe, color }) => {
    const p = getPct(item)
    const badgeClass =
        p >= 80 ? "badge-green" : p >= 60 ? "badge-amber" : "badge-blue"
    const rankIcon = rank <= 3 ? MEDAL[rank - 1] : null

    return (
        <div className={`lb-row ${isMe ? "lb-row-me" : ""}`}>
            <div className="lb-row-rank">
                {rankIcon ?? rank}
            </div>
            <Avatar name={item.User.name} size={38} color={color} />
            <div className="lb-row-info">
                <div className="lb-row-name">
                    {item.User.name}
                    {isMe && <span className="you-pill">you</span>}
                </div>
                <div className="lb-row-sub">
                    Score {item.score}/{item.totalQuestions} · {item.attemptedQuestions} attempted
                </div>
            </div>
            <div className={`lb-badge ${badgeClass}`}>{p}%</div>
        </div>
    )
}

const FloatingCard = ({ item, rank, aboveItem }) => {
    if (!item) return null
    const p = getPct(item)
    const abovePct = aboveItem ? getPct(aboveItem) : null
    const nextLabel =
        rank === 1
            ? "You're in the lead! 🎉"
            : aboveItem
            ? `Beat ${aboveItem.User.name.split(" ")[0]} (${abovePct}%) to rank up`
            : ""

    return (
        <div className="lb-floating-card">
            <div className="lb-fc-inner">
                <div className="lb-fc-rank">#{rank}</div>
                <Avatar name={item.User.name} size={42} color="#7c3aed" />
                <div className="lb-fc-info">
                    <div className="lb-fc-name">
                        {item.User.name}
                        <span className="you-pill">you</span>
                    </div>
                    <div className="lb-fc-sub">
                        {item.score}/{item.totalQuestions} · {item.attemptedQuestions} attempted
                    </div>
                </div>
                <div className="lb-fc-badge">{p}%</div>
            </div>
            <div className="lb-fc-progress-wrap">
                <div className="lb-fc-bar-bg">
                    <div
                        className="lb-fc-bar-fill"
                        style={{ width: `${p}%` }}
                    />
                </div>
                <div className="lb-fc-progress-labels">
                    <span>{nextLabel}</span>
                    <span>You: {p}%</span>
                </div>
            </div>
        </div>
    )
}

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [skillsData, setSkillsData] = useState([])
    const [levelsData, setLevelsData] = useState([])
    const [selectedSkill, setSelectedSkill] = useState(1)
    const [selectedLevel, setSelectedLevel] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    useEffect(() => {
        const fetchDropdowns = async () => {
            setLoading(true)
            try {
                const [skillsRes, levelsRes] = await Promise.all([
                    api.get("/skills"),
                    api.get("/levels"),
                ])
                if (skillsRes.status === 200) setSkillsData(skillsRes.data.data)
                if (levelsRes.status === 200) setLevelsData(levelsRes.data.data)
            } catch (err) {
                setError(err?.response?.data?.message || "Server not Responding")
            } finally {
                setLoading(false)
            }
        }
        fetchDropdowns()
    }, [])

    useEffect(() => {
        const getLeaderboard = async () => {
            setLoading(true)
            try {
                const res = await api.get(
                    `/leaderboard?skillId=${selectedSkill}&levelId=${selectedLevel}`
                )
                if (res.status === 200) setLeaderboardData(res.data.data)
            } catch (err) {
                setError(err?.response?.data?.message || "Server not Responding")
            } finally {
                setLoading(false)
            }
        }
        getLeaderboard()
    }, [selectedSkill, selectedLevel])

    const selectedSkillName =
        skillsData.find((s) => s.id == selectedSkill)?.name ?? ""
    const selectedLevelName =
        levelsData.find((l) => l.id == selectedLevel)?.name ?? ""

    const meIndex = leaderboardData.findIndex(
        (item) => item.User.id === userInfo?.id
    )
    const meItem = meIndex !== -1 ? leaderboardData[meIndex] : null
    const aboveItem = meIndex > 0 ? leaderboardData[meIndex - 1] : null

    const top3 = leaderboardData.slice(0, 3)

    return (
        <div className="lb-page">
            <Container fluid className="lb-container">

                {/* Header */}
                <div className="lb-header">
                    <h2 className="lb-title">
                        🏆 {selectedSkillName} — {selectedLevelName} Leaderboard
                    </h2>
                    <p className="lb-subtitle">See how players are performing this week</p>
                </div>

                {/* Filters */}
                <Row className="mb-4 g-2">
                    <Col xs={6} md={3}>
                        <Form.Select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="lb-select"
                        >
                            {skillsData.map((skill) => (
                                <option key={skill.id} value={skill.id}>
                                    {skill.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col xs={6} md={3}>
                        <Form.Select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="lb-select"
                        >
                            {levelsData.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>

                {/* Loading */}
                {loading && (
                    <div className="lb-loader">
                        <RotatingLines
                            visible={true}
                            height="60"
                            width="60"
                            strokeColor="#7c3aed"
                            strokeWidth="5"
                            animationDuration="0.75"
                        />
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <p className="lb-error">{error}</p>
                )}

                {/* Content */}
                {!loading && !error && leaderboardData.length > 0 && (
                    <div className="lb-content">

                        {/* Podium — top 3 */}
                        {top3.length === 3 && (
                            <>
                                <div className="lb-section-label">Top performers</div>
                                <Podium data={top3} currentUserId={userInfo?.id} />
                            </>
                        )}

                        {/* Full ranked list */}
                        <div className="lb-section-label">All rankings</div>
                        <div className="lb-list">
                            {leaderboardData.map((item, index) => (
                                <ListRow
                                    key={item.id}
                                    item={item}
                                    rank={index + 1}
                                    isMe={item.User.id === userInfo?.id}
                                    color={AVATAR_COLORS[index % AVATAR_COLORS.length]}
                                />
                            ))}
                        </div>

                    </div>
                )}

            </Container>

            {/* Floating current-user card */}
            {meItem && (
                <FloatingCard
                    item={meItem}
                    rank={meIndex + 1}
                    aboveItem={aboveItem}
                />
            )}
        </div>
    )
}

export default Leaderboard