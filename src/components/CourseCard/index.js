import './index.css'

import {Link} from 'react-router-dom'

const CourseCard = props => {
  const {eachCard} = props
  const {id, logoUrl, name} = eachCard

  return (
    <li className="course-item">
      <Link to={`/courses/${id}`} className="link-list">
        <img className="course-logo" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseCard
