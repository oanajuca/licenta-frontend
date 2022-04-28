import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Map from '../tab-pages-components/map';
import Button from '../button-component';
import AddOverview from './overview';
import Popup, { INITIAL_POPUP_CONFIG } from '../popup-component';
import Review from '../tab-pages-components/review';
import {TimeIcon, DistanceIcon, LocationIcon, DifficultyIcon} from '../tab-component/icons';
import AddTouristGuide from '../tab-pages-components/ghid';
import './style.css'

const DIFFICULTIES =['Usor','Mediu','Greu'];

function AddNewTabs() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [activeTab, setActiveTab] = useState('NewDespre');
  const [formIsValid, setFormIsValid] = useState(true);
  const [popupConfig, setPopupConfig] = useState(INITIAL_POPUP_CONFIG);
  const { register, handleSubmit } = useForm();
  const closePopup = () => {
    setPopupConfig(INITIAL_POPUP_CONFIG);
  };

  const tabs = ['NewDespre', 'NewHarta','New Ghidul Turistului', 'NewRecenzii'];
  const changeTab = (tabIndex) => {
    setActiveTab(tabs[tabIndex]);
    navigate(`/addnewtrail/ ?tab=${tabIndex}`);
  };
  const onSubmit = () => {
    if (formIsValid) {
      setPopupConfig(INITIAL_POPUP_CONFIG);
      console.log('Form submitted');
    } 
  };

  const openPopup = (type, tabIndex) => {
    const newPopupConfig = {
      isOpen: true,
      message: '',
      btnType: '',
      cancel: {
        action: closePopup,
        label: 'Iesire',
      },
      confirm: {

        label: '',
      },
    };
    if (type === 'cancel') {
      newPopupConfig.message = 'Aceasta actiune va inchide editorul si va sterge toate schimbarile.\n Sunteti sigur ca doriti sa iesiti?';
      newPopupConfig.btnType = 'red';
      newPopupConfig.confirm.label = 'Confirmare';
      newPopupConfig.confirm.action = () => navigate(`/home`);
    }
    if (type === 'submit') {
      newPopupConfig.message = 'Informatiile vor fi schimbate permanent.\n Doriti sa continuati?';
      newPopupConfig.btnType = 'green';
      newPopupConfig.confirm.label = 'Confirmare';
      newPopupConfig.confirm.action = onSubmit;
    }
    setPopupConfig(newPopupConfig);
  };
  const submitForm = (data) => {
    const dataJson = JSON.stringify(data);
    console.log(dataJson); // data will be transfered with save button (submit for test)
  };
  return (
    <div className="Tabs">
      <div className="tabs_header_comp">
        <div className="edit_header">
        <form className="edit_header_comp" onSubmit={handleSubmit(submitForm)}>
             <div className="photo">
              {selectedImage && (
              <img
                className="newPhoto"
                alt="not found"
                width={100}
                height={100}
                src={URL.createObjectURL(selectedImage)}
              />

              )}
              <label htmlFor="upload-photo-edit">Incarca o imagine</label>
              <input
              {...register('Mark')}
                type="file"
                id="upload-photo-edit"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              /> 
             </div> 
            <div className="edit_trail_details">
              <input
                {...register('Name')}
                type="text"
                className="edit_trail_name"
              />
              <div className="buttons-wrapper_edit">
              <Button className="cancel_button" type="reset" handleClick={() => { openPopup('cancel'); }}>Cancel</Button>
              <Button className="save_button" type="submit" handleClick={() => { openPopup('submit'); }}>Save</Button>
            </div>
             </div>
               <div className="edit_trail_wrapper">
               <i className="icons-edit">{LocationIcon}</i>
              <input
              {...register('Location')}
                type="text"
                className="edit_trail"
                
              />
              <i className="icons-edit">{DistanceIcon}</i>
              <input
              {...register('Distance')}
                type="text"
                className="edit_trail"
               
              />
              <i className="icons-edit">{DifficultyIcon}</i>
              <select
              {...register('Difficulty')}
                name="select_difficulty"
                className="edit_trail"
                
              >
                 {DIFFICULTIES.map((item) => <option key={item} value={item}>{item}</option>)}
                 </select>
              <i className="icons-edit">{TimeIcon}</i>
              <input
              {...register('Time')}
                type="text"
                className="edit_trail"
                
              />
              
            </div>
            </form>
          </div>
          
          <ul className="nav">
            <div className="tabs-wrapper">
              <li
                label="NewDespre"
                className={activeTab === 'NewDespre' ? 'active' : ''}
                onClick={() => { changeTabAction(0); }}
              >
                Despre
              </li>
              <li
                className={`inactive ${activeTab === 'Harta' ? 'active' : ''}`}
              >
                Harta
              </li>
              <li
                label="New Ghidul Turistului"
                className={activeTab === 'New Ghidul Turistului' ? 'active' : ''}
                onClick={() => { changeTabAction(2); }}
              >
                Ghidul Turistului
              </li>
              <li
        
                className={`inactive ${activeTab ===  'Recenzii' ? 'active' : ''}`}
                
              >
                Recenzii
              </li>
             
            </div>

          </ul>

        </div>
        {popupConfig.isOpen && (
          <Popup
            popupConfig={popupConfig}
            content={(
              <p className="text">{popupConfig.message}</p>
            )}

          />
        )}
        <div className="outlet_review">
          <div className="outlet">
            {activeTab === 'Despre' ? <AddOverview isEditable setFormValid={setFormIsValid} /> : ''}
            {activeTab === 'Harta' ? <Map /> : ''}
            {activeTab === 'Ghidul Turistului' ? <AddTouristGuide /> : ''}
            {activeTab === 'Recenzii' ? <Review/> : ''}
          </div>
        </div>
      </div>

  );
}

export default AddNewTabs;
