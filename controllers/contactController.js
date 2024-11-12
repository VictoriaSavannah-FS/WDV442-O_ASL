//Setup up my Controller --> 
//where all my CRUD / HTTP methods will be 
//
//NEED KEY FEATURES:
//[1] Pagination
//[2] Sorting
//[3] Filtering
//---most logic will occur w/i the @jworman libray! 
// 
//
//Error Class Name	Description
ContactNotFoundError	Thrown whenever a contact could not be found by the id that was specified
DuplicateContactResourceError	Thrown whenever a duplicate contact with the same email was found when attempting to create a new one.
InvalidContactError	Thrown whenever a contact is invalid. Three other exceptions inherit from this one so this one is considered a generic/catch all exception
InvalidContactFieldError	Thrown whenever a specific field value fails validation (such as an invalid email, or phone format)
InvalidContactSchemaError	Thrown whenever a field outside of the original four (lname, fname, phone, or email) was given to the ContactModel, or one of those fields were missing.
PagerOutOfRangeError	Thrown whenever the user has requested a page that is out of range for the paginator. For example requesting page 10 when there are only 5 pages in total.
InvalidEnumError	Thrown whenever one of the enum type parameters (such as sort) is set to an invalid value other than the ones defined by the enum itself
PagerLimitExceededError	Thrown whenever the user has requested the number of results to be higher than the absolute maximum limit of 20 results per page.

//
//
//
//
//these are functions importing from the @jworkamn library - they have built in logic params - from API docsconst
 const { ContactModel, filterContacts, SortContacts, Pager} =require('@jworkman-fs/asl');

//  GET METHOD : w/ the KEY FEATURES: filter | Sort | Pager
//
const getAllContacts = (req, res) =>{
  //Try-catch block
  try {
    //fetchng all Dataset frm ContactModel
    let contacts = ContactModel.getAll();

    // -------  FILTERING --> filterContacts( dataset, by, operator, value ) -> array
//This function returns a filtered dataset of Contacts based on the provided filtering arguments.

//(array) dataset: The complete list of results for filtering, typically the entire contact list.
//(enum) by: A string limited to one of four values (fname, lname, email, or birthday), commonly referred to as an "enum" in computer science.
//(enum) operator: An enum set to one of five values (eq, gt, gte, lt, or lte), indicating the comparison operator for filtering.
//(any) value: The value that you want to compare the "by" field to.
    //EXAMPLE:const filtered = Contact.filter( contacts, req.get('X-Filter-By'), req.get('X-Filter-Value') )res.json(filtered)
    
    const filterBy = req.get('X-Filter-By');
    const filterOperator = req.get('X-Filter-Operator');
    const filterValue = req.get('X-Filter-Value');

    //LOGIC - Code 
    if(filterBy && filterOperator && filterValue){
      //using filterContacts function form @jworman library tp handle logic -----
      contacts = filterContacts(contacts,filterBy,filterOperator,filterOperator);
    }
  // -------- SORTING ------> sortContacts( dataset, by, direction ) -> array
//This simple function will return an array of sorted contacts.

//(array) dataset: The dataset argument is the entire list of results you want sorted. In this case it would be the entire contact list.
//(enum) by: The sortBy argument is a string that can only be set to 1 of four values (fname, lname, email, or birthday). In the computer science industry we call this an "enum."
//(enum) direction: The direction argument is used to set the direction of the sorting when applied to the sortBy field. It can only be 1 of two values (asc, or desc) which makes it enum.
    
    const sortBy = req.query.sort;
    const sortDirection = req.query.direction;
    //checking params are met ------
    if(sortBy && sortDirection){
      //using the SortContacts function from @jworman lirbary to ahndle logic
      contacts = sortContacts(contacts,sortBy,sortDirection);

    }
 // -------- PAGINATION ------> Pager( dataset, page, limit )
  This class simply needs to be instantiated/invoked with the new keyword. It takes the following three arguments:
    //(array) dataset: The dataset argument is the entire list of results you want paginated. In this case it would be the entire contact list.
    //(integer) page: The page argument is an integer that points to the current page the user is requesting to view out of the entire set of pages. 
    //(integer) limit: The limit argument sets the maximum number of results that can be displayed on any given page. 
  //Pager.results() -> array ---->  This method will return only the results that are being requested in the request.
  //Pager.total() -> integer-->This method will return the total number of results not based on pagination context.
  //Pager.next() -> integer
  //This method simply returns the next page number from the current pagination context.
  //Pager.prev() -> integer

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;
    //params -->>>
    const pager = new Pager(contacts, page, limit);
  //PAIGNATION EXAMPLE ----->>
    //const pager = new Pager( contacts, req.query.page, req.query.size )
    res.set("X-Page-Total", pager.total())
    res.set("X-Page-Next", pager.next())
    res.set("X-Page-Prev", pager.prev())
    //returns pager param value reults
    res.json(pager.results());

  } catch (error) {
   //switch-case blocks 
    //from example: --->> switch(e.name) {
      case "InvalidContactError":
        return res.status(400).json({ message: e.message })
        break;
      switch(e.name){
        case 'PagerOutOfRangeError':
          return res.status(400).json({message: 'Requested page is out of range. Please try again.'});
        default:
          return res.status(500).json({message:'Internal Server Error.'});
      }
  }
};
 //   --- GET Mthod w/ ID -----

