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


function addComment(cid) {
    $.ajax({
        url: "/cafe/" + cid + "/comments",
        type: "post",
        data: {comment: $('#comment').first().val(), rating: $('#rating').val() }
    }).done(function (comments) {
        $('#comment-wrapper')[0].outerHTML = draw_comments_box(cid, comments)
    }).fail(function (msg){
        alert('로그인을 해주세요 ㅜㅜ');
        $('#comment').first().val("");
    });
}

function draw_comments_box(e, comment) {
    let content = '';
    content = '<div id="comment-wrapper" class="d-flex flex-column" style="text-size: 10px; padding: 10px;">' +
    '<div class="row">' +
    '<input type="text" class="form-control" id="comment" placeholder="댓글을 입력하세요!">' +
    '<select class="form-control col-2" id="rating" style="width: 30px;">' +
        '      <option>1</option>' +
        '      <option>2</option>' +
        '      <option>3</option>' +
        '      <option>4</option>' +
        '      <option>5</option>' +
        '    </select>' +
    '<button class="btn-outline-info" onclick="addComment(' + e.pk + ')">작성</button>' +
    '</div>' +
    '<div id="comment-box" style="height: 340px;">';
    comment.map(e => {
        content += '<div class="border" style="margin-top: 4px; text-align: left; padding: 4px;">' +
            '<div class="d-flex justify-content-start" style="margin-bottom: 4px; flex: 5">이름: ' + e.name
            + '<div class="d-flex justify-content-end" style="flex: 1;">별점:' + e.rating + '</div>'

            + '</div>'
            + e.content + '</div>';
    });
    content += '</div></div></div>';
    return content;
}

function createInfoWindow(e, marker) {
// 인포윈도우로 장소에 대한 설명을 표시합니다
    let clickedIw;
    let iw = new daum.maps.InfoWindow({
        content: '<div style="width:200px;text-align:center;padding:15px;">' + e.fields.name + '<br><br><span class="badge badge-danger">' + e.fields.available_seat + ' 자리남음</span></div>'
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
        }).done(function (data) {
            let content = '<div class="container">';
            content += '<div style="width:400px;float:left; height:500px;text-align:center;padding:20px;"><p>' + e.fields.name + ' <span class="badge badge-danger">' + e.fields.available_seat + ' 자리남음</span></p>';
            data.map(e => {
                content += '<a class="badge badge-info" href="/?tag='+ e+ '">' + e + '</a> ';
            });
            // content += '<div class="d-flex flex-column" style="text-size: 10px;">' +
            //         '<button class="btn-outline-info" onclick="seat_update()">입장</button>'
            //         '</div>'
            $.ajax({
                url: "/cafe/" + e.pk + "/comments",
            }).done(function (comments) {
                content = draw_comments_box(e, comments);
                clickedIw = new daum.maps.InfoWindow({content: content});
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

function seat_update() {
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