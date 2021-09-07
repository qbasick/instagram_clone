import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {lazy, Suspense, useEffect, useState} from "react";
import * as ROUTES from './constants/routes';
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import "../src/styles/app.css";
import data from "./services/data-service";
import ReactLoader from "./components/loader";

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import("./pages/profile"));
const Post = lazy(() => import("./pages/post"));

function App() {
    const {user} = useAuthListener();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user) {
            data.getUser(user)
                .then((res) => {if (res) {
                    setUserDetails(res);
                }
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{userDetails}}>
            <Router>
                    <Suspense fallback={ReactLoader()}>
                        <Switch>
                            <Route path={ROUTES.PROFILE} component={Profile}/>
                            <Route path={ROUTES.POST} component={Post}/>
                            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
                            <Route path={ROUTES.LOGIN} component={Login}/>
                            <Route path={ROUTES.SIGN_UP} component={Signup}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
