var utils = {
    getGML: function(response){
        if (response.substr(0,2) != '--') {
            return response;
        }
        // nel caso di rispote multiparte proviamo ad estrarre il GML
        var gmlTag1 = new RegExp("<([^ ]*)FeatureCollection");
        var gmlTag2 = new RegExp("<([^ ]*)msGMLOutput");
        var parts = response.split(new RegExp('\r\n--'));
        
        for (var i=0; i<parts.length; i++) {
            var part = parts[i];
            var isGmlPart = false;
            isGmlPart = part.search(gmlTag1) > -1 ? true : part.search(gmlTag2) > -1 ? true : false;
            if (isGmlPart) {
                var gml = part.substr(part.indexOf("<?xml"));
                return gml;
            }
        }
    },
    
    getProxiedUrl: function(url, proxyBaseUrl) {
        return proxyBaseUrl + encodeURIComponent(url);
    }
};