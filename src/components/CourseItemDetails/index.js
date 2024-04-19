import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseDetail: {},
    courseApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetail()
  }

  getCourseDetail = async () => {
    this.setState({courseApiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()

    if (response.ok === true) {
      console.log(data)
      const updateData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      console.log(updateData)
      this.setState({
        courseDetail: updateData,
        courseApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({courseApiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getCourseDetail()
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

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

  renderCourseDetailView = () => {
    const {courseDetail} = this.state
    const {imageUrl, name, description} = courseDetail

    return (
      <div className="details-container">
        <img className="course-image" src={imageUrl} alt={name} />
        <div>
          <h1 className="course-detail-name">{name}</h1>
          <p className="course-detail-description">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetail = () => {
    const {courseApiStatus} = this.state

    switch (courseApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCourseDetailView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-container">
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </nav>
        {this.renderCourseDetail()}
      </div>
    )
  }
}

export default CourseItemDetails
