import { Row, Col, Card } from "react-bootstrap"
import { FaAward, FaCalendarAlt, FaBook, FaUser } from "react-icons/fa"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"

export const StudentProfileDashboard = () => {
  return (
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">Profile Dashboard</h1>
          <p className="text-muted">Manage your profile and co-curricular activities</p>
        </div>

        <Row xs={1} md={2} lg={2} className="g-4 mb-4">
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <p className="text-muted small mb-0">Total Activities</p>
                    <h3 className="h2 fw-bold mb-0">12</h3>
                  </div>
                  <FaAward className="text-primary opacity-75 fs-4" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <p className="text-muted small mb-0">participation Approvals</p>
                    <h3 className="h2 fw-bold mb-0">3</h3>
                  </div>
                  <FaCalendarAlt className="text-warning opacity-75 fs-4" />
                </div>
                <p className="text-muted small mb-0">Submitted this week</p>
              </Card.Body>
            </Card>
          </Col> */}

          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <p className="text-muted small mb-0">CGPA</p>
                    <h3 className="h2 fw-bold mb-0">8.5%</h3>
                  </div>
                  <FaBook className="text-success opacity-75 fs-4" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <p className="text-muted small mb-0">Profile Completion</p>
                    <h3 className="h2 fw-bold mb-0">85%</h3>
                  </div>
                  <FaUser className="text-info opacity-75 fs-4" />
                </div>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>

        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card>
              <Card.Header className="bg-white">
                <Card.Title className="h5 mb-0">Recent Activities</Card.Title>
                <Card.Subtitle className="text-muted small mt-1">
                  Your recently submitted activities
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column gap-3">
                  {[
                    { name: "Tech Hackathon 2023", date: "Mar 15, 2023", place: "First" },
                    { name: "Leadership Workshop", date: "Feb 28, 2023", place: "participation" },
                    { name: "Community Service", date: "Feb 10, 2023", place: "Second" },
                    { name: "Debate Competition", date: "Jan 22, 2023", place: "Third" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className={`d-flex justify-content-between align-items-center ${index < 3 ? "border-bottom pb-3" : ""}`}
                    >
                        <div>
                            <p className="mb-0 fw-medium">{activity.name}</p>
                            <p className="text-muted small mb-0">{activity.date}</p>
                        </div>
                        <span className={`badge ${["First", "Second", "Third"].includes(activity.place) ? "badge-place" : "badge-participation"}`}>
                            {activity.place}
                        </span>

                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header className="bg-white">
                <Card.Title className="h5 mb-0">Activity Categories</Card.Title>
                <Card.Subtitle className="text-muted small mt-1">
                  Distribution of your activities
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column gap-3">
                  {[
                    { category: "Technical", count: 5, percentage: 42 },
                    { category: "Non Technical", count: 2, percentage: 16 },
                    { category: "Sports", count: 3, percentage: 25 },
                    { category: "Cultural", count: 2, percentage: 17 },
                  ].map((category, index) => (
                    <div key={index} className="mb-2">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="fw-medium small">{category.category}</span>
                        <span className="text-muted small">{category.count} activities</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${category.percentage}%` }}
                          aria-valuenow={category.percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}


