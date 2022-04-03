import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuery from '../../helpers/UseQuery';
import Map from '../tab-pages-components/map';
import Button from '../button-component';
import AddOverview from './overview';
import Popup, { INITIAL_POPUP_CONFIG } from '../popup-component';
import Review from '../tab-pages-components/review';
import {TimeIcon, DistanceIcon, LocationIcon, DifficultyIcon} from '../tab-component/icons';

const DIFFICULTIES =['Usor','Mediu','Greu'];

function AddNewTabs() {
  const navigate = useNavigate('');
  const query = useQuery();
  const [selectedImage, setSelectedImage] = useState();
  const [activeTab, setActiveTab] = useState('Despre');
  const [about, setAbout] = useState({});
  const [difficulty, setDifficulty]= useState({})
  const params = useParams();
  const [formIsValid, setFormIsValid] = useState(true);
  const [popupConfig, setPopupConfig] = useState(INITIAL_POPUP_CONFIG);
  const closePopup = () => {
    setPopupConfig(INITIAL_POPUP_CONFIG);
  };
  const tabs = ['Despre', 'Harta', 'Recenzii'];
  const changeTab = (tabIndex) => {
    closePopup();

    setActiveTab(tabs[tabIndex]);
   
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
      newPopupConfig.confirm.action = () => navigate(`/trail/${params.id}?tab=${0}`);
    }
    if (type === 'submit') {
      newPopupConfig.message = 'Informatiile vor fi schimbate permanent.\n Doriti sa continuati?';
      newPopupConfig.btnType = 'green';
      newPopupConfig.confirm.label = 'Confirmare';
      newPopupConfig.confirm.action = onSubmit;
    }
    if (type === 'changeTab') {
      newPopupConfig.cancel.action = () => changeTab(tabIndex);
      newPopupConfig.cancel.label = 'Ignorare';
      newPopupConfig.message = 'Editarile trebuie salvate ca sa puteti schimba tab-ul. Daca nu sunt editari, ignorati acest mesaj.';
      newPopupConfig.btnType = 'green';
      newPopupConfig.confirm.label = 'Salvare';
      newPopupConfig.confirm.action = () => openPopup('submit');
    }
    setPopupConfig(newPopupConfig);
  };

  const changeTabAction = (tabIndex) => {
    if (tabs[tabIndex] !== activeTab) openPopup('changeTab', tabIndex);
  };
  return (
    <div className="Tabs">
      <div className="tabs_header_comp">
        <div className="edit_header">
         {/*  <div className="edit_header_comp"> */}
           {/*  <div className="photo">
              {selectedImage && (
              <img
                className="newPhoto"
                alt="not found"
                width={100}
                height={100}
                src={URL.createObjectURL(selectedImage)}
              />

              )}
              <label htmlFor="upload-photo-edit">Change picture</label>
              <input
                type="file"
                id="upload-photo-edit"
                onChange={(event) => {
                  setAbout(event.target.value);
                  setSelectedImage(event.target.files[0]);
                }}
              /> */}

        
             {/* <img width={100} height={100} style={{ zIndex: '-1', opacity: '50%' }} src={about.Logo} alt="logo" /> */}
            {/* </div> */}
            <div className="edit_trail_details">
              <input
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
                type="text"
                className="edit_trail"
                
              />
              <i className="icons-edit">{DistanceIcon}</i>
              <input
                type="text"
                className="edit_trail"
               
              />
              <i className="icons-edit">{DifficultyIcon}</i>
              <select
                name="select_difficulty"
                className="edit_trail"
                
              >
                 {DIFFICULTIES.map((item) => <option key={item} value={item}>{item}</option>)}
                 </select>
              <i className="icons-edit">{TimeIcon}</i>
              <input
                type="text"
                className="edit_trail"
                
              />
            </div>
            
          </div>

          <ul className="nav">
            <div className="tabs-wrapper">
              <li
                label="Overview"
                className={activeTab === 'Despre' ? 'active' : ''}
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
                label="Recenzii"
                className={`inactive ${activeTab ===  'Recenzii' ? 'active' : ''}`}
                onClick={() => { changeTabAction(2); }}
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
            {activeTab === 'Recenzii' ? <Review/> : ''}
          </div>
        </div>
      </div>

  );
}

export default AddNewTabs;
