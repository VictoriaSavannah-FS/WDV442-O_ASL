//Setup up my Controller --> 
//where all my CRUD / HTTP methods will be 
//
//NEED KEY FEATURES:
//[1] Pagination
//[2] Sorting
//[3] Filtering
//---most logic will occur w/i the @jworman libray! 

//  ----> these are functions importing from the @jworkamn library - they have built in logic params - from API docsconst
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
      contacts = filterContacts(contacts,filterBy,filterOperator,filterValue);
    }
  // -------- SORTING ------> sortContacts( dataset, by, direction ) -> array
//This simple function will return an array of sorted contacts.

//(array) dataset: The dataset argument is the entire list of results you want sorted. In this case it would be the entire contact list.
//(enum) by: The sortBy argument is a string that can only be set to 1 of four values (fname, lname, email, or birthday). In the computer science industry we call this an "enum."
//(enum) direction: The direction argument is used to set the direction of the sorting when applied to the sortBy field. It can only be 1 of two values (asc, or desc) which makes it enum.
    
    // sorting params 
    const sortBy = req.query.sort || 'fname'; 
    const sortDirection = req.query.direction || 'asc'; 

    // Validate sorting parms
    if (!['fname', 'lname', 'email', 'birthday'].includes(sortBy)) {
      return res.status(400).json({ message: 'Invalid sortBy parameter' });
    }

    if (!['asc', 'desc'].includes(sortDirection)) {
   return res.status(400).json({ message: 'Invalid sortDirection parameter' });
    }

  // Apply sorting --> IF params are valid
    contacts = SortContacts(contacts, sortBy, sortDirection);

 // -------- PAGINATION ------> Pager( dataset, page, limit )

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;
    //params -->>>
    
    //---> NEED validation!! 
    
    if(limit > 20){
      return res.status(400).json({message: 'Invalid Input: Limit exceeds max value --> try again!'});
    }
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
    switch (error.name) {
    case "InvalidContactError":
      return res.status(400).json({ message: error.message });

    case "PagerOutOfRangeError":
      return res.status(400).json({ message: 'Requested page is out of range. Please try again.' });

    case "ContactNotFoundError":
      return res.status(404).json({ message: 'User Not Found... Please try again.' });

    default:
      return res.status(500).json({ message: 'Internal Server Error.' });
  }

  }
};
 //   --- GET Mthod w/ ID -----

const getContactById = (req, res) =>{
  //try catch block
  try {
    //defien/trget ID 
    const contactId = parseInt(req.params.id);

      //Need to Validate ------->>>> 
    if(isNaN(contactId)){
      return res.status(400).json({message:'Invalid Inoput for ID filed --> try a valid input again.'})
    };

    //fecth contac by ID
    const contact = ContactModel.get(contactId);

    //---> New Validaiton
    if(!contact){
      throw new Error('ContactNotFoundError');
    }

    //status code for prgress - 200 b/c displays info instead of just informing 201
    res.status(200).json(contact);


  } catch (error) {
    //swtich case blocks
    
    switch(error.name){

      case 'ContactNotFoundError':
        return res.status(404).json({message: 'User Not Found... Please try again.'});
      case 'InvalidContactError':
        return res.status(400).json({message: 'Somethings wrong with your request. Please try again.'})
      default:
        return res.status(500).json({message: 'Internal Server Error.'})
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

    //resposne stasus for succes ==> 303: after new submit --> redirect to new created Contact endpoint
    
    res.status(303)
      .set('Location', `/contacts/${newContact.id}`)
      .json({
        message: 'Contact created successfully',
        id: newContact.id,
        contact: newContact,
      });  
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
    switch(error.name){
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

//Export statemtns for Jest

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};


