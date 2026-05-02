import './Dashboard.css'

const Dashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    return (
        <div className='fw-bold text-center'>Welcome {userInfo.name}</div>
    )
}

export default Dashboard