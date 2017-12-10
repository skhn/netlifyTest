function processDoc(url) {
    
    
            if (url.split('/')[5] == undefined) {
                alert("Please Enter Valid URL!!");
            } else {
                var data = "https://" + url.split('/')[2] + "/api/bookings/" + url.split('/')[5]; //same domain
                //alert(data);
                //window.open(data);	opens new tab. used for html print
    
                //processJSON(data);

                sessionStorage.setItem('url', data);

                window.location.href = "./proposal.html" + "?id=" + url.split('/')[5] + "&domain=" + url.split('/')[2].split('.')[0];;
    
            }
    
    
        }
    
        function processLoc() {
    
            var url = window.location.href;
    
            try {
                var pid = url.split('?')[1];
            } catch (e) {
                // put normal stuff here...
            }
    
            // this block is to transcribe the input url into JSON api url
            if (pid != undefined) {
    
                try {
    
                    var id = (pid.split('&')[0].split('=')[1] != undefined) ? pid.split('&')[0].split('=')[1] : pid;
                    var domain = (pid.split('&')[1].split('=')[1] != undefined) ? pid.split('&')[1].split('=')[1] : "app";
                    var data = "https://" + domain + ".eventplicity.com/api/bookings/" + id;
    
                    document.getElementById("pressButton").onclick(processDoc(data));
                    // processJSON(data);
    
                } catch (e) {
                    //ReferenceError comes here. Seems harmless for now.
                }
            } else {
                return;
            }
    
        }