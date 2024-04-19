import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import CourseCard from '../CourseCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCoursesView = () => {
    const {courseList} = this.state

    return (
      <div className="courses-view-container">
        <h1 className="main-heading">Courses</h1>
        <ul className="courses-list">
          {courseList.map(each => (
            <CourseCard eachCard={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.onClickRetryButton}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  onClickRetryButton = () => {
    this.getCourses()
  }

  renderCoursePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCoursesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </nav>
        {this.renderCoursePage()}
      </div>
    )
  }
}

export default Home
