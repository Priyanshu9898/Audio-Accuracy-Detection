import React from 'react';
import gif from "../assets/gg.gif";
import { Container } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <img src={gif} alt="Loading" />
    </Container>
  )
}

export default Loader