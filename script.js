function loadXMLDoc(url, callback){
    //Creation of XMLHttpRequest object to pull data from xml file
    var xhr = new XMLHttpRequest();
    /*XMLHttpRequest open method
    GET sends a request to the server for information
    info.xml is the xml files relative location
    true specifies that the request runs asynchronously(Does not wait for a response to continue)
    */
    xhr.open("GET", url, true);
    //onreadystatechange triggers when there is a change in the ready state of the xhr object(ie. 3 = Loading, 4 = Done)
    xhr.onreadystatechange = function(){
            //Statement triggers when ready state is done(readyState == 4) and the status of the request is successful(status == 200)
            if (xhr.readyState == 4 && xhr.status == 200) {
                
                var xmlDoc = xhr.responseXML
                callback(xmlDoc)

            }
    };
    xhr.send();
}

function parseXML(xmlDoc) {
    //Retrieves all the product nodes from the XML doc and assigns them to a variable
    var products = xmlDoc.getElementsByTagName("product");
    //Creating the array the product objects will be stored in 
    var productList = [];

    //A loop which stores the product objects from the data parsed from the XML file
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        //Retrieving and storing the data from the parsed XML data in variables
        var category = product.getElementsByTagName("category")[0].textContent;
        var code = product.getElementsByTagName("code")[0].textContent;
        var name = product.getElementsByTagName("name")[0].textContent;
        var description = product.getElementsByTagName("description")[0].textContent;
        var quantity = parseInt(product.getElementsByTagName("quantity")[0].textContent);
        var price = parseFloat(product.getElementsByTagName("price")[0].textContent);

        //Object Creation
        var productObj = {
            category: category,
            code: code,
            name: name,
            description: description,
            quantity: quantity,
            price: price
        };

        //Storing the Object in the Array
        productList.push(productObj);
    }
    return productList;
}

//Function which searches for the product code and returns the product info if it is found
function searchDisplay(code, array) {
    //Loop which iterates through the products array
    for (let i = 0; i < array.length; i++) {
        var product = array[i];
        //If statement which checks if the entered code matches the code of the product being iterated over
        if (code == product.code) {
            var xmlSection = document.getElementById("xml-file");
            //Product info which is inserted into the DOM
            var productInfo = `
                <div>
                    <h3>${product.name}</h3>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Code:</strong> ${product.code}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Quantity:</strong> ${product.quantity}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                </div>
            `;
            xmlSection.innerHTML = productInfo;
        }
    }
}

//Code which acivates the the above functions on page load
window.onload = function() {
    loadXMLDoc("info.xml", function(xmlDoc) {
        var productList = parseXML(xmlDoc);

        // Search functionality
        var searchBox = document.getElementById("search-xml");
        var searchButton = document.getElementById("search-button");

        searchButton.addEventListener("click", function() {
            var searchCode = searchBox.value;
            searchDisplay(searchCode, productList);
        })
    })
}