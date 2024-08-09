public with sharing class TableController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> ListContact() {
        return [Select ID, FirstName, LastName, Email From Contact];
    }

    @AuraEnabled
    public static Contact createContact(String Id, String FirstName, String LastName, String Email){
        Contact newContact = new Contact();
        newContact.FirstName = FirstName;
        newContact.LastName = LastName;
        newContact.Email = Email;

        try {
            insert newContact;
            return newContact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Contact deleteContact(Id contactId){
        try {
            Contact contactToDelete = [SELECT Id FROM Contact WHERE Id = :contactId LIMIT 1];
            delete contactToDelete;
            return contactToDelete;
        } catch(Exception e) {
            throw new AuraHandledException('Error deleting contact: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Contact updateContact(String Id, String FirstName, String LastName, String Email){
        try {
            Contact contactToUpdate = [Select Id, FirstName, LastName, Email from Contact Where Id =:Id LIMIT 1];
            contactToUpdate.FirstName = FirstName;
            contactToUpdate.LastName = LastName;
            contactToUpdate.Email = Email;
            update contactToUpdate;
            return contactToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}