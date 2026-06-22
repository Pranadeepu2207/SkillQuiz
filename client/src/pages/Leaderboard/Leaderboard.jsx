import { useEffect, useState } from "react";
import api from "../../axiosInterceptor";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Trophy } from "react-bootstrap-icons";
import { RotatingLines } from "react-loader-spinner";
import "./Leaderboard.css";

const AVATAR_COLORS = [
    "#7c3aed",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
];

const getPct = (item) =>
    item.percentage ?? Math.round((item.score / item.totalQuestions) * 100);

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
);

const ListRow = ({ item, rank, isMe, color }) => {
    const p = getPct(item);
    const badgeClass =
        p >= 80 ? "badge-green" : p >= 60 ? "badge-amber" : "badge-blue";

    return (
        <div className={`lb-row ${isMe ? "lb-row-me" : ""}`}>
            <div className="lb-row-rank">{rank}</div>
            <Avatar name={item.User.name} size={38} color={color} />
            <div className="lb-row-info">
                <div className="lb-row-name">
                    {item.User.name}
                    {isMe && <span className="you-pill">you</span>}
                </div>
                <div className="lb-row-sub">
                    Score {item.score}/{item.totalQuestions} · {item.attemptedQuestions}{" "}
                    attempted
                </div>
            </div>
            <div className={`lb-badge ${badgeClass}`}>{p}%</div>
        </div>
    );
};

const FloatingCard = ({ item, rank }) => {
    if (!item) return null;
    const p = getPct(item);

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
                        {item.score}/{item.totalQuestions} · {item.attemptedQuestions}{" "}
                        attempted
                    </div>
                </div>
                <div className="lb-fc-badge">{p}%</div>
            </div>
            <div className="lb-fc-progress-wrap">
                <div className="lb-fc-bar-bg">
                    <div className="lb-fc-bar-fill" style={{ width: `${p}%` }} />
                </div>
                <div className="lb-fc-progress-labels">
                    <span>You: {p}%</span>
                </div>
            </div>
        </div>
    );
};

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [skillsData, setSkillsData] = useState([]);
    const [levelsData, setLevelsData] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        const fetchDropdowns = async () => {
            setLoading(true);
            try {
                const [skillsRes, levelsRes] = await Promise.all([
                    api.get("/skills"),
                    api.get("/levels"),
                ]);
                if (skillsRes.status === 200) {
                    const skills = skillsRes.data.data;
                    setSkillsData(skills);
                    if (skills.length > 0) {
                        setSelectedSkill(skills[0].id);
                    }
                }
                if (levelsRes.status === 200) {
                    const levels = levelsRes.data.data;
                    setLevelsData(levels);
                    if (levels.length > 0) {
                        setSelectedLevel(levels[0].id);
                    }
                }
            } catch (err) {
                setError(err?.response?.data?.message || "Server not Responding");
            } finally {
                setLoading(false);
            }
        };
        fetchDropdowns();
    }, []);

    useEffect(() => {
        const getLeaderboard = async () => {
            setLoading(true);
            setError("")
            try {
                const res = await api.get(
                    `/leaderboard?skillId=${selectedSkill}&levelId=${selectedLevel}`,
                );
                if (res.status === 200) setLeaderboardData(res.data.data);
            } catch (err) {
                setError(err?.response?.data?.message || "Server not Responding");
            } finally {
                setLoading(false);
            }
        };
        getLeaderboard();
    }, [selectedSkill, selectedLevel]);

    const selectedSkillName =
        skillsData.find((s) => s.id == selectedSkill)?.name ?? "";
    const selectedLevelName =
        levelsData.find((l) => l.id == selectedLevel)?.name ?? "";

    const meIndex = leaderboardData.findIndex(
        (item) => item.User.id === userInfo?.id,
    );
    const meItem = meIndex !== -1 ? leaderboardData[meIndex] : null;
    //   const aboveItem = meIndex > 0 ? leaderboardData[meIndex - 1] : null;

    return (
        <div className="lb-page">
            <Container fluid className="lb-container">
                <div className="lb-header">
                    <h2 className="lb-title">
                        <Trophy className="me-2" style={{ color: "#f59e0b" }} /> {selectedSkillName} — {selectedLevelName} Leaderboard
                    </h2>

                    <p className="lb-subtitle">
                        See how players are performing this week
                    </p>
                </div>
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
                {error && !loading && <p className="lb-error">{error}</p>}
                {!loading && !error && leaderboardData.length > 0 && (
                    <div className="lb-content">
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
            {meItem && (
                <FloatingCard item={meItem} rank={meIndex + 1} />
            )}
        </div>
    );
};

export default Leaderboard;
