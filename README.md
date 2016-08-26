# Visualizing Chicago's Weather

View and interact with the first 11 months of temperature data from 2015 in Chicago, IL. 

* Backend = Node + Hapi
* Frontend = Angularjs
* Visualizations = d3.js
 
To build solution run the following command lines:
* npm install
* bower install
 
View the website:
* npm start
* navigate in browser to localhost:80

Send all API calls to:
* localhost:9000


Full test suite with Mocha, Karma, and protractor. Run the following npm commands to test solution:
* npm test (mocha + karma)
* npm test.e2e (protractor)

----
## API - Endpoints

* Temperature 
    * <code>GET</code> /temperatures?frequency=FREQ&measurement=MEAS&toDate=DATE&fromDate=DATE
* Menu:
    * <code>GET</code> /menus
* NOT USED: Implemented as empty methods on the Temperature API:
    * <code>GET</code> /temperatures/{date}
    * <code>PUT</code> /temperatures/{date}
    * <code>DELETE</code> /temperatures/{date}
    * <code>POST</code> /temperatures/{date}
    
----
## API - Description
### Temperature
  Returns all temperature data averages over min and max temperatures for a given frequency.

* **URL**

  /temperatures

* **Method:**

  `GET`

* **Query Params**

  ?frequency=FREQ&measurement=MEAS&toDate=DATE&fromDate=DATE
  * frequency => provide average measurement values by frequency - values: day, week, month - defaults to day
  * measurement => temperature measurements to return - values: min, max - defaults to both
  * fromDate => date to start at - format =>  milliseconds elapsed since the UNIX epoch -> defaults to Jan 1, 2015
  * toDate => date to end at - format =>  milliseconds elapsed since the UNIX epoch -> defaults to Nov 31, 2015
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ date : 1472234858642, min : 12.34, max: 15.34 }, { date : 1472234844444, min : 60.34, max: 75.34 }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No temperature values found" }`

--
### Menu
  Returns all menu items to dynamically render on the header object. Returns parsed customModules.js list.

* **URL**

  /menus

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `["temperature", "about"]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No menu items found" }`

--
### Temperature by Date - NOT IMPLEMENTED
  Empty Endpoints Setup as Example
  
  Returns all temperature measurements for a given date. Date format =>  milliseconds elapsed since the UNIX epoch 

* **URL**

  /temperatures/{date}

* **Method:**

   `GET` | `POST` | `DELETE` | `PUT`

* **Query Params**

  ?measurement=MEAS
  * measurement => temperature measurements to return - values: min, max - defaults to both

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ date : 1472234844444, min : 60.34, max: 75.34 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Temperature measurement(s) do not exist for the given date." }`
