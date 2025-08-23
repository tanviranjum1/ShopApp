import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
                     <div className="mb-2">
             <i className="fas fa-microchip me-2"></i>
             <strong>E-Shop</strong>
           </div>
           <div className="text-muted small">
             Your Premium Electronics Destination
           </div>
           <div className="mt-2">
             Copyright &copy; {new Date().getFullYear()} E-Shop
           </div>
        </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
