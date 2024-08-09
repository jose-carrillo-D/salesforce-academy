import { LightningElement, track } from 'lwc';
import { DATA_DEFINITION } from './sampleDataInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SampleLightningTable extends LightningElement {

    // Variables ==========================================================
    displayModal = false;
    rowFields = {};
    fieldValues = [];

    @track data = DATA_DEFINITION;
    @track searchString;
    @track error;

    // Data ===============================================================
    actions = [
        { label:"Edit", name:"edit" },
        { label:"Show details", name:"showDetails" }
    ];
    
    @track columns = [
        { label: "Id", fieldName: "id", initialWidth: 75 },
        { label: "Name", fieldName: "name", type: "name", required: true },
        { label: "Last Name", fieldName: "lastName", type: "name", required: true },
        { label: "Phone", fieldName: "phone", type: "phone"},
        { label: "Email", fieldName: "email", type: "email", required: true },
        { label: "Anual Revenue", fieldName: "anualRevenue", type: "currency", cellAttributes: { iconName: { fieldName:'anualRevenueIcon' }, iconPosition: 'right'} },
        { label: "Registration Date", fieldName: "registrationDate", type: "date"},
        { label: "State", fieldName: "state", type: "text", cellAttributes: { class: { fieldName:'stateClassColor' }} },
        { label: "Status", fieldName: "status", type: "text", cellAttributes: { class: { fieldName: 'statusClassColor' }} },
        { type: "action", typeAttributes: { rowActions: this.actions } }
    ];

    // Funtions ===========================================================
    connectedCallback() {
        this.processDataForTable();
    }

    handleOpen() {
        this.displayModal = true;
    }

    handleClose() {
        this.displayModal = false;
    }

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        this.rowFields = event.detail.row;
        this.generateFields();
        switch (actionName) {
            case "edit":
                // Fill out the fields in the modal with row data
                this.handleOpen(); // Display the modal
                break;
            case "showDetails":
                console.log('showDetails action');
                break;
        }
    }

    handleSave(event) {
        const formSelector = this.template.querySelector('c-sample-form-generator');
		const isValidForm = formSelector.isValidForm();  

		if(isValidForm) {
            const updatedData = this.rowFields;

            // Update the data array with the updatedData
            const updatedIndex = this.data.findIndex(
                (item) => item.id === updatedData.id
            );
            if (updatedIndex !== -1) {
                this.data[updatedIndex] = { ...updatedData };
            }

            // Reset the data property to trigger table re-render
            this.data = [...this.data];

            // Close the modal
            this.showToast();
            this.handleClose();
        }
    }

    generateFields() {
        //Reset the fieldValues variable
        this.fieldValues = [];

        //Remove ID & Action columns from Fields list 
        for(const column of this.columns){
            if(column.fieldName !== 'id' && column.type !== 'action'){
                this.fieldValues.push({
                    ...column,
                    value: this.rowFields[column.fieldName]
                });
            }
        }
    }

    handleFieldChange(event) {
        const fieldName = event.detail.fieldName;
        const fieldValue = event.detail.fieldValue;
        const rowFields = {...this.rowFields};
        rowFields[fieldName] = fieldValue;
        this.rowFields = rowFields;
    }

    getStatusColor(value) {
        let statusColor;
        if (value === 'Available') {
            statusColor = 'slds-text-color_success';
        } else if (value === 'Not Available') {
            statusColor = 'slds-text-color_error';
        }
        return statusColor;
    }

    getRevenueIcon(value) {
        let revenueIcon;
        if (value < 25000) {
            revenueIcon = 'utility:down';
        } else if (value >= 25000 && value < 75000) {
            revenueIcon = 'utility:dash';
        } else {
            revenueIcon = 'utility:up';
        }
        return revenueIcon;
    }

    getStateColor(value) {
        let stateColor;
        if(value === 'California') {
            stateColor = 'slds-color__background_gray-4';
        }
        return stateColor;
    }

    processDataForTable() {
        this.data = this.data.map(item => {
            return {
                ...item,
                anualRevenueIcon: this.getRevenueIcon(item.anualRevenue),
                statusClassColor: this.getStatusColor(item.status),
                stateClassColor: this.getStateColor(item.state)
            };
        });
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'The record was updated successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();
        if (searchKey) {
            this.data = DATA_DEFINITION;

            if (this.data) {
                let searchRecords = [];
                for (let record of this.data) {
                    let valuesArray = Object.values(record);
                    for (let val of valuesArray) {
                        console.log('val is ' + val);
                        let strVal = String(val);
                        if (strVal) {
                            if (strVal.toLowerCase().includes(searchKey)) {
                                searchRecords.push(record);
                                break;
                            }
                        }
                    }
                }
 
                console.log('Matched Search are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        } else {
            this.data = DATA_DEFINITION;
        }
        this.processDataForTable();
    }
    
}