import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

//Pages
import App from './pages/App-page';
import Home from './pages/Home-page';
import SignIn from './pages/SignIn-page';
import SignUp from './pages/SignUp-page';
import Profile from './pages/Profile-page';
import Admin from './pages/Admin-page';
import CategoryPage from './pages/Category-page';
import SubcategoryPage from './pages/Subcategory-page';
import CreateQuiz from './pages/CreateQuiz-page';
import QuizPage from './pages/Quiz-page';
import CreateQuestiontypePage from './pages/CreateQuestiontype-page';
import QuestiontypePage from './pages/Questiontype-page';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="signin" component={SignIn}/>
        <Route path="signup" component={SignUp}/>
        <Route path="profile" component={Profile} />
        <Route path="createquiz" component={CreateQuiz} />
        <Route path="createquestiontype" component={CreateQuestiontypePage} />
        <Route path="admin" component={Admin} />
        <Route path="/category/:categoryID" component={CategoryPage} />
        <Route path="/subcategory/:subcategoryID" component={SubcategoryPage} />
        <Route path="/questiontype/:questiontypeID" component={QuestiontypePage} />
        <Route path="/quiz/:quizID" component={QuizPage} />
    </Route>
);