const getContactById = (req, res) =>{
  //try catch block
  try {
    //defien/trget ID 
    const contactId = parseInt(req.params.id);
    const contact = ContactModel.get(contactId);
    //status code for prgress - 200 b/c displays info instead of just informing 201
    res.status(200).json(contact);
  } catch (error) {
    //swtich case blocks
    switch(e.name){
      case 'ContactNotFoundError':
        return res.status(404).json({message: 'User Not Found... Please try again.'});
      case 'InvalidContactError':
        return res.status(400).json({message: 'Somethings wrong with your request. Please try again.'})
      default:
        return res status(500).json({message: 'Internal Server Error.'})
    }
    
  }
};

//    --- POST -  / create new Contact

const createContact = (req, res) => {
   //try catcjh block
  try {
    //VALIDATE before adding new contact ---- using @libray fucntion to handle valdite 
    
    ContactModel.validate(req.body);

    //create new variable to hodl new contact dataset

    const newContact = ContactModel.create(req.body);

    //resposne stasus for succes ==> 303: after new submit = a new entity since we want to discurage any browser caching, or even duplicate re-submissions;important to issue a redirect to new created Contact endpoint 
    res.status(303)
    .set('Location', `/contacts/${newContact.id`)
    .json({
    message: 'Contact created succesfully',
    id: newcontact.id,
    contact: newContact});
  } catch (error) {
    switch (error.name) {
      case "InvalidContactFieldError":
        return res.status(400).json({ message: "Field Error: Invalid field detected --> Please check your input." });
      case "BlankContactFieldError":
        return res.status(400).json({ message: "Blank Field Detected: Required fields cannot be blank." });
      case "DuplicateContactResourceError":
        return res.status(409).json({ message: "Duplicate Contact: Contact with this similar params already exists." });
      case "InvalidContactSchemaError":
        return res.status(400).json({ message: "Invalid schema --> Ensure only fname, lname, email, and phone are provided." });
      case "InvalidContactError":
        return res.status(400).json({ message: "Invalid contact data --> Please verify all fields." });
      default:
        return res.status(500).json({ message: "Internal Server Error --> Please try again." });
    }
  }
};

//    --- UPDATE by ID ------

const updateContact = (req, res) => {
  //try catch blcok 
  try {
   //target id and update function 
  const contactId =parseInt(req.params.id);
    ContactModel.update(contactId,req.body);
    //resposne status send with new data
    res.status(204).send();

  } catch (error) {
    //switch/case blocks
    switch(e.name){
        //similar to GET by ID - but change --> UPDATING by ID now----
      case 'ContactNotFoundError':
        return res.status(404).json({ message: 'Contact NOT Found.'});
      case 'InvalidContactError':
        return res.status(400).json({ message: 'Bad Request - check params and please try again.'});
      default:
        return res.status(500).json({ message: 'Internal Servre Error.' });
    }
    
  }

};


//    --- DELETE METHOD by ID 
  
const deleteContact = (req, res) => {
  try {
    // Target/get ID from the req.params----
    //
    const contactId = parseInt(req.params.id);

    // Validate if the ID is a valid integer
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Error: Invalid ID --> Please provide a valid integer." });
    }

    // Use ContactModel fucntion form @library---
    ContactModel.delete(contactId);

    // Status Code 303 --> endpoint to view successful delte
    res.status(303).set('Location', '/contacts').json({ message: "Contact deleted successfully." });

  } catch (error) {
    // switch case block
    switch (error.name) {
      case "ContactNotFoundError":
        return res.status(404).json({ message: "Error: Contact not found --> Please check ID." });
      default:
        return res.status(500).json({ message: "Internal Servrev Error: Unexpected error occurred while deleting the contact." });
    }
  }
};
