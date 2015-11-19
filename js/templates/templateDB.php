<div class="row">
<tabset>
<tab heading="Get Aircrafts">
    <a ng-click="getAll('aircrafts')">Fetch</a>
    <div id="aircrafts"></div>
</tab>
<tab heading="Get Destinations">
    <a ng-click="getAll('destinations')">Fetch</a>
    <div id="destinations"></div>
</tab>
<tab heading="Get Airports">
    <a ng-click="getAll('airports')">Fetch</a>
    <div id="airports"></div> 
</tab>
<tab heading="Get Price Categories">
    <a ng-click="getAll('categories')">Fetch</a>
    <div id="categories"></div>  
</tab>
<tab heading="Flight Schedule">
    <form>
		<small>TF-CNA, KEF</small><br>
		Flight Number: <input type="text" id="sc_id"><br>
		Starting Airport: <input type="text" id="sc_oa">
		<a ng-click="getAll('flightSchedule')">Fetch</a>
	</form>
	<div id="flightSchedule"></div>
</tab>
<tab heading="Aircraft Management">
      <form>
      	<select ng-model="crud_aircraft" id="acSelect_type">
      		<option value="create">Create</option>
      		<option value="update">Update</option>
      		<option value="delete">Delete</option>
      	</select>
		<span>Aircraft ID: </span><input type="text" id="ac_id"><br>
		<span ng-show="crud_aircraft=='create'||crud_aircraft=='update'">Aircraft Type: </span><input ng-show="crud_aircraft=='create'||crud_aircraft=='update'" type="text" id="ac_type"><br>
		<span ng-show="crud_aircraft=='create'||crud_aircraft=='update'">Aircraft Name: </span><input ng-show="crud_aircraft=='create'||crud_aircraft=='update'" type="text" id="ac_name"><br>
		<span ng-show="crud_aircraft=='create'">Max Seats: </span><input ng-show="crud_aircraft=='create'" type="text" id="ac_max_seats"><br>
		<span ng-show="crud_aircraft=='create'">Seats Per Row: </span><input ng-show="crud_aircraft=='create'" type="text" id="ac_seats_row"><br>
		<a ng-click="crudAircraft(crud_aircraft)">Perform</a>
	</form>
</tab>
<tab heading="Price Category Management">
      <form>
      			<span ng-show="crud_categories=='update'||crud_categories=='create'">Possibility of Refund: </span><select ng-model="crud_categories" id="ctSelect_type">
      		<option value="create">Create</option>
      		<option value="update">Update</option>
      		<option value="delete">Delete</option>
      	</select>
		<span>Category Name: </span><input type="text" id="ct_name"><br>
		<span ng-show="crud_categories=='update'">Category Name, Old: </span><input ng-show="crud_categories=='update'" type="text" id="ct_old_name"><br>
		<span ng-show="crud_categories=='update'||crud_categories=='create'">Valid From Year Month Day: </span><input ng-show="crud_categories=='update'||crud_categories=='create'" type="date" id="ct_from"><br>
		<span ng-show="crud_categories=='update'||crud_categories=='create'">Valid To Year Month Day: </span><input ng-show="crud_categories=='update'||crud_categories=='create'" type="date" id="ct_to"><br>
		<span ng-show="crud_categories=='update'||crud_categories=='create'">Minimal Price: </span><input ng-show="crud_categories=='update'||crud_categories=='create'" type="text" id="ct_price"><br>
		<select ng-show="crud_categories=='update'||crud_categories=='create'" id="ct_refund">
      		<option value="0">No</option>
      		<option value="1">Yes</option>

      	</select>
		<span ng-show="crud_categories=='update'||crud_categories=='create'">Restricted Seats: </span><input ng-show="crud_categories=='update'||crud_categories=='create'" type="text" id="ct_restrict"><br>
		<span ng-show="crud_categories=='update'||crud_categories=='create'">Class ID: </span><input ng-show="crud_categories=='update'||crud_categories=='create'" type="text" id="ct_class_id"><br>
		<a ng-click="crudPriceCategories(crud_categories)">Perform</a>
	</form>
</tab>
<tab heading="Booking">
      <form>
      	<span>Flight Number:</span><input type="text" id="booking_flight_num">
      	<span>Flight Date:</span><input type="date" id="booking_flight_date">
      	<select id="booking_class_id">
      		<option value="1">First</option>
      		<option value="2">Business Class</option>
      		<option value="3">Economy Class</option>
      	</select>
      	<span>Card Owner Name:</span>
      	<input type="text" id="booking_card_name">
      	<select id="booking_card_issue">
      		<option value="VISA">VISA</option>
      		<option value="American Express">American Express</option>
      		<option value="Mastercard">Mastercard</option>
      		<option value="Diners Club">Diners Club</option>
      	</select>
      	<span>Passenger ID / Name / Price ID / Booking Number</span><br>
      	<small>'IS934671;Margrét Benediktsdóttir;4;3273;IS916472;Sigurður Egilsson;4;3274;IS295715;Guðmundur Sigurðsson;4;3283;IS883461;Þuríður Sigurðardóttir;4;3284;'</small>
      	<input type="text" ng-model="booking_passengers">

      	
		<a ng-click="Booking()">Perform</a>
	</form>
</tab>
</tabset>
<hr>
</div>
