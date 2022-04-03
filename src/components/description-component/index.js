import LongText from '../tab-pages-components/LongText';
import './style.css';

export default function Descriptions({
shortdescription,steps,equipment, indications, observations,
}) {
  return (
    <div>
      <div className="trail_desc">
        <div className="col1">
        <div className="steps_description">
            <label>Despre</label>
          </div>
          <div className="steps_description_input">
          <LongText
              content={shortdescription}
              limit={350}
            />
          </div>
          <div className="steps_description">
            <label>Etape</label>
          </div>
          <div className="steps_description_input">
            {steps}
          </div>
          <div className="equipment_description">
              <label>Echipament Necesar</label>
          </div>
          <div className="equipment_description_input">
            {equipment}
          </div>
        </div>
        <div className="col2">
          <div className="indications_description">
            <label>Indicatii</label>
          </div>
          <div className="indications_description_input">
            <LongText
              content={indications}
              limit={100}
            />
          </div>
          <div className="obs_description">
            <label>Observatii</label>
          </div>
          <div className="obs_description_input">
            {observations}
          </div>
          </div>
          </div>
          </div>

  )
}