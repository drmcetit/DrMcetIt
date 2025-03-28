import { useState, useEffect, useRef } from "react"
import { Card, Row, Col, Button, Form, Image, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  FaUser,
  FaUniversity,
  FaUserTie,
  FaUsers,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaCode,
  FaHackerrank,
  FaCamera,
} from "react-icons/fa"
import axios from "axios"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"

// API endpoints
const API_BASE_URL = "https://api.example.com" // Replace with your actual API base URL
const PROFILE_ENDPOINT = "/api/profile"
const SECTIONS_ENDPOINT = "/api/sections"
const BATCHES_ENDPOINT = "/api/batches"
const MENTORS_ENDPOINT = "/api/mentors"
const CCS_ENDPOINT = "/api/class-coordinators"
const UPLOAD_ENDPOINT = "/api/upload-profile-image"

export const StudentEditProfile = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    section: "",
    collegeName: "",
    ccName: "",
    mentorName: "",
    batch: "",
    rollNo: "",
    email: "",
    phone: "",
    address: "",
    collegeEmail: "",
    githubProfile: "",
    leetcodeProfile: "",
    hackerrankProfile: "",
    profileImage: "",
  })

  // State for dropdown options
  const [sections, setSections] = useState([])
  const [batches, setBatches] = useState([])
  const [mentors, setMentors] = useState([])
  const [classCoordinators, setClassCoordinators] = useState([])

  // UI states
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // Fetch profile data and dropdown options on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch profile data
        const profileResponse = await axios.get(`${API_BASE_URL}${PROFILE_ENDPOINT}`)

        // For demo purposes, if API is not available
        if (!profileResponse.data) {
          throw new Error("API not available, using sample data")
        }

        setFormData(profileResponse.data)
        setPreviewImage(profileResponse.data.profileImage)

        // Fetch dropdown options
        const [sectionsRes, batchesRes, mentorsRes, ccsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}${SECTIONS_ENDPOINT}`),
          axios.get(`${API_BASE_URL}${BATCHES_ENDPOINT}`),
          axios.get(`${API_BASE_URL}${MENTORS_ENDPOINT}`),
          axios.get(`${API_BASE_URL}${CCS_ENDPOINT}`),
        ])

        setSections(sectionsRes.data || [])
        setBatches(batchesRes.data || [])
        setMentors(mentorsRes.data || [])
        setClassCoordinators(ccsRes.data || [])
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load profile data. Using sample data instead.")

        // Use sample data if API fails
        const sampleData = {
          name: "Alex Johnson",
          department: "Computer Science Engineering",
          section: "A",
          collegeName: "University Engineering College",
          ccName: "Dr. Sarah Williams",
          mentorName: "Prof. Michael Chen",
          batch: "1",
          rollNo: "CSE2001",
          email: "alex.johnson@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Campus Drive, University Town, UT 12345",
          collegeEmail: "alex.j2001@college.edu",
          githubProfile: "github.com/alexj2001",
          leetcodeProfile: "leetcode.com/alexj2001",
          hackerrankProfile: "hackerrank.com/alexj2001",
          profileImage: "https://via.placeholder.com/150",
        }

        setFormData(sampleData)
        setPreviewImage(sampleData.profileImage)

        // Sample dropdown options
        setSections([
          { id: 1, name: "A" },
          { id: 2, name: "B" },
          { id: 3, name: "C" },
        ])

        setBatches([
          { id: 1, name: "Batch 1" },
          { id: 2, name: "Batch 2" },
        ])

        setMentors([
          { id: 1, name: "Prof. Michael Chen" },
          { id: 2, name: "Dr. Lisa Wong" },
          { id: 3, name: "Prof. James Smith" },
        ])

        setClassCoordinators([
          { id: 1, name: "Dr. Sarah Williams" },
          { id: 2, name: "Prof. Robert Johnson" },
          { id: 3, name: "Dr. Emily Davis" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    setUploadError(null)
    const file = e.target.files[0]

    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setUploadError("Please select a valid image file (JPEG, PNG, or GIF)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB")
      return
    }

    setImageFile(file)

    // Create a preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("profileImage", imageFile)

      const response = await axios.post(`${API_BASE_URL}${UPLOAD_ENDPOINT}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Return the URL of the uploaded image
      return response.data.imageUrl
    } catch (err) {
      console.error("Error uploading image:", err)
      setUploadError("Failed to upload image. Please try again.")

      // For demo purposes, return the preview URL
      return previewImage
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSaving(true)
    setError(null)

    try {
      // Upload image if a new one was selected
      let profileImageUrl = formData.profileImage
      if (imageFile) {
        profileImageUrl = await uploadImage()
        if (!profileImageUrl) {
          throw new Error("Failed to upload profile image")
        }
      }

      // Prepare updated profile data
      const updatedProfile = {
        ...formData,
        profileImage: profileImageUrl,
      }

      // Send updated profile data to the server
      await axios.put(`${API_BASE_URL}${PROFILE_ENDPOINT}`, updatedProfile)

      // Navigate back to profile page
      navigate("/profile/personal")
    } catch (err) {
      console.error("Error saving profile:", err)
      setError("Failed to save profile changes. Please try again.")

      // For demo purposes, still navigate back
      setTimeout(() => {
        navigate("/profile/personal")
      }, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    navigate("/profile/personal")
  }

  if (isLoading) {
    return (
      <div className="d-flex">
        <StudentSideBar/>
        <div className="flex-grow-1 p-4 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading profile information...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">Edit Profile</h1>
          <p className="text-muted">Update your personal information</p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={4} className="mb-4">
              <Card>
                <Card.Body className="text-center">
                  <div className="position-relative mb-4 d-inline-block">
                    <Image
                      src={previewImage || "https://via.placeholder.com/150"}
                      roundedCircle
                      width={150}
                      height={150}
                      className="border"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 cursor-pointer"
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    >
                      <FaCamera color="white" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  {uploadError && (
                    <Alert variant="danger" className="mt-2 p-2 small">
                      {uploadError}
                    </Alert>
                  )}

                  <p className="text-muted small">
                    Click on the camera icon to upload a new profile picture.
                    <br />
                    Max size: 5MB. Formats: JPEG, PNG, GIF
                  </p>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header className="bg-white">
                  <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaGithub className="me-2" /> GitHub Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="githubProfile"
                      value={formData.githubProfile || ""}
                      onChange={handleChange}
                      placeholder="github.com/username"
                    />
                    <Form.Text className="text-muted">Enter your GitHub username or profile URL</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaCode className="me-2" /> LeetCode Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="leetcodeProfile"
                      value={formData.leetcodeProfile || ""}
                      onChange={handleChange}
                      placeholder="leetcode.com/username"
                    />
                    <Form.Text className="text-muted">Enter your LeetCode username or profile URL</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaHackerrank className="me-2" /> HackerRank Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="hackerrankProfile"
                      value={formData.hackerrankProfile || ""}
                      onChange={handleChange}
                      placeholder="hackerrank.com/username"
                    />
                    <Form.Text className="text-muted">Enter your HackerRank username or profile URL</Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header className="bg-white">
                  <Card.Title className="h5 mb-0">Personal Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUser className="me-2" /> Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaIdCard className="me-2" /> Roll Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="rollNo"
                          value={formData.rollNo || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUniversity className="me-2" /> Department
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={formData.department || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUsers className="me-2" /> Section
                        </Form.Label>
                        <Form.Select name="section" value={formData.section || ""} onChange={handleChange} required>
                          <option value="">Select Section</option>
                          {sections.map((section) => (
                            <option key={section.id} value={section.name}>
                              {section.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUsers className="me-2" /> Batch
                        </Form.Label>
                        <Form.Select name="batch" value={formData.batch || ""} onChange={handleChange} required>
                          <option value="">Select Batch</option>
                          {batches.map((batch) => (
                            <option key={batch.id} value={batch.name.replace("Batch ", "")}>
                              {batch.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUniversity className="me-2" /> College Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="collegeName"
                          value={formData.collegeName || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUserTie className="me-2" /> Class Coordinator
                        </Form.Label>
                        <Form.Select name="ccName" value={formData.ccName || ""} onChange={handleChange} required>
                          <option value="">Select Class Coordinator</option>
                          {classCoordinators.map((cc) => (
                            <option key={cc.id} value={cc.name}>
                              {cc.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUserTie className="me-2" /> Mentor
                        </Form.Label>
                        <Form.Select
                          name="mentorName"
                          value={formData.mentorName || ""}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Mentor</option>
                          {mentors.map((mentor) => (
                            <option key={mentor.id} value={mentor.name}>
                              {mentor.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header className="bg-white">
                  <Card.Title className="h5 mb-0">Contact Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaEnvelope className="me-2" /> Personal Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaEnvelope className="me-2" /> College Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="collegeEmail"
                          value={formData.collegeEmail || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaPhone className="me-2" /> Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaIdCard className="me-2" /> Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={handleCancel}
                  className="me-2"
                  disabled={isSaving || isUploading}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSaving || isUploading}>
                  {isSaving || isUploading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}