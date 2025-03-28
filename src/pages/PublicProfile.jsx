import { useEffect, useState } from "react";
import RAFCallers from "../services/RAFCallers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PublicProfile() {

    const [userGet, SetUserGet] = useState([])

    useEffect(() => {
        async function getProdUsers() {
            const data = await RAFCallers.getUsers("products")
            const filtro = data.filter(fil=>fil.userId == localStorage.getItem("getUserid"))
            SetUserGet(filtro)
        }
        getProdUsers()
    }, [])
    return (
        <>
            <div>
                {userGet.map((produc) => {
                    return (
                        <>
                            <div>
                                <Card style={{ width: '18rem' }} key={produc.id}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{produc.name}</Card.Title>
                                        <Card.Text>
                                            {produc.description}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    );
}
export default PublicProfile