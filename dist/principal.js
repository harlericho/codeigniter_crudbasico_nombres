$(document).ready(function () {
    list();
    toastr.info("Sistema: Bienvenido a este crud basico");
    $("#exampleModal").modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

$("#btnGuardar").click(function (e) {
    if (validacions() === true) {
        const id = document.getElementById("id");
        const data = $("#principal").serialize();
        if (id.value === "") {
            save(data);
        } else {
            update(data);
        }

    }
    e.preventDefault();

});


function save(data) {
    $.ajax({
        type: "POST",
        url: "principal/save",
        data: data,
        dataType: "JSON",
        success: function (response) {
            if (response.respuest === "danger") {
                toastr.error("Sistema: Nombres ya existe");
                document.getElementById("nombres").focus();
            } else if (response.respuest === "success") {
                $("#exampleModal").modal("hide");
                $("#principal")[0].reset();
                toastr.success("Sistema: Datos guardado");
                list();
            }
        }
    });
}
function update(data) {
    $.ajax({
        type: "POST",
        url: "principal/update",
        data: data,
        dataType: "JSON",
        success: function (response) {
            if (response.respuest === "danger") {
                toastr.error("Sistema: Nombres ya existe");
                document.getElementById("nombres").focus();
            } else if (response.respuest === "success") {
                $("#exampleModal").modal("hide");
                $("#principal")[0].reset();
                toastr.success("Sistema: Datos modificados");
                list();
            }
        }
    });
}


function list() {
    $.ajax({
        type: "GET",
        url: "principal/list",
        dataType: "JSON",
        success: function (data) {
            html = "<table class='table table-striped' id='tablafiltro' style='width:100%' ><thead>";
            html += "<tr><th scope='col'>Nombre(s):</th><th scope='col'>Estado(s):</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombres'] + "</td>";
                if (data[key]['estado'] == 'A') {
                    html += "<td><span class='badge rounded-pill bg-success'>Activo</span></td>";
                } else {
                    html += "<td><span class='badge rounded-pill bg-danger'>Inactivo</span></td>";
                }
                html += `<td>
                <a href="#" id="del" value="${data[key]['id']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fas fa-trash-restore"></i>
                </a>
                <a href="#" id="edit" value="${data[key]['id']}" class="btn btn-sm btn-success" title="Editar">
                <i class="fas fa-pencil-alt"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#tabla-nombres").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}


$(document).on("click", "#del", function (e) {
    let idEliminar = $(this).attr("value");
    Swal.fire({
        title: 'Seguro desea eliminar?',
        text: "Solo se cambiara el estado del registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "principal/delete",
                dataType: "JSON",
                data: { idEliminar: idEliminar },
                success: function (response) {
                    if (response.respuest === "danger") {
                        toastr.warning("Sistema: Registro ya tiene el estado Inactivo");
                    } else if (response.respuest === "success") {
                        list();
                        Swal.fire(
                            'Eliminado!',
                            'Su registro cambio de estado',
                            'success'
                        )
                    }
                }
            });

        }
    })
    e.preventDefault();
});


$(document).on("click", "#edit", function (e) {
    let idEditar = $(this).attr("value");
    $.ajax({
        type: "POST",
        url: "principal/get",
        dataType: "JSON",
        data: { idEditar: idEditar },
        success: function (response) {
            if (response.respuest == 'success') {
                $("#exampleModal").modal("show");
                $("#id").val(response.data.id);
                $("#nombres").val(response.data.nombres);
            }
        },
    });
    e.preventDefault();
});


function validacions() {
    const nombres = document.getElementById("nombres");
    if (nombres.value === "") {
        toastr.warning("Sistema: Llene el campo vacio");
        document.getElementById("nombres").focus();
        return false;
    } else {
        return true;
    }
}

function clean() {
    document.getElementById("id").value = '';
    document.getElementById("nombres").value = '';
}

$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        document.getElementById("nombres").focus();
    })
});