import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const Association = () => {
  return (
    <Container style={{marginTop:"15vh"}}>
        <div>
            <Row>
                <Col xs={12} md={6} className='d-flex flex-column justify-content-center my-3' >
                <h1 className='text-primary m-0'>InfoBee</h1>
                <p style={{color:"#606060"}}>Department of Information Technology</p>
                <p className='fs-5 m-0'>Fostering professional growth, leadership, and community through student-led organizations</p>
                <div className='my-3'>
                <p className='fs-5 m-0'>15+ Students</p>
                <p className='fs-5 m-0'>10+ Roles and Responsibilities</p>
                <p className='fs-5 m-0'>30+ Achievements</p>
                </div>
                <button className='btn btn-primary w-100'>Explore Associaiton</button>
                </Col>
                <Col className=' my-3'>
                <img src="infobee_1.png" alt="infobee_1" className='img-fluid border rounded-1' />
                </Col>
            </Row>
        </div>
        <div className='my-5'>
            <Row>
                <Col xs={12} md={6} className='d-flex flex-column justify-content-center my-3'>
                <h1>Alumni Meet</h1>
                <p style={{textAlign:"justify"}}>The Alumni Interaction event, focused on placements, aimed to provide students with insights into industry expectations, recruitment processes, and strategies for securing job opportunities. Alumni from various industries shared their personal experiences of transitioning from academia to the workforce, offering valuable tips on resume building, interview preparation, and skills development. The event also provided a platform for students to ask questions about specific roles, industries, and career paths, helping them gain a clear understanding of how to position themselves for successful placements and internships. Additionally, the interaction aimed to foster mentorship and networking opportunities that could support students in achieving their career goals.</p>
                </Col>
                <Col>
                <img src="infobee_2.png" alt="infobee_2" className='img-fluid border rounded-1' />
                </Col>
            </Row>
        </div>

    </Container>
  )
}
