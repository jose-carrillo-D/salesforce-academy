import { LightningElement, api} from 'lwc';

export default class Modal extends LightningElement {
        @api isModalOpen;

        handleCloseModal(){
            this.isModalOpen = false;
            const modalClose = new CustomEvent('closeModal',{detail:{message:this.isModalOpen}});
            this.dispatchEvent(modalClose);
        }


    /*isModalOpen = false;*/
        
    /*connectedCallback() {
        this.isModalOpen  = false;
        }
    
        renderedCallback() {
            this.isModalOpen  = false;
            }*/

     /*   @api showModal() {
            this.isModalOpen  = true;
            console.log(isModalOpen);
        }

        @api closeModal() {
            this.isModalOpen  = false;
        }*/
}