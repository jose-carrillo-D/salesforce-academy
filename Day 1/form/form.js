import { LightningElement } from 'lwc';

export default class Form extends LightningElement {
    isModalOpen = false;

    handleShowModal() {
        this.isModalOpen = true;
    }

    handleCloseModal(event) {
       this.isModalOpen = event.detail.message;
     }
    //events, hay que agregar handle, 
}