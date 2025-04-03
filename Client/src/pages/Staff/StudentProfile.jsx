import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import {
  FaArrowLeft,
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaCode,
  FaHackerrank,
  FaLinkedin,
  FaQuoteLeft,
  FaQuoteRight,
  FaGraduationCap,
} from "react-icons/fa"

// Sample student data (in a real app, this would come from an API)
// const studentsData = [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     rollNo: "CSE2001",
//     department: "Computer Science Engineering",
//     section: "A",
//     collegeName: "University Engineering College",
//     ccName: "Dr. Sarah Williams",
//     mentorName: "Prof. Michael Chen",
//     batch: "1",
//     collegeEmail: "alex.j2001@college.edu",
//     phone: "+1 (555) 123-4567",
//     bio: "Final year computer science student passionate about AI and machine learning. Experienced in web development and mobile app development. Looking for opportunities in software engineering.",
//     githubProfile: "github.com/alexj2001",
//     leetcodeProfile: "leetcode.com/alexj2001",
//     hackerrankProfile: "hackerrank.com/alexj2001",
//     linkedinProfile: "linkedin.com/in/alexjohnson",
//     profilePic: "https://via.placeholder.com/150",
//     activities: [
//       { id: 1, name: "Tech Hackathon 2023", date: "Mar 15, 2023", category: "Technical", status: "First" },
//       { id: 2, name: "Web Development Workshop", date: "Feb 10, 2023", category: "Technical", status: "Participated" },
//       { id: 3, name: "College Cultural Fest", date: "Jan 25, 2023", category: "Cultural", status: "Participated" },
//       { id: 4, name: "AI Research Project", date: "Dec 12, 2022", category: "Technical", status: "Second" },
//       { id: 5, name: "Open Source Contribution", date: "Nov 20, 2022", category: "Technical", status: "Participated" },
//       { id: 6, name: "College Sports Day", date: "Oct 15, 2022", category: "Sports", status: "Third" },
//       { id: 7, name: "Mobile App Development Contest", date: "Sep 28, 2022", category: "Technical", status: "First" },
//       { id: 8, name: "Community Service Drive", date: "Aug 05, 2022", category: "Social", status: "Participated" },
//       { id: 9, name: "Programming Competition", date: "Jul 22, 2022", category: "Technical", status: "Participated" },
//       { id: 10, name: "Debate Competition", date: "Jun 18, 2022", category: "Cultural", status: "Second" },
//       {
//         id: 11,
//         name: "Environmental Awareness Campaign",
//         date: "May 05, 2022",
//         category: "Social",
//         status: "Participated",
//       },
//       { id: 12, name: "Robotics Workshop", date: "Apr 12, 2022", category: "Technical", status: "Third" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     rollNo: "ECE2045",
//     department: "Electronics & Communication Engineering",
//     section: "B",
//     collegeName: "University Engineering College",
//     ccName: "Dr. Robert Johnson",
//     mentorName: "Prof. Lisa Wong",
//     batch: "2",
//     collegeEmail: "priya.s2045@college.edu",
//     phone: "+1 (555) 234-5678",
//     bio: "Electronics enthusiast with a passion for IoT and embedded systems. Skilled in circuit design and PCB layout. Seeking opportunities in hardware design and development.",
//     githubProfile: "github.com/priyas2045",
//     leetcodeProfile: "leetcode.com/priyas",
//     hackerrankProfile: "hackerrank.com/priyas",
//     linkedinProfile: "linkedin.com/in/priyasharma",
//     profilePic: "https://via.placeholder.com/150",
//     activities: [
//       { id: 1, name: "Circuit Design Competition", date: "Apr 5, 2023", category: "Technical", status: "First" },
//       { id: 2, name: "IoT Workshop", date: "Mar 12, 2023", category: "Technical", status: "Participated" },
//       { id: 3, name: "College Sports Meet", date: "Feb 18, 2023", category: "Sports", status: "Third" },
//     ],
//   },
// ]

export const StudentProfile = () => {
  // const { id } = useParams()
  // const navigate = useNavigate()
  // const [student, setStudent] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [studentsData, setStudentsData] = useState([]);


  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/teacher/studentList/", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token_staff")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("API Response:", data);
  //       const safeData = Array.isArray(data)
  //         ? data
  //         : data.studentsData && Array.isArray(data.studentsData)
  //         ? data.studentsData
  //         : [];
  //       console.log(safeData);
  //       setStudentsData(safeData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setStudentsData([]); // Corrected function name
  //     });
  // }, []);

  // useEffect(() => {
  //   // In a real app, you would fetch the student data from an API
  //   // For now, we'll just find the student in our sample data
  //   const foundStudent = studentsData.find((s) => s.id === Number.parseInt(id))

  //   if (foundStudent) {
  //     setStudent(foundStudent)
  //   }

  //   setLoading(false)
  // }, [id])

  // if (loading) {
  //   return <div className="text-center p-5">Loading student profile...</div>
  // }

  // if (!student) {
  //   return (
  //     <div className="text-center p-5">
  //       <h3>Student not found</h3>
  //       <Button variant="primary" onClick={() => navigate("/staff-profile")}>
  //         Back to Dashboard
  //       </Button>
  //     </div>
  //   )
  // }


  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState([]);
  const { User } = useParams();
  console.log("Student User from useParams:", User);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/teacher/studentList/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token_staff")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      const safeData = Array.isArray(data)
        ? data
        : data.studentsData && Array.isArray(data.studentsData)
        ? data.studentsData
        : [];
      console.log(safeData);
      setStudentsData(safeData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setStudentsData([]);
    });
}, []);

