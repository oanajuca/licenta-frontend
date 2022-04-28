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
     const dataJson = JSON.stringify({"Descriptions" : [{
     Id:data.Id,
     Steps: data.Steps,
     Indications: data.Indications ,
      Equipment:data.Equipment,
     Observations:data.Observations,
     TrailId: data.TrailId,
     ShortDescription: data.ShortDescription,}],
     TrailId: data.TrailId
   })
   console.log(dataJson);
    fetch(`http://localhost:8088/apuseniilapas/api/description/save/${trailId}`, {
      method: 'POST',
      headers :{'Content-Type': 'text/json', 'charset': 'utf-8'},
      body: dataJson,
    }).then((response) => console.log(response));
  };
  return (
      <div>
           {!descrip ? (<Spinner />) : (
  <form onSubmit={handleSubmit(submitForm)}>
    <input {...register('TrailId')} type="hidden" value={trailId} />
                  {descrip.map((des) => (
                    <div className="edit_overview_wrapper">
                    <div key={des.ShortDescription}>
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
            <button className="save_overview" type="submit">Salveaza modificarile</button>
          </form>
      
         
        )}
          </div>
      
      )
                  }