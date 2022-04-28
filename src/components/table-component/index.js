import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import PaginationComponent from '../pagination-component';
import Spinner from '../spinner-component/';
import Button from "../button-component";
import { TimeIcon,LocationIcon,DistanceIcon} from "./icons";
import UserContext from "../../helpers/UseContext/UserContext";


const DATA_ROWS_LIMIT = 8;

export default function Table() {
    const headers = ['Traseul', 'Distanța', 'Durata', 'Locatie']
    const [tableData, setTableData] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const { userState } = useContext(UserContext);
    const [error, setError] = useState('');
    const [rowIndex, setRowIndex] = useState({ start: 0, end: DATA_ROWS_LIMIT });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(userState.Role==='Admin'){
            setShowButton(true);
        }
        else{
            setShowButton(false)
        }
        setIsLoading(true);
        fetch(`http://localhost:8088/apuseniilapas/api/trail/all`)
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Ceva nu a mers bine');
            })
            .then((trails) => {
                setTableData(trails);
                setIsLoading(false);
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <h1>{error}</h1>;

    const renderTableHeader = () => headers.map((item) => (
        <th key={item} className={`${item.toLowerCase()}`}>
            {item}
        </th>
    ));
    const getPaginatedData = () => tableData.slice(rowIndex.start, rowIndex.end)
    const renderTableData = () => getPaginatedData().map((trail, index) => {
        const {
            Id, Name, Distance, Time, Location,Mark
        } = trail;
       

        return (
            <tr key={Id} onClick={() => navigate(`/trail/${index + 1}?tab=${0}`)}>
                <td>
                    <div className="table-cell">
                        <img width={50} height={50} src={Mark} className="client__logo" alt="Logo" />
                        {Name}
                    </div>
                </td>
                <td>
                <i className="icons">{DistanceIcon}</i>
                    {Distance}
                </td>
                <td>
                    <i className="icons">{TimeIcon}</i>
                    {Time}
                </td>
                <td>
                    <i className="icons">{LocationIcon}</i>
                    {Location}
                </td>
            </tr>
        );
    });
   
   
    const handleButtonClick = (e) => {
        e.preventDefault();
      if(userState.Role === 'Admin'){
        navigate('/addnewtrail')
        
        }    
      };
    return (
        <div>
            {isLoading ? (<Spinner />) : (
                <div className="trails-wrapper">
                    <div className="trails-header">
                        <p className="table-title">TRASEELE APUSENILOR</p>
                       {showButton ? <Button type="button" className="add-client-button" handleClick={handleButtonClick}>Adauga Traseu</Button> :""}
                    </div>
                    <table className="table-body">
                        <thead>
                            <tr>{renderTableHeader()}</tr>
                        </thead>
                        <tbody>{renderTableData()}</tbody>
                    </table>
                    {tableData.length > 0 ? (
                        <PaginationComponent
                            dataLength={tableData.length}
                            setRowIndex={setRowIndex}
                            pageLimit={6}
                            dataLimit={DATA_ROWS_LIMIT}
                        />
                    ) : (
                        <h1>Nu exista niciun traseu de afișat</h1>
                    )}
                </div>
            )}
        </div>
    );

}
