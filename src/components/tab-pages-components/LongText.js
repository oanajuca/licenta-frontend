import './overview.css';
import { useState } from 'react';

function LongText({ content = '', limit }) {
  const [showAll, setShowAll] = useState(false);
  const showMore = () => setShowAll(true);
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
        <a className="show-more" onClick={showLess}>
          <h6 style={{ marginBlockStart: 2, marginBlockEnd: 20 }}>
            Show Less
          </h6>
        </a>
      </div>
    );
  }

  const toShow = `${content.substring(0, limit)}...`;
  return (
    <div>
      {toShow}
      <a className="show-more" onClick={showMore}>
        <h6 style={{ marginBlockStart: 2, marginBlockEnd: 20 }}>
          Show More
        </h6>
      </a>
    </div>
  );
}
export default LongText;
