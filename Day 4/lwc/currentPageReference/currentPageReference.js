import { LightningElement , api, wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';


export default class CurrentPageReferenceLWC extends LightningElement {
    @api recordId;
    currentPageReference = null; 
    pageReferences = [];
    recordId = null;
    attributes = null;
    states = null;
    type = null;
  
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
       if (currentPageReference) {
          console.log(currentPageReference);
          this.recordId = currentPageReference.attributes.recordId || null;
          this.attributes = currentPageReference.attributes;
          this.states = currentPageReference.state;
          this.type = currentPageReference.type;
       }
    }
}