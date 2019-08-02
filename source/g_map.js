/**
 * Google map functions to control a map location, add marker, add information window, draw line and area, get location of address and get address from location.<p></p>
 * @author Khaled Hassan
 * @category Map.
 * @link khaled.h.developer@gmail.com
 */
var gMap = {
    /**
     * <b>map</b> object <br> The google map handler to use in control, get data and set data.
     */
    map: '',
    /**
     * <b>infoCounter</b> int <br> The counter of information windows to make name with this counter.
     */
    infoCounter: 0,
    /**
     * <b>infowindow</b> object <br> The information window object define one time on load to can handle all information windows in one object and on event listener to can close any informaton window when open another one.
     */
    infowindow: '',
    /**
     * <b>infoCounter</b> object <br> The geocoder object used for working with address.
     */
    geocoder: '',
    /**
     * Creat google map with specific latitude and longitude.
     * @param divContain string <br> The div id to creat map inside it. <p></p>
     * @param latitude float <br> The latitude coordinator. <p></p>
     * @param longitude float <br> the longitude coordinator. <p></p>
     * @param zoomLevel int [optional] <br> The map zoom level value between 1 and 23 <br> defualt value is 3. <p></p>
     * @param mapType string [optional] <br> The map type value is 'ROADMAP' or 'SATELLITE' another value is ignored and set value to 'ROADMAP'. <p></p>
     * @return object <br> The map object handler.
     */
    loadMap: function (divContain, latitude, longitude, zoomLevel, mapType) {
        if (divContain === undefined) {
            return false;
        }
        var mapDiv = document.getElementById(divContain);

        if (latitude === undefined) {
            latitude = 0;
        }
        if (longitude === undefined) {
            longitude = 0;
        }
        if (zoomLevel === undefined || zoomLevel < 1 || zoomLevel > 23) {
            zoomLevel = 3;
        }
        mapType = mapType.toUpperCase();
        if (mapType === undefined) {
            mapType = 'ROADMAP';
        } else if (mapType !== 'ROADMAP' && mapType !== 'SATELLITE') {
            mapType = 'ROADMAP';
        }

        if (mapType === 'ROADMAP') {
            mapType = google.maps.MapTypeId.ROADMAP;
        } else if (mapType === 'SATELLITE') {
            mapType = google.maps.MapTypeId.SATELLITE;
        }
        var latlng = new google.maps.LatLng(latitude, longitude);
        options = {
            center: latlng,
            zoom: zoomLevel,
            mapTypeId: mapType
        };

        this.map = new google.maps.Map(mapDiv, options);
        this.infowindow = new google.maps.InfoWindow();
        this.geocoder = new google.maps.Geocoder();
        return this.map;
    },
    /**
     * get the current map center coordinator.
     * @return array <br> The array have coordinator like [latitude, longitude].
     */
    getMapCenter: function () {
        var mapObject = this.map;

        var center = mapObject.getCenter();
        var latlng = [];
        latlng.push(center.lat());
        latlng.push(center.lng());
        return latlng;
    },
    /**
     * Set the center of map to new latitude and longitude coordinator.
     * @param latitude float <br> The latitude coordinator. <p></p>
     * @param longitude float <br> the longitude coordinator. <p></p>
     * @return null.
     */
    setMapCenter: function (Latitude, Longitude) {
        if (Latitude === undefined) {
            Latitude = 0;
        }
        if (Longitude === undefined) {
            Longitude = 0;
        }
        var mapObject = this.map;

        mapObject.setCenter(new google.maps.LatLng(Latitude, Longitude));
    },
    /**
     * Get the current map zoom level.
     * @return int <br> The current map zoom level between 1 and 23.
     */
    getMapZoom: function () {
        var mapObject = this.map;

        return mapObject.getZoom();
    },
    /**
     * Set the zoom level of map.
     * @param zoomLevel int <br> The map zoom level value between 1 and 23. <p></p>
     * @return null.
     */
    setMapZoom: function (zoomLevel) {
        var mapObject = this.map;

        zoomLevel = parseInt(zoomLevel);
        if (zoomLevel === undefined || zoomLevel < 1) {
            zoomLevel = 1;
        }
        if (zoomLevel > 23) {
            zoomLevel = 23;
        }

        mapObject.setZoom(zoomLevel);
    },
    /**
     * Get the current map view type.
     * @return string <br> The map type value 'ROADMAP' or 'SATELLITE'.
     */
    getMapType: function () {
        var mapObject = this.map;

        return mapObject.getMapTypeId();
    },
    /**
     * Set the map view type.
     * @param mapType string <br> The map type value is 'ROADMAP' or 'SATELLITE' another value is ignored and set value to 'ROADMAP'. <p></p>
     * @return null.
     */
    setMapType: function (mapType) {
        var mapObject = this.map;

        mapType = mapType.toUpperCase();
        if (mapType === undefined) {
            mapType = 'ROADMAP';
        } else if (mapType !== 'ROADMAP' && mapType !== 'SATELLITE') {
            mapType = 'ROADMAP';
        }

        if (mapType === 'ROADMAP') {
            mapObject.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        } else if (mapType === 'SATELLITE') {
            mapObject.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        }
    },
    /**
     * Get the user position coordinator.
     * @param callFunction string <br> The function name to call after finish get position <br> this function have a code to woork with this postion (save in database, show on map, ...). <p></p>
     * @return null <br> but call the function and send position as a parameter.
     */
    getCurrentPostion: function (callFunction) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude.toFixed(12), lng = position.coords.longitude.toFixed(12);
                position = [lat, lng];

                if (callFunction !== undefined) {
                    window[callFunction](position);
                }
            });
        }
    },
    /**
     * Get the user position coordinator and set the center of map.
     * @param zoomLevel int <br> The map zoom level value between 1 and 23 <br> defualt value is 18. <p></p>
     * @return null.
     */
    loadCurrentPostion: function (zoomLevel) {
        var mapObject = this.map;

        zoomLevel = parseInt(zoomLevel);
        if (zoomLevel === undefined || zoomLevel < 1 || zoomLevel > 23) {
            zoomLevel = 18;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude.toFixed(12), lng = position.coords.longitude.toFixed(12);
                gMap.setMapCenter(lat, lng, mapObject);
                gMap.setMapZoom(zoomLevel, mapObject);
            });
        }
    },
    /**
     * Get the user position coordinator and set the center of map.
     * @param zoomLevel int <br> The map zoom level value between 1 and 23 <br> defualt value is 18. <p></p>
     * @param icon string [optional] <br> The url to PNG icon want show as marker <br> if not send will mark in default google marker. <p></p>
     * @return null.
     */
    markCurrentPosition: function (zoomLevel, icon) {
        zoomLevel = parseInt(zoomLevel);
        if (zoomLevel === undefined || zoomLevel < 1 || zoomLevel > 23) {
            zoomLevel = 18;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude.toFixed(12), lng = position.coords.longitude.toFixed(12);
                gMap.setMapCenter(lat, lng);
                gMap.setMapZoom(zoomLevel);
                gMap.addMarkerWithInfo(lat, lng, 'Your current postion', icon, 'Your current postion');
            });
        }
    },
    /**
     * Add marker to map with specific latitude and longitude.
     * @param latitude float <br> The latitude coordinator. <p></p>
     * @param longitude float <br> the longitude coordinator. <p></p>
     * @param title string [optional] <br> The short title of the markser show when stop mouse on the marker. <p></p>
     * @param icon string [optional] <br> The url to PNG icon want show as marker <br> if not send will mark in default google marker. <p></p>
     * @return object <br> The marker object handler.
     */
    addMarker: function (latitude, longitude, title, icon) {
        var mapObject = this.map;
        if(title !== undefined){
            title = '';
        }
        
        var marker;
        if (icon !== undefined && icon !== '') {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: mapObject,
                title: title,
                icon: icon
            });
        } else {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: mapObject,
                title: title
            });
        }

        return marker;
    },
    /**
     * Add information windoe (opened when user click on marker) to specific marker object.
     * @param marker object <br> The marker object handler. <p></p>
     * @param infoContent string <br> The HTML content of the information window. <p></p>
     * @return null.
     */
    addInfoWindow: function (marker, infoContent) {
        var mapObject = this.map;

        this.infoCounter++;
        var infoCounter = this.infoCounter;
        (function (infoCounter, marker, infoContent) {
            google.maps.event.addListener(marker, 'click', function () {
                gMap.infowindow.setContent(infoContent);
                gMap.infowindow.open(mapObject, marker);
            });
        })(infoCounter, marker, infoContent);
    },
    /**
     * Add marker have the information window (opened when user click on marker) to map with specific latitude and longitude.
     * @param latitude float <br> The latitude coordinator. <p></p>
     * @param longitude float <br> the longitude coordinator. <p></p>
     * @param title string [optional] <br> The short title of the markser show when stop mouse on the marker. <p></p>
     * @param infoContent string <br> The HTML content of the information window. <p></p>
     * @param icon string [optional] <br> The url to PNG icon want show as marker <br> if not send will mark in default google marker. <p></p>
     * @return object <br> The marker object handler.
     */
    addMarkerWithInfo: function (Latitude, Longitude, title, infoContent, icon) {
        var mapObject = this.map;

        if (!title) {
            title = '';
        }

        var marker;
        if (icon !== undefined) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(Latitude, Longitude),
                map: mapObject,
                title: title,
                icon: icon
            });
        } else {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(Latitude, Longitude),
                map: mapObject,
                title: title
            });
        }

        this.infoCounter++;
        var infoCounter = this.infoCounter;
        (function (infoCounter, marker, infoContent) {
            google.maps.event.addListener(marker, 'click', function () {
                gMap.infowindow.setContent(infoContent);
                gMap.infowindow.open(mapObject, marker);
            });
        })(infoCounter, marker, infoContent);
        
        return marker;
    },
    /**
     * Add group markers to map from array.
     * @param jsonMarker array <br> The latitude coordinator. <p></p>
     * @param icon string [optional] <br> The url to PNG icon want show as marker <br> if not send will mark in default google marker. <p></p>
     * @param infoWindowFunction string <br> The function name to make HTML content of information window. <p></p>
     * @return null.
     */
    addGroupMarker: function (jsonMarker, icon, infoWindowFunction) {
        for (var counter = 0; counter < jsonMarker.length; counter++) {
            var item = jsonMarker[counter], lat = item.lat, lng = item.lng, title = item.title;

            if (infoWindowFunction !== undefined && infoWindowFunction !== '') {
                var infos = item.info;
                var infoContent = window[infoWindowFunction](infos);

                gMap.addMarkerWithInfo(lat, lng, title, icon, infoContent);
            } else {
                gMap.addMarker(lat, lng, title, icon);
            }
        }
    },
    /**
     * Draw line form point 1 to point 2 on map.
     * @param point1Latitude float <br> The latitude coordinator for point 1. <p></p>
     * @param point1Longitude float <br> the longitude coordinator for point 1. <p></p>
     * @param point2Latitude float <br> The latitude coordinator for point 2. <p></p>
     * @param point2Longitude float <br> the longitude coordinator for point 2. <p></p>
     * @param color string [optional] <br> The color in hexadecimal like CSS color '#ff aa 51' <br> the defualt color is <b>Red</b> '#f00'. <p></p>
     * @return null.
     */
    drawLine: function (point1Latitude, point1Longitude, point2Latitude, point2Longitude, color) {
        var mapObject = this.map;
        if (color === undefined) {
            color = '#f00';
        }
        var route = [
            new google.maps.LatLng(point1Latitude, point1Longitude),
            new google.maps.LatLng(point2Latitude, point2Longitude)
        ];

        var polyline = new google.maps.Polyline({
            path: route,
            strokeColor: color,
            strokeOpacity: 0.7,
            strokeWeight: 3
        });

        polyline.setMap(mapObject);
    },
    /**
     * Draw area between multipoint minimum is 3 point.
     * @param cornerPoints array <br> The multidimension array have coordinators like [[lat1, lng1], [lat2, lng2], ....]. <p></p>
     * @param color string [optional] <br> The color in hexadecimal like CSS color '#ff aa 51' <br> the defualt color is <b>Blue</b> '#00f'. <p></p>
     * @return null.
     */
    drawArea: function (cornerPoints, color) {
        var mapObject = this.map;
        if (color === undefined) {
            color = '#00f';
        }
        var points = [];
        for (var i = 0; i < cornerPoints.length; i++) {
            points.push(new google.maps.LatLng(cornerPoints[i][0], cornerPoints[i][1]));
        }

        var polygon = new google.maps.Polygon({
            paths: points,
            map: mapObject,
            strokeColor: '#0000ff',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillColor: '#0000ff',
            fillOpacity: 0.35
        });
    },
    /**
     * Get location coordinator of specific address.
     * @param address string <br> The address want get its location. <p></p>
     * @param zoomLevel int <br> The map zoom level value between 1 and 23 <br> defualt value is 16. <p></p>
     * @param markPostion bool <br> Add marker to this address location or not <br> defualt value is false. <p></p>
     * @param callFunction string <br> The function name to call after finish get position <br> this function have a code to woork with this postion (save in database, show on map, ...). <p></p>
     * @return null.
     */
    getAddressLocaiton: function (address, zoomLevel, markPostion, callFunction) {
        var geocoder = this.geocoder;

        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat(), lng = results[0].geometry.location.lng();
                var position = [lat, lng];

                gMap.setMapCenter(lat, lng);
                zoomLevel = parseInt(zoomLevel);
                if (zoomLevel === undefined || zoomLevel < 1 || zoomLevel > 23) {
                    zoomLevel = 16;
                }
                gMap.setMapZoom(zoomLevel);

                if (markPostion !== undefined && markPostion === true) {
                    gMap.addMarker(lat, lng, 'Your address');
                }

                if (callFunction !== undefined && callFunction !== '') {
                    window[callFunction](position);
                }
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },
    /**
     * Get address of specific location coordinator.
     * @param latitude float <br> The latitude coordinator. <p></p>
     * @param longitude float <br> the longitude coordinator. <p></p>
     * @param zoomLevel int <br> The map zoom level value between 1 and 23 <br> defualt value is 16. <p></p>
     * @param markPostion bool <br> Add marker to this location or not <br> defualt value is false. <p></p>
     * @param callFunction string <br> The function name to call after finish get position <br> this function have a code to woork with this postion (save in database, show on map, ...). <p></p>
     * @return null.
     */
    getLocationAddress: function (latitude, longitude, zoomLevel, markPostion, callFunction) {
        var geocoder = this.geocoder;

        var latlng = {lat: latitude, lng: longitude};
        geocoder.geocode({'location': latlng}, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var address = results[0].formatted_address;
                    gMap.setMapCenter(latitude, longitude);
                    zoomLevel = parseInt(zoomLevel);
                    if (zoomLevel === undefined || zoomLevel < 1 || zoomLevel > 23) {
                        zoomLevel = 16;
                    }
                    gMap.setMapZoom(zoomLevel);

                    if (markPostion !== undefined && markPostion === true) {
                        gMap.addMarkerWithInfo(latitude, longitude, 'Location', '', address);
                    }

                    if (callFunction !== undefined && callFunction !== '') {
                        window[callFunction](address);
                    }
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
};