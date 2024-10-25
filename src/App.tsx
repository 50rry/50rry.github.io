import {Button, Container} from "react-bootstrap";
import {useCallback,useEffect, useState} from "react";

function App() {
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState({
        status: "UNKNOWN",
        serverIp: "UNKNOWN"
    })
    const startStopServer = useCallback((action: "start" | "stop") => {
        fetch(`https://europe-north1-minecraftparty.cloudfunctions.net/start-minecraft-party?action=${action}`).then(async (response) => {
            setMessage(await response.text());
        }).catch(async (error) => {
            console.log(error)
        })
    }, [])

    const fetchStatus = useCallback(() => {
            const action = "status"
            fetch(`https://europe-north1-minecraftparty.cloudfunctions.net/start-minecraft-party?action=${action}`).then(async (response) => {
                setStatus(await response.json());
            }).catch(async (error) => {
                console.log(error)
            })
        }, [])

    useEffect(() => {
        const statusTimeout = setTimeout(fetchStatus, 10000)
    	return ()=>{clearTimeout(statusTimeout)}
    }, [fetchStatus]);

    return (
        <>
            <Container style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px"
            }}>
                <p>Welcome to our <b>minecraft-party</b> server</p>
                <Button className={"btn"} onClick={() => {
                    startStopServer("start")
                }}>Click to start the server ✅</Button>
                <Button variant={"danger"} className={"btn"} onClick={() => {
                    startStopServer("stop")
                }}>Click to stop the server ❎</Button>
                <p>{message}</p>
                <p><b>Status</b>: {status.status}</p>
                <p><b>IP: {status.serverIp}</b></p>
            </Container>
        </>
    )
}

export default App
