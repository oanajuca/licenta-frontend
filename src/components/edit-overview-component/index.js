import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Spinner from '../spinner-component';
import './style.css';


export default function EditOverview(props) {
  const { descrip } = props;
  const { trailId } = props;
  const { register, handleSubmit } = useForm({ defaultValues: descrip });
  const [value, setValue] = useState();
  const submitForm = (data) => {
    const some = [data].map((element) => {
      JSON.stringify({
        Trails:
          [{
            Id: element.Id, ShortDescription: element.ShortDescription, Steps: element.Steps, Equipment: element.Equipment, Indications: element.Indications,  Observations: element.Observations,
          }],
        TrailId: data.TrailId,
      });
      return element;
    });
    console.log(some);
    const dataJson = JSON.stringify(data);
    console.log(dataJson); // data will be transfered with save button (submit for test)
  };
  return (
      <div>
           {!descrip ? (<Spinner />) : (
  <form onSubmit={handleSubmit(submitForm)}>
                  {descrip.map((des) => (
                    <div className="edit_overview_wrapper">
                    <div key={des.ShortDescription}>
                    <input {...register('TrailId')} type="hidden" value={trailId} />
                    <input {...register('Id')} type="hidden" value={des.Id} />
                    </div>
                    <div className="col1_wrapper">
                      <label className="overview-labels">
                        Descriere
                      </label>
                      <textarea
                        {...register('ShortDescription')}
                        key={des.ShortDescription}
                        className="trail_text_input"
                        name="ShortDescription"
                        type="text"
                        defaultValue={des.ShortDescription}
                      />
                  <label className="overview-labels">
                   Etape
                  </label>
                  <textarea
                    {...register('Steps')}
                    key={des.Steps}
                    className="trail_text_input"
                    name="Steps"
                    type="text"
                    defaultValue={des.Steps}
                  />
                  <label className="overview-labels">
                    Echipament Necesar
                  </label>
                  <textarea
                    {...register('Equipment')}
                    key={des.Equipment}
                    className="trail_text_input"
                    name="Equipment"
                    type="text"
                    defaultValue={des.Equipment}
                  />
                  </div>
                  <div className="col2_wrapper">
                 <label className="overview-labels">
                    Indicatii
                  </label>
                  <textarea
                    {...register('Indications')}
                    key={des.Indications}
                    className="trail_text_input"
                    name="Indications"
                    type="text"
                    defaultValue={des.Indications}
                  />
                  <label className="overview-labels">
                    Observatii
                  </label>
                  <textarea
                    {...register('Observations')}
                    key={des.Observations}
                    className="trail_text_input"
                    name="Observations"
                    type="text"
                    defaultValue={des.Observations}
                  />
                  </div>
                </div>
              ))}
            <button type="submit">Submit</button>
          </form>
      
         
        )}
          </div>
      
      )
                  }