<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width">
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?callback=initMap&key=AIzaSyCh0q-Zax9jO-n1jfDrVC3kDfTYFmd-2p4"></script>
        <script type="text/javascript" src="source/g_map.js"></script>
        <style>
            #map{
                width: 800px;
                height:450px;
                margin: 10px auto;
            }
            #control{
                width: 770px;
                margin: 0 auto;
                padding: 20px;
            }
            #control button{
                display: inline-block;
                margin: 5px auto;
            }
            #address{
                width: 100%;
            }
            #showData{
                padding: 10px 25px;
            }
        </style>
    </head>
    <body>
        <div id="map" style=""></div>
        <div id="control" style="">
            <input type="text" id="address"><br>
            <button onclick="getMapData()">Get map data</button>
            <button onclick="setMapData()">Set map data</button>
            <button onclick="MarkCurrentPosition()">Mark your position</button>
            <button onclick="setMarker1()">Marker 1</button>
            <button onclick="setMarker2()">Marker 2</button>
            <button onclick="setMarkerInfo()">Marker & Info window</button>
            <button onclick="setMarkerWithInfo()">Marker with Info</button>
            <button onclick="callDrawLine()">Draw line</button>
            <button onclick="callDrawArea()">Draw area</button>
            <button onclick="getAddressLocation()">Get location from address</button>
            <button onclick="getLocationAddress()">Get address from location</button>
            <button onclick="groupMarker();">Mark group</button>
        </div>
        <div id="showData"></div>
    </body>
</html>
<script>
    gMap.loadMap('map', 27.85731510051323, 32.02388397652442, 6, 'ROADMAP');

    function getMapData() {
        var msg = 'location: ' + gMap.getMapCenter()[0] + ', ' + gMap.getMapCenter()[1] + '<br>Zoom: ' + gMap.getMapZoom() + '<br>Type: ' + gMap.getMapType();
        document.getElementById('showData').innerHTML = msg;
    }

    function setMapData() {
        gMap.setMapCenter(30.014300199999997, 31.280144299999996);
        gMap.setMapZoom(20);
    }

    function MarkCurrentPosition() {
        gMap.markCurrentPosition(18, 'img/sun.png');
//        gMap.setMapType('SATELLITE');
    }

    function setMarker1() {
        gMap.addMarker(30.004300199999999, 31.700144299999997, 'New mark 1', '');
        gMap.setMapCenter(30.004300199999999, 31.700144299999997);
        gMap.setMapZoom(14);
        gMap.setMapType('ROADMAP');
    }

    function setMarker2() {
        gMap.addMarker(30.814300199999999, 31.680144299999997, 'New mark 2', '');
        gMap.setMapCenter(30.814300199999999, 31.680144299999997);
        gMap.setMapZoom(14);
        gMap.setMapType('ROADMAP');
    }

    function setMarkerInfo() {
        var marker = gMap.addMarker(30.614300199999999, 31.180144299999997, 'New mark 3', '');
        gMap.addInfoWindow(marker, '<h3>Info window test 1</h3><img src="img/image1.jpg"><p>Just description here</p>');
        gMap.setMapCenter(30.614300199999999, 31.180144299999997);
        gMap.setMapZoom(14);
    }

    function setMarkerWithInfo() {
        gMap.addMarkerWithInfo(30.314300199999999, 31.480144299922222, 'New mark 4', '<h3>Info window test 1</h3><p><a href="http://google.com">link to google search</a></p>');
        gMap.setMapCenter(30.314300199999999, 31.480144299922222);
        gMap.setMapZoom(14);
    }

    function callDrawLine() {
        gMap.drawLine(30.014300199999999, 31.380144299922222, 30.114300199991111, 31.280144299911111, '#00f');
        gMap.setMapCenter(30.064036437005843, 31.334731234840998);
        gMap.setMapZoom(11);
    }

    function callDrawArea() {
        var points = makeArray(4, 2);
        points[0][0] = 30.014300199999997;
        points[0][1] = 31.280144299991111;
        points[1][0] = 30.114300199991111;
        points[1][1] = 31.280144299911111;
        points[2][0] = 30.714300199999999;
        points[2][1] = 31.480144299999997;
        points[3][0] = 30.333300199991111;
        points[3][1] = 31.590144299911111;

        gMap.drawArea(points, '#00f');
        gMap.setMapCenter(30.417073653760976, 31.404196874486612);
        gMap.setMapZoom(9);
    }

    function getAddressLocation() {
        gMap.getAddressLocaiton(document.getElementById('address').value, 16, true, 'showAddressLocation');
    }

    function showAddressLocation(postion) {
        var msg = 'Address: ' + document.getElementById('address').value + '<br>latitude: ' + postion[0] + '<br>longitude: ' + postion[1];
        document.getElementById('address').value = '';
        document.getElementById('showData').innerHTML = msg;
    }

    function getLocationAddress() {
        gMap.getLocationAddress(30.014300199999997, 31.280144299991111, 16, true, 'showLocationAddress')
    }

    function showLocationAddress(address) {
        var msg = 'Address: ' + address;
        document.getElementById('showData').innerHTML = msg;
    }

    function makeArray(row, column) {
        var arr = new Array(row);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(column);
        }

        return arr;
    }




    function getHTTPObject() {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        return xhr;
    }

    function groupMarker() {
        var request = getHTTPObject();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var jsndata = request.responseText;
                jsndata = JSON.parse(jsndata);
                var object = jsndata.marker;
                gMap.addGroupMarker(object, '', 'fillInfoWindow');
                gMap.setMapCenter(30.079680968915778, 31.325943704785136);
                gMap.setMapZoom(11);
            }
        };

        request.open("GET", "markers.json", true);
        request.send(null);
    }

    function fillInfoWindow(jsonInfo) {
        var infos = '<h3>' + jsonInfo.lbl + '</h3>' + '<img src="' + jsonInfo.img + '"><a href="' + jsonInfo.lnk + '">Your link</a>';
        return infos;
    }
</script>