import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Image, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaEdit, FaUser, FaUniversity, FaUserTie, FaUsers, FaIdCard, 
  FaEnvelope, FaPhone, FaGithub, FaCode, FaHackerrank 
} from 'react-icons/fa';
import axios from 'axios';
import { StudentSideBar } from '../../components/StudentProfileComponent/StudentSideBar';

// API endpoint
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL
const PROFILE_ENDPOINT = '/api/profile';

export const StudentProfileInfo = () => {
  // State for student data
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch profile data
        const profileResponse = await axios.get(`${API_BASE_URL}${PROFILE_ENDPOINT}`);
        
        // For demo purposes, if API is not available
        if (!profileResponse.data) {
          throw new Error("API not available, using sample data");
        }
        
        setStudentData(profileResponse.data);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load profile data. Using sample data instead.");
        
        // Use sample data if API fails
        const sampleData = {
          name: "Dhanya",
          department: "Information Technology",
          section: "A",
          collegeName: "Dr. MCET",
          ccName: "Dr. Sarah Williams",
          mentorName: "Prof. Michael Chen",
          batch: "1",
          rollNo: "727623bit001",
          email: "dhanys@mail.com",
          phone: "0000000000",
          address: "road",
          collegeEmail: "727623bit001@mcet.in",
          githubProfile: "github.com/dhanya",
          leetcodeProfile: "leetcode.com/dhanya",
          hackerrankProfile: "hackerrank.com/dhanya",
          profileImage: "https://via.placeholder.com/150"
        };
        
        setStudentData(sampleData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  // Render information field (label and value)
  const InfoField = ({ icon, label, value }) => (
    <Row className="mb-3">
      <Col sm={4} className="text-muted">
        {icon} {label}
      </Col>
      <Col sm={8} className="fw-medium">
        {value || "Not specified"}
      </Col>
    </Row>
  );

  if (isLoading) {
    return (
      <div className="d-flex">
        <StudentSideBar/>
        <div className="flex-grow-1 p-4 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading profile information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Alert variant="danger">
            Failed to load profile data. Please try again later.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold">Personal Information</h1>
            <p className="text-muted">View your personal details</p>
          </div>
          <Link to="/student-profile/info/edit">
            <Button variant="primary">
              <FaEdit className="me-2" /> Edit Profile
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="warning" className="mb-4">
            {error}
          </Alert>
        )}

        <Row>
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <div className="mb-3">
                  <Image 
                    src={studentData.profileImage || "https://via.placeholder.com/150"} 
                    roundedCircle 
                    width={120} 
                    height={120} 
                    className="border"
                  />
                </div>
                <h4 className="mb-1">{studentData.name}</h4>
                <p className="text-muted mb-3">{studentData.rollNo}</p>
                <p className="mb-2">
                  <FaUniversity className="me-2" />
                  {studentData.department}
                </p>
                <p className="mb-3">
                  <FaUsers className="me-2" />
                  Section {studentData.section}, Batch {studentData.batch}
                </p>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Header className="bg-white">
                <Card.Title className="h6 mb-0">Contact Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className="mb-2">
                  <FaEnvelope className="me-2 text-muted" />
                  {studentData.email}
                </p>
                <p className="mb-2">
                  <FaEnvelope className="me-2 text-muted" />
                  <span className="text-muted">College: </span>
                  {studentData.collegeEmail}
                </p>
                <p className="mb-2">
                  <FaPhone className="me-2 text-muted" />
                  {studentData.phone}
                </p>
                <p className="mb-0">
                  <FaIdCard className="me-2 text-muted" />
                  {studentData.address}
                </p>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Header className="bg-white">
                <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className="mb-2">
                  <FaGithub className="me-2 text-muted" />
                  <a href={`https://${studentData.githubProfile}`} target="_blank" rel="noopener noreferrer">
                    {studentData.githubProfile || "Not linked"}
                  </a>
                </p>
                <p className="mb-2">
                  <FaCode className="me-2 text-muted" />
                  <a href={`https://${studentData.leetcodeProfile}`} target="_blank" rel="noopener noreferrer">
                    {studentData.leetcodeProfile || "Not linked"}
                  </a>
                </p>
                <p className="mb-0">
                  <FaHackerrank className="me-2 text-muted" />
                  <a href={`https://${studentData.hackerrankProfile}`} target="_blank" rel="noopener noreferrer">
                    {studentData.hackerrankProfile || "Not linked"}
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card>
              <Card.Header className="bg-white">
                <Card.Title className="h5 mb-0">Academic Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <h6 className="border-bottom pb-2 mb-3">Student Information</h6>
                <InfoField 
                  icon={<FaUser className="me-2" />}
                  label="Full Name"
                  value={studentData.name}
                />
                <InfoField 
                  icon={<FaIdCard className="me-2" />}
                  label="Roll Number"
                  value={studentData.rollNo}
                />
                <InfoField 
                  icon={<FaUniversity className="me-2" />}
                  label="Department"
                  value={studentData.department}
                />
                <InfoField 
                  icon={<FaUsers className="me-2" />}
                  label="Section"
                  value={studentData.section}
                />
                <InfoField 
                  icon={<FaUsers className="me-2" />}
                  label="Batch"
                  value={`Batch ${studentData.batch}`}
                />
                
                <h6 className="border-bottom pb-2 mb-3 mt-4">Institution Information</h6>
                <InfoField 
                  icon={<FaUniversity className="me-2" />}
                  label="College Name"
                  value={studentData.collegeName}
                />
                <InfoField 
                  icon={<FaUserTie className="me-2" />}
                  label="Class Coordinator"
                  value={studentData.ccName}
                />
                <InfoField 
                  icon={<FaUserTie className="me-2" />}
                  label="Mentor"
                  value={studentData.mentorName}
                />
                
                <h6 className="border-bottom pb-2 mb-3 mt-4">Social Profiles</h6>
                <InfoField 
                  icon={<FaGithub className="me-2" />}
                  label="GitHub Profile"
                  value={studentData.githubProfile}
                />
                <InfoField 
                  icon={<FaCode className="me-2" />}
                  label="LeetCode Profile"
                  value={studentData.leetcodeProfile}
                />
                <InfoField 
                  icon={<FaHackerrank className="me-2" />}
                  label="HackerRank Profile"
                  value={studentData.hackerrankProfile}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};