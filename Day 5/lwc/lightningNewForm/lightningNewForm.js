import { LightningElement, api } from 'lwc';

export default class LightningNewForm extends LightningElement {
    @api record = {
        Id : false,
        FirstName : '',
        LastName : '',
        Email : ''
    };

    dataToUpdate = {};

    connectedCallback(){
        this.dataToUpdate = {...this.record};
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.dataToUpdate[name] = value;

        const newData = new CustomEvent('createcontact', {detail: {
            Id : this.dataToUpdate.Id,
            FirstName: this.dataToUpdate.FirstName,
            LastName: this.dataToUpdate.LastName,
            Email: this.dataToUpdate.Email
        }});
        
        this.dispatchEvent(newData);
    }
}