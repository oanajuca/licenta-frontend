import React from 'react';
import EditTabs from '../components/edit-tabs-component';
import HeaderComponent from '../components/header-component';
import './edittrail-page.css';

function EditTrailPage() {
  return (
    <div className="client_page">
      <HeaderComponent />
      <EditTabs />
    </div>
  );
}

export default EditTrailPage;
