import { LightningElement} from 'lwc';
import ListContact from '@salesforce/apex/TableController.ListContact';
import deleteContact from '@salesforce/apex/TableController.deleteContact';
import createContact from '@salesforce/apex/TableController.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateContact from '@salesforce/apex/TableController.updateContact';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'First Name', fieldName: 'FirstName'},
    {label: 'Last Name', fieldName: 'LastName'},
    {label: 'Email', fieldName: 'Email'},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
]

export default class LightningTable extends LightningElement {
    data = [];
    recordData = {
        Id : false,
        FirstName : '',
        LastName : '',
        Email: ''
    };
    columns = columns;
    displayCreateFormModal = false;

    async connectedCallback(){
        try{
            this.data = await ListContact();
            this.showToast("Success !!","Records fetched Successfully",'success');
        }catch(error){
            console.log('error');
            this.showToast('Error !!',"Error: "+error,'error');
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.handleShowDetails(row);
                break;
            default:
        }
    }

    handleSaveClicked(event){
        const {data} = event.detail;

        if(data.Id == false){
            this.handleCreate(data);
        }else{
            this.handleUpdate(data);
        }
    }

    async handleCreate(data){
        try {
            const result = await createContact(data);
            this.data = [...this.data, result];
            this.handleCloseButton();
            this.showToast('Success', 'Record successfully created!', 'success');
        } catch (error) {
            this.showToast('Error', 'Error: '+ error.body.message, 'error');
            console.log('error: ',error);
        }
    }

    async handleUpdate(data){
        try {
            const result = await updateContact(data);
            const dataCopy = this.data.map(record => (record.Id == result.Id) ? result : record);
            this.data = dataCopy;
            this.handleCloseButton();
            this.showToast('Success', 'Record successfully updated!', 'success');
        } catch (error) {
            this.showToast('Error', 'Error: '+ error, 'error');
        }
    }

    handleShowDetails(row){
        this.recordData = row;
        this.displayCreateFormModal = true;
    }

    async deleteRow(row) {
        try {
            const contactId = row.Id;
            const result = await deleteContact({contactId: contactId});
            this.showToast("Success !!","Record deleted Successfully",'success');
            this.removeContactFromTable(result.Id);
        } catch (error) {
            this.showToast('Error !!',"Error occured in deleting",'error');
        }
    }

    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    removeContactFromTable(Id){
        const dataCopy = this.data.filter(record => record.Id != Id);
        this.data = dataCopy;
    }

    handleNewButton(){
        this.recordData = {
            Id : false,
            FirstName : '',
            LastName : '',
            Email : ''
        };
        this.displayCreateFormModal = true;
    }

    handleCloseButton(event){
        this.displayCreateFormModal = false;
    }
}
