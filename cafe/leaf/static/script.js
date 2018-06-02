let ajou_LatLng = new daum.maps.LatLng(37.2781752, 127.043913);
let selectedIw = null;
let map = create_map();
let markers = [];
let geocoder = new daum.maps.services.Geocoder();

function closeIw(clickedIw) {
    if (selectedIw != null) selectedIw.close();
    selectedIw = clickedIw;
}

function create_map() {
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: ajou_LatLng, // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
    mapContainer.addEventListener('click', function () {
        if (selectedIw == null) closeIw(selectedIw);
    });

    let m = new daum.maps.Map(mapContainer, mapOption);
    m.addControl(new daum.maps.ZoomControl(), daum.maps.ControlPosition.RIGHT);

    daum.maps.event.addListener(m, 'click', function () {
        closeIw(selectedIw);
    });
    return m;

}

function createInfoWindow(e, marker) {
// 인포윈도우로 장소에 대한 설명을 표시합니다
    let tags = '';
    let clickedIw;
    let iw = new daum.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px;">' + e.fields.name + '</div>'
    });
    daum.maps.event.addListener(marker, 'mouseover', function () {
        iw.open(map, marker);
    });
    daum.maps.event.addListener(marker, 'mouseout', function () {
        iw.close();
    });
    daum.maps.event.addListener(marker, 'click', function () {
        $.ajax({
          url: "/cafe/" + e.pk,
        }).done(function(data) {
            let content = '<div class="container">';
            content += '<div style="width:400px;height:300px;text-align:center;padding:6px;"><p>' + e.fields.name + '</p>';
            data.map( e => {
                content += '<span class="badge badge-info">' + e + '</span> ';
            });
            content += '</div>';

            clickedIw = new daum.maps.InfoWindow({ content: content });
            clickedIw.open(map, marker);
            closeIw(clickedIw);
        });
    });
}

function createMarker(data) {
// Create marker from JSON
    data.map(e => {
        geocoder.addressSearch(e.fields.location, function (result, status) {
            if (status === daum.maps.services.Status.OK) {
                let marker = new daum.maps.Marker({map: map, position: new daum.maps.LatLng(result[0].y, result[0].x)});
                marker.setMap(map);
                markers.push(marker);
                createInfoWindow(e, marker);
            }
        });
    });
}


map.panTo(ajou_LatLng);