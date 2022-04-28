import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Spinner from '../spinner-component';
import './style.css';


export default function EditTouristGuide(props) {
  const { ghid } = props;
  const { trailId } = props;
  const { register, handleSubmit } = useForm({ defaultValues: ghid });
  const [value, setValue] = useState();
  const submitForm = (data) => {
    const dataJson = JSON.stringify({"TouristGuides" : [{
      Id:data.Id,
      Discover:data.Discover,
      Promote: data.Promote,
      Camping:data.Camping,
      Fire: data.Fire ,
      Deviation:data.Deviation,
      Noise: data.Noise,
      Environment: data.Environment,
      Rules: data.Rules ,
      Garbage: data.Garbage}],
      TrailId: data.TrailId
    })
    console.log(dataJson);
    fetch(`http://localhost:8088/apuseniilapas/api/touristguide/save/${trailId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataJson,
    }).then((response) => console.log(response));
  };
  return (
      <div>
           {!ghid ? (<Spinner />) : (
               <form onSubmit={handleSubmit(submitForm)}>
                 <input {...register('TrailId')} type="hidden" value={trailId} />
               {ghid.map((gu) => (
                 <div className="edit_overview_wrapper">
                 <div key={gu.Discover}>
                 <input {...register('Id')} type="hidden" value={gu.Id} />
                 </div>
                 <div className="col1_wr">
                     <div className="inputs_fields">
                   <input
                     {...register('Discover')}
                     key={gu.Discover}
                     className="guide_text_input"
                     name="Discover"
                     type="text"
                     defaultValue={gu.Discover}
                   />
                   </div>
                   <div className="inputs_fields">
               <input
                 {...register('Promote')}
                 key={gu.Promote}
                 className="guide_text_input"
                 name="Promote"
                 type="text"
                 defaultValue={gu.Promote}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Camping')}
                 key={gu.Camping}
                 className="guide_text_input"
                 name="Camping"
                 type="text"
                 defaultValue={gu.Camping}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Fire')}
                 key={gu.Fire}
                 className="guide_text_input"
                 name="Fire"
                 type="text"
                 defaultValue={gu.Fire}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Deviation')}
                 key={gu.Deviation}
                 className="guide_text_input"
                 name="Deviation"
                 type="text"
                 defaultValue={gu.Deviation}
               />
               </div>
               </div>
               <div className="col2_wr">
               <div className="inputs_fields">
               <input
                 {...register('Noise')}
                 key={gu.Noise}
                 className="guide_text_input"
                 name="Noise"
                 type="text"
                 defaultValue={gu.Noise}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Environment')}
                 key={gu.Environment}
                 className="guide_text_input"
                 name="Environment"
                 type="text"
                 defaultValue={gu.Environment}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Rules')}
                 key={gu.Rules}
                 className="guide_text_input"
                 name="Rules"
                 type="text"
                 defaultValue={gu.Rules}
               />
               </div>
               <div className="inputs_fields">
               <input
                 {...register('Garbage')}
                 key={gu.Garbage}
                 className="guide_text_input"
                 name="Garbage"
                 type="text"
                 defaultValue={gu.Garbage}
               />
               </div>
               </div>
             </div>
           ))}
         <button className="save_guide" type="submit">Salveaza modificarile</button>
       </form>
           )}
           </div>
  );
               }