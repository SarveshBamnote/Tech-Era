import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import CourseItemDetails from './components/CourseItemDetails'

import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseItemDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
