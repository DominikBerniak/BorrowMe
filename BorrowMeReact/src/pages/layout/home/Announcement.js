import '../../../styles/announcement.css'

const Announcement = ({ announcement }) => {
  return (
    <div className='announcement'>
      <div className="title">
        <b>{announcement.title}</b>
      </div>
      <div className="picture">
        <a href={announcement.picturePath}>
          <img src={announcement.picturePath} />
        </a>
      </div>
      <div className="informations-row-1">
        <div className="price">
          10PLN
        </div>
        <div className="city">
          {announcement.city.name}
        </div>
      </div>
      <div className="informations-row-2">
        <div className="date">
          {announcement.publishDate.slice(0, 10)}
        </div>
      </div>
    </div>
  )
}



export default Announcement
