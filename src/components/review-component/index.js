export default function Reviews({
    stars, comment
    }) {
        return (
            <div>
              <div className="review_desc">
                <div className="col1">
                  <div className="stars_description_input">
                    {stars}
                  </div>
                  <div className="comm_description_input">
                    {comment}
                  </div>
                  </div>
                  </div>
                  </div>
        )
    }