import {Button, Container} from "react-bootstrap";
import {useCallback, useState} from "react";

function App() {
    const [message, setMessage] = useState("")
    const startStopServer = useCallback((action: "start" | "stop") => {
        fetch("https://europe-north1-minecraftparty.cloudfunctions.net/start-minecraft-party", {
            method: "POST",
            body: JSON.stringify({
                action: action
            })
        }).then(async (response) => {
            setMessage(await response.text());
        }).catch(async (error) => {
            console.log(error)
        })
    }, [])

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
            </Container>
        </>
    )
}

export default App
