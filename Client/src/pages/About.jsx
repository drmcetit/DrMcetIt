import React from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faShapes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <Container style={{marginTop:"15vh"}}>
        <h1 className="text-center fw-bold">About Our Department</h1>
        <p className="text-center fs-5" style={{color:"#606060"}}>Pioneering excellence in IT education and research since 2000</p>

        <div className='my-4 border rounded-1 shadow-sm p-3' style={{
                    backgroundImage: `url("about_bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                }}>
                   <h4>Program Educational Outcome's</h4>
                   <p>Our outcomes and the program specific objectives.</p>
                   <button className='btn btn-primary'>
                    Learn more →
                   </button>
        </div>
        <div className='my-4 border rounded-1 shadow-sm p-3' style={{
                    backgroundImage: `url("about_bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                }}>
                   <h4>Vission and Mission</h4>
                   <p>Our outcomes and the program specific objectives.</p>
                   <button className='btn btn-primary'>
                    Learn more →
                   </button>
        </div>
        <div className='my-4 border rounded-1 shadow-sm p-3' style={{
                    backgroundImage: `url("about_bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                }}>
                   <h4>Faculty Notable Achievement</h4>
                   <p>Our outcomes and the program specific objectives.</p>
                   <button className='btn btn-primary'>
                    Learn more →
                   </button>
        </div>

        <img src="About_IT.png" alt="About IT" className='img-thumbnail my-5 border rounded-1' />

        {/* <Row className="g-4">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}  >
            <Card className="shadow-sm" style={{
                backgroundImage: "about_bg.png",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat",
                borderRadius: "8px",
                }} >
              <Card.Body style={{
                    backgroundImage: "about_bg.png",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                }}>
                <Card.Title className="d-flex align-items-center gap-2">
                <i class="bi bi-info-circle"></i>
                  About
                </Card.Title>
                <Card.Text className="text-muted">
                  Learn about our history, vision, mission, and faculty members.
                </Card.Text>
                <Link to="/about" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faGraduationCap} />
                  Placement
                </Card.Title>
                <Card.Text className="text-muted">
                  Discover our placement records, top recruiters, and success stories.
                </Card.Text>
                <Link to="/placement" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faShapes} />
                  Facilities
                </Card.Title>
                <Card.Text className="text-muted">
                  Explore our state-of-the-art labs, library, and research facilities.
                </Card.Text>
                <Link to="/facilities" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#000" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"/></svg>
                  Association
                </Card.Title>
                <Card.Text className="text-muted">
                  Join our student clubs, events, and professional associations.
                </Card.Text>
                <Link to="/association" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

        <div className='border rounded-1 p-3'>
        <div className='peo'>
        <h4 className="">Program Educational Objectivies (PEO's)</h4>
        <div  className='my-4'>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        </div>
        </div>
        <div className='peo'>
        <h4 className="">Program Outcomes</h4>
        <div  className='my-4'>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        </div>
        </div>
        <div className='peo'>
        <h4 className="">Program Specific Outcomes (PSOs)</h4>
        <div  className='my-4'>
        <p style={{textAlign:"justify"}} className='m-0' ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        <p style={{textAlign:"justify"}} className='m-0' ><span className='fw-bold'>PEO1: </span>Technical Expertise: Have high level of technical compentency to identify problems and to generate innovative solutions which would conform to the needs of IT industry</p>
        </div>
        </div>
        </div>

        

        <div className='my-5'>
        <div>
        <h4 className="text-center">Vission and Mission</h4>
        <div className='peo my-4 border rounded-1 p-3'>
        <h4 className="">Our Visson</h4>
        <div  className='my-4'>
        <p style={{textAlign:"justify"}} className='m-0' >To be a globally recognized center of excellence in Information Technology education and research, producing innovative professionals who contribute significantly to technological advancement and societal development.</p>
        </div>
        </div>
        <div className='peo my-4 border rounded-1 p-3'>
        <h4 className="">Our Misson</h4>
        <div  className='my-4'>
        <ul>
        <li>Provide quality education with a focus on practical skills and theoretical knowledge</li>
        <li>Foster a culture of innovation and research</li>
        <li>Develop industry-ready professionals with strong ethical values</li>
        <li>Establish strong collaborations with industry and academic institutions</li>
        <li>Contribute to technological advancements through research and development</li>
        </ul>
        </div>
        </div>
        </div>
        </div>

        <div>
            <h4 className="text-center">Faculty Notable Achievement</h4>
            <div className='my-4'>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            <div className='my-2'>
                <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
                <ul>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                    <li>Associate Editor in IEEE Access.</li>
                    <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
                </ul>
            </div>
            </div>
        </div>
    </Container >
  )
}
