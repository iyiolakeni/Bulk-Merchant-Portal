import SideBar from "../component/sidebar";
import Email from "../component/email";
const EmailBoard = () => {
    const emails = [
        {
            name: "Iyioluwa Awe",
            title: "Hello",
            message: "Hello, How are you doing today?",
            time: "10:00 AM",
        },
        {
            name: "Oluwapelumi Adekola",
            title: "Hi",
            message: "Hi, I am doing great",
            time: "9:30 AM",
        },
        {
            name: "User 3",
            title: "Good morning",
            message: "Good morning, I hope you are doing great",
            time: "9:00 AM",
        },
        {
            name: "User 4",
            title: "How are you?",
            message: "How are you doing today?",
            time: "8:30 AM",
        },
        {
            name: "User 5",
            title: "Have a nice day",
            message: "Have a nice day, I hope you are doing great",
            time: "8:00 AM",
        }
    ]
    return (
        <div className="dashboard">
            <SideBar/>
            <div className="email_main">
            <Email emails={emails}/>
            </div>
        </div> 
    )
}
export default EmailBoard;  