useEffect(() => {
  if (studentsData.length > 0) {
    const foundStudent = studentsData.find((s) => s.User === Number(User));
    setStudent(foundStudent || null);
    setLoading(false);
  }
}, [User, studentsData]); // Added studentsData as a dependency

if (loading) {
  return <div className="text-center p-5">Loading student profile...</div>;
}

if (!student) {
  return (
    <div className="text-center p-5">
      <h3>Student not found</h3>
      <Button variant="primary" onClick={() => navigate("/staff-profile")}>
        Back to Dashboard
      </Button>
    </div>
  );
}

  return (
    <Container fluid className="p-4">
      <Button variant="outline-primary" className="mb-4" onClick={() => navigate("/staff-profile")}>
        <FaArrowLeft className="me-2" /> Back to Dashboard
      </Button>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3 position-relative">
                <div className="position-relative d-inline-block">
                  <img
                    src={student.profilePic || "https://via.placeholder.com/150"}
                    alt={student.Name}
                    className="rounded-circle border p-1 bg-light"
                    width="130"
                    height="130"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1">
                    <FaGraduationCap color="white" size={16} />
                  </div>
                </div>
              </div>
              <h4 className="mb-1">{student.Name}</h4>
              <p className="text-muted mb-2">{student.RollNo}</p>
              <p className="mb-2 badge bg-light text-dark border">
                <FaUniversity className="me-1" />
                Information Technology
              </p>
              <p className="mb-3">
                <span className="badge bg-primary me-2">Section {student.Section}</span>
                <span className="badge bg-secondary">Batch {student.batch}</span>
              </p>

            </Card.Body>
          </Card>

          <Card className="mt-4 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4">
              <Card.Title className="h6 mb-0">Contact Information</Card.Title>
            </Card.Header>
            <Card.Body className="pt-0">
              <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                <FaEnvelope className="me-3 text-primary" />
                <div>
                  <div className="small text-muted">College Email</div>
                  <div>{student.RollNum}@mcet.in</div>
                </div>
              </div>
              <div className="d-flex align-items-center p-2 bg-light rounded">
                <FaPhone className="me-3 text-primary" />
                <div>
                  <div className="small text-muted">Phone</div>
                  <div>{student.phoneNum}</div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4">
              <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
            </Card.Header>
            <Card.Body className="pt-0">
              <a
                href={student.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
              >
                <FaGithub className="me-3 text-dark" />
                <div>
                  <div className="small text-muted">GitHub</div>
                </div>
              </a>
              <a
                href={student.Linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
              >
                <FaLinkedin className="me-3 text-primary" />
                <div>
                  <div className="small text-muted">LinkedIn</div>
                </div>
              </a>
              <a
                href={student.Leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
              >
                <FaCode className="me-3 text-warning" />
                <div>
                  <div className="small text-muted">LeetCode</div>
                </div>
              </a>
              <a
                href={student.HackerRank}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center p-2 bg-light rounded text-decoration-none text-dark"
              >
                <FaHackerrank className="me-3 text-success" />
                <div>
                  <div className="small text-muted">HackerRank</div>
                </div>
              </a>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4">
              <Card.Title className="h5 mb-0">About Student</Card.Title>
            </Card.Header>
            <Card.Body className="pt-2">
              <div className="position-relative p-4 bg-light rounded">
                <FaQuoteLeft
                  className="position-absolute text-primary opacity-25"
                  style={{ top: "10px", left: "10px", fontSize: "1.5rem" }}
                />
                <p className="mb-0 px-4">{student.bio}</p>
                <FaQuoteRight
                  className="position-absolute text-primary opacity-25"
                  style={{ bottom: "10px", right: "10px", fontSize: "1.5rem" }}
                />
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4">
              <Card.Title className="h5 mb-0">Co-Curricular Activities</Card.Title>
            </Card.Header>
            <Card.Body className="pt-2">
              <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table table-hover">
                  <thead className="table-light sticky-top" style={{ top: 0, background: "white", zIndex: 1 }}>
                    <tr>
                      <th>Activity Name</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Place</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.activites.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.event}</td>
                        <td>{activity.date}</td>
                        <td>{activity.category}</td>
                        <td>
                          <Badge
                            bg={
                              activity.place === "First" || activity.place === "Second" || activity.place === "Third"
                                ? "success"
                                : activity.place === "Participated"
                                  ? "primary"
                                  : "secondary"
                            }
                          >
                            {activity.place}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
