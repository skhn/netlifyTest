window.onload = propLoad(); // Used in URL proposal loading method.
    
function processJSON(dat) { // Obtains JSON Required Data
    
        var json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': dat,
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();
    
        function dateFormat(date) { // Reformats to Local Time
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "^^" + strTime;
        }
    
        // variables for 
        try {
    
            var Event = json["name"];
            var Venue = json["venue"]["name"];
            var VenueName = json["venue"]["name"];
            var Guests = json["number_of_guests"];
            var date = dateFormat(new Date(json["starts_at"])).split("^^")[0];
            var Time = dateFormat(new Date(json["starts_at"])).split("^^")[1];
            var customerName = "\n" + (json["customer"]["name"] == null || json["customer"]["name"] == "" ? "" : json["customer"]["name"]);
            var customerPhone = (json["customer"]["phone_number"] == null || json["customer"]["phone_number"] == "" ? "" : json["customer"]["phone_number"]);
            var customerEmail = (json["customer"]["email"] == null || json["customer"]["email"] == "" ? "" : json["customer"]["email"]);
    
        } catch (e) {
            alert("Something went wrong here... venue details aren't loading quite right :(");
        }
    
    
        try {
    
            var myMap = new Map();
            myMap.set("facility rental", 0);
            myMap.set("appetizers", 1);
            myMap.set("hors d'oeuvres", 2);
            myMap.set("tapas", 3);
            myMap.set("food", 4);
            myMap.set("buffet", 5);
            myMap.set("catering stations", 6);
            myMap.set("dinner", 7);
            myMap.set("lunch", 8);
            myMap.set("brunch", 9);
            myMap.set("breakfast", 10);
            myMap.set("dessert", 11);
            myMap.set("drinks", 12);
            myMap.set("breakfast - packages", 13);
            myMap.set("breakfast - a la carte", 14);
            myMap.set("afternoon breaks", 15);
            myMap.set("lunch - packages", 16);
            myMap.set("hors d'oeuvre - packages", 17);
            myMap.set("hors d'oeuvres - a la carte", 18);
            myMap.set("dinner - packages", 19);
            myMap.set("starters - a la carte", 20);
            myMap.set("lunch mains - a la carte", 21);
            myMap.set("dinner mains - a la carte", 22);
            myMap.set("accompaniments - a la carte", 23);
            myMap.set("desserts - a la carte", 24);
            myMap.set("beverage - packages", 25);
            myMap.set("beverages - a la carte", 26);
            myMap.set("children's menu", 27);
            myMap.set("staff", 28);
            myMap.set("equipment", 29);
            myMap.set("services", 30);
            myMap.set("venue accounting: cancellations", 31);
            myMap.set("other", 32);
    
            var order = [];
    
            for (var i = 0; i < json["line_items"].length; i++) {
    
                var outObj = {};
                var inObj = {};
                inObj[i] = json["line_items"][i]["order"];
                outObj[myMap.get(json["line_items"][i]["grouping_key"])] = inObj;
                order.push(outObj);
            }
    
            order.sort(function(a, b) {
                return parseInt(Object.values(Object.values(b))) - parseInt(Object.values(Object.values(a)));
            });
    
            order.sort(function(a, b) {
                return parseInt(Object.keys(a)) - parseInt(Object.keys(b));
            });
    
    
            console.log(order);
            

            
            /*
                TODO: The following block represents the generation of the line items table on the itemized generator. It is basically a loop for the 
                selected line items that are sorted according to grouping keys.

                var table is a string object that stores a stringified representation of html code.

            */


            var table = "";
            for (var i = 0; i < json["line_items"].length; i++) {
    
                if (json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["selected"] == true) { // Object.keys(order[i][Object.keys(order[i])]) -- used in grouping key ordering.
    
                    table += "<tr>";
                    table += "<td>";
                    // line item name column 
                    table += json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["name"]; 
                    table += "</td>";
                    table += "<td>";
                    // line item unit price column

                    if (json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["unit_cost_type"] == null) {
                        table += "$" + json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["unit_cost"].toFixed(2);
                    } else if (json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["unit_cost_type"] == "guests") {
                        "$" + json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["unit_cost"] + " (100 GUESTS)";
                    } else {
                      table += "blah";
                    }

                    table += "</td>";
                    table += "<td>";
                    // line item quantity column
                    table += json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["quantity_type"] == null ? json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["quantity"] : json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["quantity"] + " " + json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["quantity_type"].toUpperCase();
                    table += "</td>";
                    table += "<td>";
                    // line item sub total column
                    table += json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["cost"] == 0 ? "$" + json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["cost"].toFixed(0) : "$" + json["line_items"][Object.keys(order[i][Object.keys(order[i])])]["cost"].toFixed(2);
                    table += "</td>";
                    table += "</tr>";
    
                }
    
            }
    
        } catch (e) {
            alert("Something went wrong here... menu items table isn't loading quite right :(");
            //alert(e);
        }
    
    // taxes block
        try {
    
            var STaxRate = "Tax (" + (json["sales_tax_rate"] * 100).toFixed(1) + "%)";
            var GratuityRate = "Gratuity (" + (json["gratuity_rate"] * 100).toFixed(1) + "%)";
    
            var MenuTotalSTaxes = "$" + json["total_sales_taxes"].toFixed(2);
            var MenuTotalGratuity = "$" + json["total_gratuity"].toFixed(2);
    
            var MenuTotal = "$" + json["total_cost"].toFixed(2);
    
    
            var SeTaxRate = json["second_tax_label"] + " (" + (json["second_tax_rate"] * 100).toFixed(1) + "%)";
            var MenuTotalSeTaxes = "$" + json["total_second_taxes"].toFixed(2);
    
        } catch (e) {
            alert("Something went wrong here... proposal Total and Tax table isn't loading quite right :(");
        }
    
    
    // payments block
        try {
    
            var payments = "";
    
            if (json["payments"].length == 0) {
                payments += "<div class = \"tablediv\"><div class = \"table table-bordered psubheadings\">";
                payments += "<div class = \"description\"><h5>";
                payments += "<strong>No Payments Made.</strong></h5>"
                payments += "</div></div></div>";
    
            } else {
    
                for (var i = json["payments"].length - 1; i >= 0; i--) {
                    payments += "<div class = \"table table-bordered psubheadings\">";
    
                    payments += "<div class = \"description\"><h5>";
                    payments += "<strong>Date: </strong></h5>" + dateFormat(new Date(json["payments"][i]["paid_at"])).split("^^")[0] + " " + dateFormat(new Date(json["payments"][i]["paid_at"])).split("^^")[1];
                    payments += "</div>";
    
                    payments += "<div ><h5>";
                    payments += "<strong>Amount: </strong></h5> $" + json["payments"][i]["amount"].toFixed(2);
                    payments += "</div>";
    
                    payments += "<div class = \"description\"><h5>";
                    payments += "<strong>Payment Method: </strong></h5>" + (json["payments"][i]["method"] == "credit_card" ? json["payments"][i]["credit_card"]["brand"] : json["payments"][i]["method"]);
                    payments += "</div>";
    
                    payments += "</div>";
    
                }
    
    
            }
    
        } catch (e) {
            alert("Something went wrong here... payments table isn't loading quite right :(");
            }

             // opens new blank html page
            var recpt = window.open("", "_self");
    
            // writes this html onto the blank html
            recpt.document.body.innerHTML = '<!DOCTYPE html><html><head> <title></title> <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"> </script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"> </script> <style type="text/css"> #bodydiv { margin-left: auto; margin-top: 15px; margin-right: auto; margin-bottom: 50px; } body { margin-top: 10mm; margin-bottom: 10mm;} #logo { padding-left: 5%; padding-right: 5%; text-align: left; } footer { text-align: center; position: relative; bottom: 0; width: 105%; padding-top: 5%; margin-left: -3%; } footer img { height: auto; width: 10%; } .heading { padding: 1.5% 5%; } .pheading { padding-left: 5%; padding-right: 5%; padding-top: -2%; padding-right: -2%; } .subheadings, .psubheadings { padding: 0% 5%; } .tablediv { padding-left: 5%; padding-right: 5%; padding-top: 1%; } .taxTable { padding-left: 50%; padding-right: 5%; padding-top: 1%; } .description { padding: 5% 0%; } h5, #imgDiv { display: inline; } .table .table-bordered .psubheadings { padding-left: 5%; padding-right: 5%; } .paymentTable { padding-left: 5%; padding-right: 40%; padding-top: 1%; } @page { size: auto; margin: 4mm; } #pic { height: auto; width: 15%; } .inputbox {float: right; margin-top: -1%; padding-right: 3%;} textarea {resize: none; width: 300px;} </style></head><body> <div id="bodydiv"> <div class="heading"> <h2>Itemized Receipt</h2> </div> <div id="logo"> <h3 id="title"> ' + VenueName + '</h3> </div> <div class="inputbox"> <div class="form-group"> <textarea class="form-control" rows="5" style="border: none;">Bill To: '+ customerName +'\n'+ customerPhone +'\n'+ customerEmail +'</textarea> </div> </div> <div class="subheadings"> <div> <h5 id="event"><strong>Event: </strong></h5>' + Event + '</div> <div> <h5 id="venue"><strong>Venue: </strong></h5>' + Venue + '</div> <div> <h5 id="guests"><strong>Guests: </strong></h5>' + Guests + '</div> <div> <h5 id="date"><strong>Date: </strong></h5>' + date + '</div> <div> <h5 id="time"><strong>Time: </strong></h5>' + Time + '</div> </div> <div class="tablediv"> <table class="table table-bordered" id="table"> <thead> <tr> <td><strong>Description</strong> </td> <td><strong>Unit Price</strong> </td> <td><strong>Quantity</strong> </td> <td><strong>Sub Total</strong> </td> </tr> </thead> <tbody>' + table + '</tbody> </table> </div> <div class="taxTable"> <table class="table table-bordered" id="taxTableId"> <tbody> <tr> <td>' + STaxRate + '</td> <td>' + MenuTotalSTaxes + '</td> </tr> <tr> <td>' + SeTaxRate + '</td> <td>' + MenuTotalSeTaxes + '</td> </tr> <tr> <td>' + GratuityRate + '</td> <td>' + MenuTotalGratuity + '</td> </tr> <tr> <td><strong>Total:</strong> </td> <td><strong>' + MenuTotal + '</strong> </td> </tr> </tbody> </table> </div> <div class="pheading"> <h3>Payments</h3> </div> <div class="paymentTable">' + payments + '</div> <footer>Powered by <img src="https://i.imgpile.com/nGyE2S.png" alt=" Eventplicity Inc." id="pic"> </footer></body></html>';
    
    
            // used for the purposes of printing
           document.title = Event + " - Itemized Receipt";
        }


        function propLoad() {

            var url = window.location.href;
            var pid = url.split('?')[1];

            var id = (pid.split('&')[0].split('=')[1] != undefined) ? pid.split('&')[0].split('=')[1] : pid;
            var domain = (pid.split('&')[1].split('=')[1] != undefined) ? pid.split('&')[1].split('=')[1] : "app";
            var data = "https://" + domain + ".eventplicity.com/api/bookings/" + id;
            
            processJSON(data)
            }
