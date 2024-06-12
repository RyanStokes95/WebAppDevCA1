function loadXMLDoc(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            callback(xmlDoc);
        }
    };
    xhr.send();
}

function parseXML(xmlDoc) {
    var products = xmlDoc.getElementsByTagName("product");
    var productList = [];

    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        var category = product.getElementsByTagName("category")[0].textContent;
        var code = product.getElementsByTagName("code")[0].textContent;
        var name = product.getElementsByTagName("name")[0].textContent;
        var description = product.getElementsByTagName("description")[0].textContent;
        var quantity = parseInt(product.getElementsByTagName("quantity")[0].textContent);
        var price = parseFloat(product.getElementsByTagName("price")[0].textContent);

        var productObj = {
            category: category,
            code: code,
            name: name,
            description: description,
            quantity: quantity,
            price: price
        };

        productList.push(productObj);
    }
    return productList;
}

function searchDisplay(code, array) {
    for (let i = 0; i < array.length; i++) {
        var product = array[i];
        if (code == product.code) {
            var xmlSection = document.getElementById("xml-file");
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