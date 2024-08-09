import { LightningElement, api} from 'lwc';

export default class LightningFormModalGenerator extends LightningElement {
    responseCopy;
    @api record;

    connectedCallback(){
    }

    handleCreateContact(event){
        const response = event.detail;
        this.responseCopy = {...response};
    }

    handleCloseModal(event){
        const closeModal = new CustomEvent('closemodal', {});
        this.dispatchEvent(closeModal);
    }

    handleSaveButton(event){
        const saveClicked = new CustomEvent('saveclicked', {detail: {
            data: this.responseCopy
        }});
        this.dispatchEvent(saveClicked);
    }
}