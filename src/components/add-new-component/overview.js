import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../spinner-component";
import './style.css';



export default function AddOverview( props) {
  const { trailId } = props;
    const { register, handleSubmit } = useForm({});
    const submitForm = (data) => {
      const dataJson = JSON.stringify(data);
      console.log(dataJson); // data will be transfered with save button (submit for test)
    };
  return (
    <div>
      { (
        <Spinner />
      )  (
        <div className="overview-wrapper">
          <div className="column1">
               <form onSubmit={handleSubmit(submitForm)}>
              <div>
                <input {...register('Trail.TrailId')} type="hidden" value={trailId} />
                <div>
                  <label className="overview-labels">
                    Descriere
                  </label>
                  <textarea
                    {...register('ShortDescription')}
                    className="trail_text_input"
                    name="ShortDescription"
                    type="text"

                  />
                  </div>
              </div>

                  <label className="overview-labels">
                   Etape
                  </label>
                  <textarea
                    {...register('Steps')}
                    className="trail_text_input"
                    name="Steps"
                    type="text"
                  />
                  <label className="overview-labels">
                    Echipament Necesar
                  </label>
                  <textarea
                    {...register('Equipment')}
                    className="trail_text_input"
                    name="Equipment"
                    type="text"
                  />
                 <label className="overview-labels">
                    Indicatii
                  </label>
                  <textarea
                    {...register('Indications')}
                    className="trail_text_input"
                    name="Indications"
                    type="text"
                  />
                  <label className="overview-labels">
                    Observatii
                  </label>
                  <textarea
                    {...register('Observations')}
                    className="trail_text_input"
                    name="Observations"
                    type="text"
                  />
                 
            <button type="submit">Submit</button>
          </form>
      

     
          </div>
        </div>
      )}
      </div>
  
  );
}
