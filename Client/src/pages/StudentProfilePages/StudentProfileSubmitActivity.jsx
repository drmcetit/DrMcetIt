import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import { StudentSideBar } from '../../components/StudentProfileComponent/StudentSideBar';
import axios from 'axios';

export const StudentProfileSubmitActivity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const [formData, setFormData] = useState({
    department: 'IT',
    year: '',
    student: '',
    rollNo: '',
    level: '',
    event: '',
    type: '',
    mode: '',
    category: '',
    place: '',
    date: '',
    organizer: '',
    club: '',
    // award: '',
    teamInd: '',
    description: '',
    proofAttachment: ''
  });

  // Show award field only if place is "Award"
//   const showAwardField = formData.place === 'Award';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        setFileName(file.name);
        setFormData((prevData) => ({
            ...prevData,
            proofAttachment: file,  // Store the actual file object
        }));
    }
};


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
    
  //   if (form.checkValidity() === false) {
  //     e.stopPropagation();
  //     setValidated(true);
  //     return;
  //   }
    
  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log(formData);
  //     setIsSubmitting(false);
  //     alert('Activity submitted successfully!');
  //     navigate('/profile/co-curricular/view');
  //   }, 1500);
  // };

  const home = async () => {
    try {
      const responseGet = await axios.get(
        "http://127.0.0.1:8000/api/event/certificate/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      console.log(responseGet.data);
      console.log(responseGet.data.student)
      setFormData((prevData) => ({
        ...prevData,
        student: responseGet.data.student, // Replace with actual data
      }));
      setFormData((prevData) => ({
        ...prevData,
        rollNo: responseGet.data.rollNo, // Replace with actual data
      }));
      
    } catch (error) {
      console.log("Error");
      console.error("Error fetching data:", error.response?.data);
    }
  };
  useEffect(()=>{
    home()
  },[])
  function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return value;
        }
    }
    return null;
}
const handleSubmit = async (event) => {
  event.preventDefault();

  const csrfToken = getCSRFToken();
  if (!csrfToken) {
      alert("CSRF token missing. Please refresh the page or check login status.");
      return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("year", formData.year);
  formDataToSend.append("student", formData.student);
  formDataToSend.append("rollNo", formData.rollNo);
  formDataToSend.append("level", formData.level);
  formDataToSend.append("event", formData.event);
  formDataToSend.append("date", formData.date);
  formDataToSend.append("type", formData.type);
  formDataToSend.append("mode", formData.mode);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("place", formData.place);
  formDataToSend.append("organizer", formData.organizer);
  formDataToSend.append("club", formData.club);
  formDataToSend.append("teamInd", formData.teamInd);
  formDataToSend.append("description", formData.description);
  
  // Check if proofAttachment is provided before appending
  if (formData.proofAttachment) {
      formDataToSend.append("proofAttachment", formData.proofAttachment);
  }

  try {
      const response = await fetch("http://127.0.0.1:8000/api/event/certificate/", {
          method: 'POST',
          headers: {
              'X-CSRFToken': csrfToken,
              'Authorization': `Bearer ${localStorage.getItem("access_token")}`
          },
          body: formDataToSend
      });
      alert("Data sent ")

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Form submission successful:", result);

  } catch (error) {
      console.error('Error submitting form:', error);
  }
};




  return (
    <div className="d-flex">
      <StudentSideBar/>
      <div className="flex-grow-1 p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">Submit Co-Curricular Activity</h1>
          <p className="text-muted">
            Add details about your co-curricular activities and achievements
          </p>
        </div>

        <div className="form-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Select 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    readOnly
                  >
                    <option value="IT">Information Technology (IT)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select your department.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Event's Academic Year</Form.Label>
                  <Form.Select 
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2019-2020">2019-2020</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select the academic year.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="student">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="student"
                    placeholder="Enter your full name"
                    value={formData.student}
                    onChange={handleChange}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="rollNo">
                  <Form.Label>Roll Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNo"
                    placeholder="Enter your roll number"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your roll number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="event">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="event"
                    placeholder="Enter the name of the event"
                    value={formData.event}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an event name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="level">
                  <Form.Label>Competition Level</Form.Label>
                  <Form.Select 
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Inter-university">Inter-university</option>
                    <option value="State">State</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                    <option value="Intra-college">Intra-college</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select the competition level.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Activity Type</Form.Label>
                  <Form.Select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Co-curricular">Co-curricular</option>
                    <option value="Extra-curricular">Extra-curricular</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select the activity type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3" controlId="mode">
                  <Form.Label>Mode</Form.Label>
                  <Form.Select 
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="Internal">Internal (within institution)</option>
                    <option value="External">External (outside institution)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select the mode.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Training">Training</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Technical">Technical</option>
                    <option value="Competition">Competition</option>
                    <option value="Conference">Conference</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3" controlId="place">
                  <Form.Label>place</Form.Label>
                  <Form.Select 
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select place</option>
                    <option value="Award">First</option>
                    <option value="Award">Second</option>
                    <option value="Award">Third</option>
                    <option value="Participated">Participated</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select your place.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Format: DD-MM-YYYY
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please select a date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3" controlId="teamInd">
                  <Form.Label>Participation Type</Form.Label>
                  <Form.Select 
                    name="teamInd"
                    value={formData.teamInd}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Team">Team</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select participation type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organizer">
                  <Form.Label>Organizer</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizer"
                    placeholder="Name of the organizing institution"
                    value={formData.organizer}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the organizer name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="club">
                  <Form.Label>Club/Assosiation (if applicable)</Form.Label>
                  <Form.Control
                    type="text"
                    name="club"
                    placeholder="Name of the club or cell"
                    value={formData.club}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Leave blank if not applicable
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* {showAwardField && (
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="award">
                    <Form.Label>Award/Achievement</Form.Label>
                    <Form.Control
                      type="text"
                      name="award"
                      placeholder="Name of the award or medal received"
                      value={formData.award}
                      onChange={handleChange}
                      required={showAwardField}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the award details.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )} */}

            <Form.Group className="mb-4" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                placeholder="Describe your role, achievements, and experience"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={500}
              />
              <Form.Text className="text-muted">
                Provide details about your participation, role, and what you learned (10-500 characters).
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a description (10-500 characters).
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-4">
  <Form.Label htmlFor="file-upload">Proof of Participation</Form.Label>
  <div className="d-flex align-items-center gap-3">
    <Button 
      variant="outline-secondary" 
      onClick={() => document.getElementById('file-upload').click()}
    >
      <FaUpload className="me-2" /> Upload File
    </Button>
    
    <Form.Control
      type="file"
      id="file-upload"
      className="d-none"
      accept=".jpg,.jpeg,.png,.pdf"  // Restrict to common file types
      onChange={handleFileChange}
    />
    
    <span className="text-muted small">
      {fileName ? fileName : 'No file selected'}
    </span>
  </div>
  
  <Form.Text className="text-muted">
    Upload certificates, photos, or any proof of your participation.
  </Form.Text>
  
  <Form.Control.Feedback type="invalid">
    Please upload proof of participation.
  </Form.Control.Feedback>
</Form.Group>

            
            <div className="d-flex justify-content-end gap-2 mt-5">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Activity'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

