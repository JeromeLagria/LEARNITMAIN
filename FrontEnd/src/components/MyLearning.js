import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import course1Image from "../assets/course1.png";
import course2Image from "../assets/course2.png";
import course3Image from "../assets/course3.png";
import course4Image from "../assets/course4.png";
import course5Image from "../assets/course5.png";

function MyLearning() {
  const [courseProgress, setCourseProgress] = useState({});
  const [userData, setUserData] = useState(null);
  const [responseCourseData, setResponseCourseData] = useState(null);
  const [responseCourses, setResponseCourses] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/ProfileScreen");
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("token");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
        console.log(userId); // Log the user ID
        const userResponse = await axios.get(
          `https://learnit-bde1.onrender.com/users/${userId}`
        );
        const courseResponse = await axios.get(`https://learnit-bde1.onrender.com/course`);
        const userCoursesResponse = await axios.get(
          `https://learnit-bde1.onrender.com/courses/${userId}`
        );
        setUserData(userResponse.data);
        setResponseCourses(courseResponse.data);
        setResponseCourseData(userCoursesResponse.data);
        
        if (userData && userData.ID) {
          const userCoursesResponse = await axios.get(`https://learnit-bde1.onrender.com/courses/${userId}`);
          if (userCoursesResponse.data) {
            setResponseCourseData(userCoursesResponse.data);
          } else {
            console.log("No courses found for the user");
            // Handle the case where no courses are found for the user
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData]); // Add userData as a dependency

  const handleAddCourse = async (title, description, content) => {
    try {

      const userId = localStorage.getItem("token");
      // Check if userData is available, otherwise set ID to null
      const courseData = {
        title: title,
        description: description,
        content: String(content), // Assuming content is "course1image"
        progress: 0, // Set initial progress to 0
        ID: userId, // Set ID based on userData, or null if not available
      };

      const response = await axios.post(
        "https://learnit-bde1.onrender.com/addcourse",
        courseData
      );

      if (response.status === 201) {
        // Course added successfully
        console.log("Course added successfully:", response.data);
      }

      navigate("/MyLearning");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleViewContent = (content) => {
    // Navigate to CourseContentScreen passing the content
  };

  const courses = [
    {
      courseID: 1,
      title: "HTML",
      description:
        "HTML is the standard markup language for web pages. Use it to to structure the content on your own website.",
      content: course1Image,
    },
    {
      courseID: 2,
      title: "CSS",
      description:
        "CSS is the language used to style an HTML document, and describes how elements should be displayed.",
      content: course2Image,
    },
    {
      courseID: 3,
      title: "JavaScript",
      description:
        "JavaScript is a programming language that can be used to make content dynamic, control multimedia and make elements move.",
      content: course3Image,
    },
    {
      courseID: 4,
      title: "Python",
      description:
        "Python can be used for everything from machine learning to building and testing websites. Useful for both developers and non-developers.",
      content: course4Image,
    },
    {
      courseID: 5,
      title: "C++",
      description:
        "C++ is a general-purpose programming language, often used for applications that are graphics-heavy like games, photo and video editing apps.",
      content: course5Image,
    },

    // Add more courses as needed
  ];

  const increaseProgress = (courseId) => {
    const currentProgress = courseProgress[courseId] || 0;
    const newProgress = Math.min(currentProgress + 10, 100); // Increment by 10%, but ensure it doesn't exceed 100%
    handleProgressUpdate(courseId, newProgress);
  };

  const handleProgressUpdate = (courseId, progress) => {
    setCourseProgress((prevProgress) => ({
      ...prevProgress,
      [courseId]: progress,
    }));
  };

  return (
    <div>
      <div style={styles.nav}>
        <div style={styles.profile} onClick={handleProfile}>
          Profile
        </div>
      </div>
      <div className="content">
        <div className="title">My Courses</div>
        <div className="addButton" onClick={toggleContent}>
          <span className="addButtonLabel">Add Topics</span>
        </div>
        {showContent && (
          <div style={styles.containerAdd}>
            <div style={styles.addTopics}>
              <button onClick={toggleContent} style={styles.mdClose}>
                <MdClose />
              </button>
              <div style={styles.addCourse}>
                {courses.map((course) => (
                  <div
                    key={course.courseID} // Add key prop
                    onClick={() =>
                      handleAddCourse(
                        course.title,
                        course.description,
                        course.content
                      )
                    }
                  >
                    <div
                      style={styles.coursecontainer}
                      onClick={() => handleViewContent(course.content)}
                    >
                      <img
                        src={course.content}
                        alt={course.title}
                        style={styles.courseImage}
                      />
                      <div className="courseTitle">{course.title}</div>
                      <div className="courseDescription">
                        {course.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div style={styles.containerOutside}>
          <div style={styles.container}>
            {responseCourseData && (
              <div>
                <img
                  src={responseCourseData.content}
                  alt={responseCourseData.title}
                />
                <div className="courseTitle">{responseCourseData.title}</div>
                <div className="courseDescription">
                  {responseCourseData.description}
                </div>
                <progress
                  value={responseCourseData.progress}
                  className="progressBar"
                  max={100}
                ></progress>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "10vh",
    position: "relative",
    height: "auto",
    justifyContent: "space-between",
    wwidth: "200vh",
  },

  nav: {
    display: "flex",
    position: "fixed",
    top: "0",
    borderBottom: "1px solid gray",
    height: "56px",
    width: "100%",
    background: "white",
  },

  profile: {
    cursor: "pointer",
    right: "0",
    display: "flex",
    position: "absolute",
  },

  containerOutside: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  coursecontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: "5px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
  },

  courseImage: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
    borderRadius: "100px",
    padding: "5px",
    background: "gray",
  },

  addTopics: {
    width: "90%",
    padding: "10vh",
    height: "70vh",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid black",
    background: "white",
    zIndex: "1",
    margin: "10vh",
    borderRadius: "15px",
  },

  containerAdd: {
    display: "flex",
    backdropFilter: "blur(2px)", // Adjust the blur radius as needed
    WebkitBackdropFilter: "blur(2px)", // For Safari support
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust the opacity as needed
    zIndex: "1",
    position: "absolute",
    marginTop: "56px",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  mdClose: {
    position: "absolute",
    display: "flex",
    top: 5,
    right: 5,
    background: "red",
    borderRadius: "100px",
  },

  addCourse: {
    display: "flex",
    height: "100%",
    fontSize: "10px",
    justifyContent: "space-between",
  },
};

export default MyLearning;
