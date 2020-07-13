import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Articles/Articles.css'
import Articles from './Articles/Articles'
import SectionArticles from './Articles/SectionArticles'

// The Routing Component providing all the routing Configuration
const Routes = (props) => {
    return (
        <>
        <div className="nav-bar">
        <ul>
            <li><a href="/"><b>Home</b></a></li> 
            <li><a href="/review"><b>Reviews</b></a></li>
            <li><a href="/features"><b>Features</b></a></li>
            <li><a href="/video"><b>Videos</b></a></li>
        </ul>
         </div>
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Articles} />
               <Route exact path="/author" render={(props) => <Articles {...props} />} />
               <Route exact path="/latest" render={(props) => <SectionArticles {...props} title="Latest" type=""/>} />
               <Route exact path="/review" render={(props) => <SectionArticles {...props} title='Reviews' type='review'/>} />
               <Route exact path="/video" render={(props) => <SectionArticles {...props} title='Video' type='video'/>} />
               <Route exact path="/features" render={(props) => <SectionArticles {...props} title='Features' type='features'/>} />
            </Switch>
        </BrowserRouter>
        </>
    )
}
export { Routes }