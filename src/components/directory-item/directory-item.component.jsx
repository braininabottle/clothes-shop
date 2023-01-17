import './directory-item.styles.scss'

import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({ category }) => {

    const { imageUrl, title, id, route } = category
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    
    return (
        <div 
        key={id} 
        className='directory-item-container'
        onClick={onNavigateHandler}
        >
             <div 
             className="background-image" 
             style={{
              backgroundImage: `url(${imageUrl})`,
              }}/>
              <div className="body">
                    <h2>{title}</h2>
                    <p>Shop now</p>
              </div>
          </div>
    )
}

export default DirectoryItem