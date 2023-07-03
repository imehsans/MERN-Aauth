import { useState } from "react"
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import FormContainer from "../components/FormContainer"

const RegisterScreen = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confPassword, setConfPassword] = useState('')

   const submitHandler = async (e) => {
      e.preventDefault()
      console.log("Register Form Submitted")
   }

   return (
      <FormContainer>
         <h1>Register</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
               <Form.Label>Name: </Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
               <Form.Label>Email: </Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
               <Form.Label>Password: </Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </Form.Group>
            <Form.Group controlId="confPassword" className="my-2">
               <Form.Label>Confirm Password: </Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
               />
            </Form.Group>

            <Button variant="danger" type="submit" className="mt-3">
               Sign Up
            </Button>

            <Row className="py-3">
               <Col>
                  Already Have an Account? <Link to='/Login'>Login</Link>
               </Col>
            </Row>
         </Form>
      </FormContainer>
   )
}

export default RegisterScreen