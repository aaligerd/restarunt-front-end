import React from 'react'
import PageHeader from "../components/PageHeader";
import  "../css/NewOrder.css";
import Menu from '../components/Menu';
import SelectItem from '../components/SelectItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong} from '@fortawesome/free-solid-svg-icons';
import CustomerDetails from '../components/CustomerDetails';

function NewOrder() {
  return (
    <div>
        <PageHeader/>
        <div className="container">
            <div className="row">
                <div className="col  d-flex justify-content-center" id="top-text">
                    New Order
                </div>
            </div>
        </div>
        <div className="container-fluid" id='item-choose-container'>
            <Menu/>
            <FontAwesomeIcon icon={faArrowRightLong}/>
            <SelectItem/>
            <FontAwesomeIcon icon={faArrowRightLong}/>
            <CustomerDetails/>
        </div>
    </div>
  )
}

export default NewOrder