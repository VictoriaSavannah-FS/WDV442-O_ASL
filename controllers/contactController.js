//Setup up my Controller --> 
//where all my CRUD / HTTP methods will be 
//
//NEED KEY FEATURES:
//[1] Pagination
//[2] Sorting
//[3] Filtering
//---most logic will occur w/i the @jworman libray! 
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
  }
  

}


