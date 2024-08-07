import { LightningElement } from 'lwc';

export default class Table extends LightningElement {

    employeeColumns = [
        { label: 'Employee Id', fieldName: 'employeeId' },
        { label: 'First Name', fieldName: 'firstName' },
        { label: 'Last Name', fieldName: 'lastName' },
        { label: 'Phone Number', fieldName: 'employeePhone', type: 'phone' },
        { label: 'Email Address', fieldName: 'employeEmail', type: 'email'}
    ];

    employeeData = [
        {
            employeeId: '101',
            firstName: 'Karla',
            lastName: 'Lopez',
            employeePhone: '(158) 389-2794',
            employeeEmail: 'klopeztrigueros@deloitte.com'
        },
        {
            employeeId: '102',
            firstName: 'Jared',
            lastName: 'Dunn',
            employeePhone: '(518) 390-2749',
            employeeEmail: 'jared@piedpiper.com'
        },
        {
            employeeId: '103',
            firstName: 'Erlich',
            lastName: 'Bachman',
            employeePhone: '(815) 391-2974',
            employeeEmail: 'erlich.bachman@piedpiper.com'
        }
    ];

    connectedCallback() {
        console.log('Connected to the DOM');
        this.simpleFunction('Connected Callback');
    }

    renderedCallback() {
        console.log('Rendered callback');
        this.simpleFunction('Rendered Callback');
    }

    simpleFunction(callbackType) {
        console.log(`Executing ${callbackType}`);
        if (callbackType === 'Connected Callback') {
            this.connectionMessage = 'Connected!';
        } else if (callbackType === 'Rendered Callback') {
            this.renderedMessage = 'Rendered!';
        }
    }

    handleRowClick(event) {
        const rowIndex = event.detail.selectedRows.employeeId;
        for(let i=0; i<=rowIndex.length; i++){
            this.select
        }
        console.log('Row clicked! Employee Id:', rowIndex);
    }
}