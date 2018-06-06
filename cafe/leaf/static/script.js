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
            console.log("가져온 taf",data);
            let content = '<div class="container">';
            content += '<div style="width:400px;height:300px;text-align:center;padding:6px;"><p>' + e.fields.name + '</p>';
            data.map( e => {
                content += '<span class="badge badge-info">' + e + '</span> ';
            });
            content += '<div class="d-flex flex-column" style="text-size: 10px;">' +
                    '<button class="btn-outline-info" onclick="seat_update()">입장</button>'
                    '</div>'
            $.ajax({
                url: "/cafe/" + e.pk + "/comments",
            }).done(function (comment) {
                console.log("댓글 가져온거  : ",comment);
                content += '<div class="d-flex flex-column" style="text-size: 10px;">' +
                    '<button class="btn-outline-info" onclick="createComment()">댓글 작성하기</button>'
                    '</div>' +
                    '<div style="height: 200px; overflow-y: hidden;">'
                comment.map(e => {
                   content += '<div class="border" style="margin-top: 4px; text-align: left; padding: 4px;">' +
                       '<div class="d-flex justify-content-start" style="margin-bottom: 4px; flex: 5">사용자 이름:' + e.user_id_id
                       +'<div class="d-flex justify-content-end" style="flex: 1;">별점:'+e.rating+'</div>'

                       + '</div>'
                       + e.content + '</div>';
                });
                content += '</div>'
                content += '</div>';
                clickedIw = new daum.maps.InfoWindow({ content: content });
                clickedIw.open(map, marker);
                iw.close();
                closeIw(clickedIw);
            });
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

function createComment(){
    console.log("댓글 작성 클릭");
//    TO DO : 로그인 시 작성되도록
}

function seat_update(){
    //여석 관리
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
map.panTo(ajou_LatLng);