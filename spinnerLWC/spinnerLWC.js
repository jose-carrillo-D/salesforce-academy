import { LightningElement} from 'lwc';

export default class SpinnerLWC extends LightningElement {
    displaySpinner = true;
    displayModal = false;

    showSpinnerFor(duration) {
        this.displaySpinner = true;

        setTimeout(() => {
            this.displaySpinner = false;
        }, duration);
    }

    handleDisplayModal() {
        this.displayModal = true;
        this.handleButtonClick();
    }

    handleCloseModal() {
        this.displayModal = false;
    }

    handleButtonClick() {
        this.showSpinnerFor(5000);
    }
}
