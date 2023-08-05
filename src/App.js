import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import VerifyPage from './components/VerifyPage'
import CourseList from "./components/CourseList";
import Header from "./components/Header";
import OurCourses from "./components/OurCourses";
import LessonDetails from "./components/LessonDetails";
import CourseDetails from "./components/CourseDetails";
import MyCourses from "./components/MyCourses";
import MyCourseDetails from "./components/MyCourseDetails";
import LessonsOfCourse from "./components/LessonsOfCourse";
import MyProfile from "./components/MyProfile";
import MyCoursesForTeacher from "./components/Teacher/MyCoursesForTeacher";
import MyCourseDetailsForTeacher from "./components/Teacher/MyCourseDetailsForTeacher";
import LessonsOfCourseForTeacher from "./components/Teacher/LessonsOfCourseForTeacher";
import LessonDetailsForTeacher from "./components/Teacher/LessonDetailsForTeacher";
import CreateLessonPage from "./components/Teacher/CreateLessonPage";
import ChangeLesson from "./components/Teacher/ChangeLesson";
import CreateCourse from "./components/admin/CreateCourse";
import CoursesForAdmin from "./components/admin/CoursesForAdmin";
import CourseDetailsForAdmin from "./components/admin/CourseDetailsForAdmin";
import ChangeCourse from "./components/admin/ChangeCourse";
import ChangeProfile from "./components/ChangeProfile";
import Comments from "./components/Comments";

const App = () => {
  return (
    <Router>
      <div>
          <Header/>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/dashboard/*" element={<Dashboard/>} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/courses" element={<CourseList />} />

            <Route path="/courses/:courseId" element={<CourseDetails />}/>

            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/my-teaching-courses" element={<MyCoursesForTeacher />} />
            <Route path="/my-courses/:courseId" element={<MyCourseDetails />} />
            <Route path="/my-teaching-courses/:courseId" element={<MyCourseDetailsForTeacher />} />
            <Route path="/my-courses/:courseId/lessons" element={<LessonsOfCourse />} />
            <Route path="/my-teaching-courses/:courseId/lessons" element={<LessonsOfCourseForTeacher />} />

            <Route path="/my-teaching-courses/:courseId/lessons/create" element={<CreateLessonPage />} />

            <Route path="/my-courses/:courseId/lessons/:lessonId" element={<LessonDetails />} />
            <Route path="/my-teaching-courses/:courseId/lessons/:lessonId" element={<LessonDetailsForTeacher />} />
            <Route path="/my-teaching-courses/:courseId/lessons/:lessonId/change" element={<ChangeLesson />} />

            <Route path="/myprofile" element={<MyProfile />} />

            <Route path="/myprofile/edit" element={<ChangeProfile />} />

            <Route path="/comments" element={<Comments/>}/>

            <Route path="/courses-admin" element={<CoursesForAdmin />} />
            <Route path="/courses-admin/create" element={<CreateCourse />} />
            <Route path="/courses-admin/:courseId" element={<CourseDetailsForAdmin />}/>
            <Route path="/courses-admin/:courseId/change" element={<ChangeCourse />}/>



            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/oc" element={<OurCourses />} />

        </Routes>
      </div>
    </Router>
  );
};


export default App;
