import { LightningElement} from 'lwc';

export default class SimpleTable extends LightningElement {
    dataEmployees = [
        { Id: 1, Name: 'John Doe', Age: 30, Country: 'USA' },
        { Id: 2, Name: 'Jane Smith', Age: 25, Country: 'Canada' },
        { Id: 3, Name: 'Bob Johnson', Age: 28, Country: 'UK' },
    ];
}