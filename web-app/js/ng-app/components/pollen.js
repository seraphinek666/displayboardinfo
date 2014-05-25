/**
 * 
 */
$.ajax({
    url: 'proxy.php',
    type: 'POST',
    data: {
        address: 'https://www.kichacze.pl/Serwis_pylkowy/mapa_pylen.aspx?ID=6'
    },
    success: function(response) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(xmlString, "text/xml");
    var wut = '';
    }
});