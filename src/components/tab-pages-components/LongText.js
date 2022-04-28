import './overview.css';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../helpers/UseContext/UserContext';

function LongText({ content = '', limit }) {
  const [showAll, setShowAll] = useState(false);
  const { userState } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(userState)
  useEffect(() => {
    if(userState.Id === ''){
        setIsAuthenticated(false);
    }
    else{
        setIsAuthenticated(true)
    }
  }, []);
  const showMore = () =>{
      setShowAll(true);
  }
const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    return (
      <div>
        {' '}
        {content}
        {' '}
      </div>
    );
  }

  if (showAll) {
    return (
      <div>
        {content}
        { isAuthenticated ? 
        <a className="show-more" onClick={showLess}>
          <h6 style={{ marginBlockStart: 2, marginBlockEnd: 20 }}>
            Show Less
          </h6>
        </a> : ""}
      </div>
    );
  }

  const toShow = `${content.substring(0, limit)}...`;
  return (
    <div>
      {toShow}
      {isAuthenticated ? 
      <a className="show-more" onClick={showMore}>
        <h6 style={{ marginBlockStart: 2, marginBlockEnd: 20 }}>
          Show More
        </h6>
      </a> :""}
    </div>
  );
}
export default LongText;
