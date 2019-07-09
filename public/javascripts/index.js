$(document).ready(function () {
    var canAdd = true;
    $("#btn-add").on('click', function () {
        if (canAdd) {
            canAdd = false;
            var row = $(`
            <tr>
                <td><input type="text" id="tour-id" placeholder="Mã tour"></input></td>
                <td><input type="text" id="from" placeholder="Nơi đi"></input></td>
                <td><input type="text" id="to" placeholder="Nơi đến"></input></td>
                <td><input type="text" id="date-start" placeholder="Ngày khởi hành"></input></td>
                <td><input type="text" id="total-day" placeholder="Tổng thời gian(Ngày)"></input></td>
                <td><input type="text" id="quatity" placeholder="Số người"></input></td>
                <td><input type="text" id="price" placeholder="Tổng số tiền(VNĐ)"></input></td>
                <td><button class="button-small" id="btn-submit">Thêm</button></td>
            </tr>
        `);
            $("#tour").append(row);
            // Add event listener
            addEventAddTour();
        }
    })
    $(".btn-delete").on('click',function(){
        var id = this.getAttribute('tourId');
        // Use Ajax to delete
        $.ajax({
            url: "/delete-tour",
            method: "post",
            dataType: "json",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({
                "TourID": id
            }),
            success: function (result) {
                alert('Xóa thành công')
                // Refresh page
                location.reload();
            }
        })
    })
    $(".btn-edit").on('click',function(){
        var id = this.getAttribute('tourId');
        $(`#${id}`).modal();
    })
	window.addEventListener('message', function (e) {
		console.log(wizViewMessenger);
    });
	
});

function addEventAddTour() {
    $('#btn-submit').on('click', function (e) {
        // Check empty input
        if (isEmptyInput()) {
            alert("Vui lòng điền đầy đủ thông tin");
        }
        else {
            var dataInput = getDataInput();
            // Use Ajax to post data
            $.ajax({
                url: "/add-tour",
                method: "post",
                dataType: "json",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(dataInput),
                success: function (result) {
                    if(result.status === "Success") alert('Thêm thành công');
                    else alert("Thêm thất bại");
                    // Refresh page
                    location.reload();
                }
            })
        }
    });
}

function isEmptyInput() {
    if ($("#tour-id").val().trim() === "") return true;
    if ($("#from").val().trim() === "") return true;
    if ($("#to").val().trim() === "") return true;
    if ($("#date-start").val().trim() === "") return true;
    if ($("#quatity").val().trim() === "") return true;
    if ($("#price").val().trim() === "") return true;
    if ($("#total-day").val().trim() === "") return true;
    return false;
}

function getDataInput() {
    var data = {
        "TourID": $("#tour-id").val(),
        "From": $("#from").val(),
        "To": $("#to").val(),
        "DateStart": $("#date-start").val(),
        "Quantity": $("#quatity").val(),
        "Total": $("#price").val(),
        "Time": $("#total-day").val()
    }
    return data;
}