import { LightningElement} from 'lwc';

export default class MiComponente extends LightningElement {
    cardClass = '';

    connectedCallback() {
        window.addEventListener('resize', () => {
            this.updateCardBackground();
            this.updateTextColor();
        });
        this.updateCardBackground();
        this.updateTextColor();
    }

    updateCardBackground() {
        if (window.innerWidth < 600) { 
            this.cardClass = 'small-screen-card';
        } else {
            this.cardClass = 'large-screen-card';
        }
    }

    updateTextColor() {
        if (window.innerWidth < 600) { 
            this.textClass = 'small-screen-text';
        } else {
            this.textClass = 'large-screen-text';
        }
    }
}
