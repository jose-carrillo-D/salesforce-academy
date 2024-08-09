import { LightningElement, api } from 'lwc';

export default class SampleFormGenerator extends LightningElement {

    // Variables ===========================================================
    @api fields = [];
    fieldValues = [];

    regexPatterns = {
        name: "^[a-zA-Z\\s]+$",
        phone: "^[0-9]{10}$",
        email: "[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
    };

    // Functions ===========================================================
    connectedCallback() {
        for (const field of this.fields) {
            this.fieldValues.push({
                ...field,
                pattern: this.regexPatterns[field.type]
            });
        }
    }

    handleFieldChange(event) {
        const field = event.target;
        const validField = this.isValidField(field);
     
        if (validField) {
            const updateEvent = new CustomEvent('fieldchange', {
                detail: {
                    fieldName: field.dataset.id,
                    fieldValue: field.value
                },
            });
            this.dispatchEvent(updateEvent);
        }
     }

    isValidField(field) {
        field.setCustomValidity('');
        if (!field.checkValidity()) {
            const customError = (field.value.length != 0) ? `Introduce a valid ${field.dataset.type}` : 'Complete this field';
            field.setCustomValidity(customError);
        }
        return field.reportValidity();
    }

    @api isValidForm() {
        const fields = this.template.querySelectorAll('lightning-input');
        let isValidForm = true;
        fields.forEach(field => {
            if (!this.isValidField(field)) {
                isValidForm = false;
            }
        });
        return isValidForm;
    }

}