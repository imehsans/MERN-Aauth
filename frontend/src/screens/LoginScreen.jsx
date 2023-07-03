import { useState } from "react"
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import FormContainer from "../components/FormContainer"

const LoginScreen = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const submitHandler = async (e) => {
      e.preventDefault()
      console.log("Login Form Submitted")
   }


   return (
      <FormContainer>
         <h1>Sign In</h1>
         <Form onSubmit={submitHandler}>
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

            <Button variant="primary" type="submit" className="mt-3">
               Sign In
            </Button>

            <Row className="py-3">
               <Col>
                  New Customer? <Link to='/register'>Register</Link>
               </Col>
            </Row>
         </Form>
      </FormContainer>
   )
}

export default LoginScreen