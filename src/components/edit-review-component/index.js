
import { useState } from 'react';
import Spinner from '../spinner/spinner';
import Button from './button-components';
import './style.css';


export default function EditReview() {
  const { stakehold } = props;
  const { clientId } = props;
  const { control, register, handleSubmit } = useForm({ defaultValues: { Stakeholders: stakehold } });
  const [value, setValue] = useState();
  const [showNew, setShowNew] = useState(false);
  const { fields } = useFieldArray({
    control,
    name: 'Stakeholders',
  });
  const handClick = (e) => {
    e.preventDefault();
    setShowNew(true);
  };

  const submitForm = (data) => {
    data.Name = 'Test';
    data.Email = 'emal.kk@ff.com';
    console.log(JSON.stringify(data));
    console.log(data);
    fetch(`http://localhost:8800/glossary/api/stakeholders/save/${clientId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => console.log(response));
  };
  return (
    <div className="one_stake">
      {!stakehold ? (<Spinner />) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <input {...register('ClientId')} type="hidden" value={clientId} />
          {fields.map((stakes, index) => (
            <div
              key={stakes.Id}
            >
              <input {...register(`Stakeholders.${index}.Id`)} type="hidden" />
              <div>
                <label className="stake_text_label">
                  Full Name
                </label>
                <input
                  {...register(`Stakeholders.${index}.Name`)}
                  key={index}
                  className="stake_text_input"
                  type="text"
                />
                <label className="stake_text_label">
                  Position
                </label>
                <input
                  {...register(`Stakeholders.${index}.Role`)}
                  key={stakes.Role}
                  className="stake_text_input"
                  type="text"
                />
                <label className="stake_text_label">
                  Email
                </label>
                <input
                  {...register(`Stakeholders.${index}.Email`)}
                  key={stakes.Email}
                  className="stake_text_input"
                  type="text"
                />
                <label className={`stake_text_label ${value && isPossiblePhoneNumber(value) ? '' : 'invalid'}`}>
                  Phone
                </label>
                {value && isPossiblePhoneNumber(value) ? '' : <p className="invalid">Invalid Phone Number</p>}
                <PhoneInput
                  {...register(`Stakeholders.${index}.ContactNumber`)}
                  international
                  defaultCountry="RO"
                  onChange={setValue}
                />
                <Button
                  type="button"
                  className="delete_stake"
                  handleClick={() => {
                    const answer = window.confirm('delete?');
                    answer
                      ? (fetch(
                        `http://localhost:8800/glossary/api/stakeholders/delete/${stakes.Id}`,
                        { method: 'DELETE' },
                      ),
                      window.location.reload()) : console.log('canceled');
                  }}
                >
                  Delete Stakeholder
                </Button>
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
      {showNew && <AddStakeholder />}
      <Button
        type="button"
        className="add_stake"
        handleClick={handClick}
      >
        Add New Stakeholder
      </Button>
    </div>
  );
}
