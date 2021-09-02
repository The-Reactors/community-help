import "../assets/css/style.css"
import "../assets/css/bootstrap/bootstrap.min.css"

const ticketCreationPage = () => {
    return ( 
 <div className="container">
    <div className="row">
      <div className="col-xl-8 mx-auto">
        {/* <!--Ticket Input Box--> */}
        <h2 className="text-center mt-4">Raise a ticket</h2>
        
        <div id="ticketBox">
          <div id="ticketBoxCenter">
            <label className="mt-3">Issue</label>
            <input id="mainIssue" className="form-control" />
            <label className="mt-3">Severity</label>
            <select id="severity" className="form-control">
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            <label className="mt-3">Issue Category</label>
            <select id="issue Category" className="form-control">
                <option>land issue
  </option>
                <option>water issue</option>
                <option>public health</option>
                <option>sanitation</option>
                <option>Pollution</option>
                <option>healthcare issue</option>
                <option>Electricity</option>
                <option>Road Blockage</option>
                <option>waste management</option>
                </select>
            <label className="mt-3">Phone Number</label>
            <input id="Phone number" className="form-control" type="number" />
            <label className="mt-3">Details</label>
            <textarea id="details" className="form-control" rows="2"></textarea>
            <div className="text-center">
              <p id="errMsg" className="text-center mt-2"></p>
              <button id="submitTicket" className="btn btn-secondary text-center mt-2">Submit</button>
            </div>
          </div>
          <p id="confirmation" className="text-center"></p>
          <div className="text-center">
            <button id="goBack" className="btn btn-secondary mt-3">Go Back</button>
          </div>
        </div>
  
        {/* <!--Ticket Status--> */}
        <div id="ticketBoxTwo" className="mt-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button id="searchTicketButton" className="btn btn-secondary" type="button">Search</button>
            </div>
            <input id="searchTicketInput" type="number" className="form-control" placeholder="Ticket Number" aria-label="Example text with button addon"/>
          </div>
          <p className="ticket text-center"></p>
          <p id="ticketStatus" className="text-center"></p>
          <div className="text-center">
            <button id="closeTicket" className="btn btn-primary mt-3" type="submit">Close</button>
            <button id="deleteTicket" className="btn btn-danger mt-3" type="submit">Delete</button>
          </div>
        </div>
      </div>
    </div>
  
</div> 

  );
}
 
export default ticketCreationPage ;