onclick="processDoc(document.getElementById('urlentry').value);"



			// ITEMIZED RECEIPT CONTENT
			var Event = "Event: " + json["name"];
			var Venue = "Venue: " + json["venue"]["name"];
			var Guests = "Guests: " + json["number_of_guests"];
			var date = "Date: " + json["starts_at"].split("T")[0];
			var Time = "Time: " + json["starts_at"].split("T")[1];

			//TODO THIS PART IS HARDCODED, NEED TO WRITE LOOP (MENU ITEMS)
			var Menu1Desc = json["line_items"][0]["name"];
			var Menu2Desc = json["line_items"][1]["name"];
			var Menu3Desc = json["line_items"][2]["name"];

			var Menu1Quant = json["number_of_guests"];
			var Menu2Quant = json["number_of_guests"];
			var Menu3Quant = json["number_of_guests"];

			var Menu1UPrice = json["line_items"][0]["unit_price"];
			var Menu2UPrice = json["line_items"][1]["unit_price"];
			var Menu3UPrice = json["line_items"][2]["unit_price"];

			var Menu1SubTotal = json["line_items"][0]["cost"];
			var Menu2SubTotal = json["line_items"][1]["cost"];
			var Menu3SubTotal = json["line_items"][2]["cost"];

			var TaxRate = "Tax (" + ((number(json["sales_tax_rate"])*100).toString()) + "%)";
			var GratuityRate = "Gratuity (" + ((number(json["gratuity_rate"])*100).toString()) + "%)";

			var MenuTotalTaxes = json["total_taxes"];
			var MenuTotalGratuity = json["total_gratuity"];

			var MenuTotal = "$" + json["total_cost"];


			//PAYMENTS
			var DepDesc = "Description: Deposit";
			var DepDate = "Date: " + json["payments"][0]["paid_at"] ;
			var DepAmount = "Amount: $" + json["total_deposit"];
			var DepMethod = "Payment Method: " + json["payments"][0]["credit_card"]["brand"];

			//INCOMPLETE ESPECIALLY WITH DATE
			var FinDesc = "Description: Final Payment";
			var FinDate = "Date: " + json["payments"][0]["paid_at"] ;
			var FinAmount = "Amount: $" + json["total_remaining"];
			var FinMethod = "Payment Method: " + json["payments"][0]["credit_card"]["brand"];