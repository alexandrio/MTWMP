const URL_API = 'http://localhost:8080/crud/index.php/api/';
const url  = document.URL;

 
function editar(id)
{
    window.location.href = 'edicion.html?id='+id;
}

function eliminar(id)
{
    var url = URL_API + 'usuarios/eliminar';
    $.ajax({
        type: 'delete',
        url: url +'/' + id,
        data: '',
        contentType: 'application/json; charset=utf-8',
        success: function(result){
            window.location.href = 'index.html';
        },
        error: function(result){
            alert('Ocurrio un error al llamar el servicio')
        }
    });
}

function tblUsuario(data){
    console.log(data);
    if(data.status){
        var tbl= '';
       $.each(data.result, function(i,usuario){
            tbl+='<tr>';
            tbl+='<td class="d-none d-md-table-cell">' + (i+1) +'</td>';
            tbl+='<td class="d-none d-md-table-cell">' + usuario.nombre +'</td>';
            tbl+='<td class="d-none d-md-table-cell">' + usuario.apellidos +'</td>';
            tbl+='<td class="d-table-cell d-md-none">' + usuario.nombre + ' '  + usuario.apellidos  +'</td>';
            tbl+='<td>';
            tbl+='<div clas="d-flex justify-content-center">';
            tbl+='<button class="btn btn-primary" onClick="editar('+ usuario.id +')">Editar</button>';
            tbl+='<button class="btn btn-danger ml-2" onClick="eliminar('+ usuario.id +')">Eliminar</button>';
            tbl+='</div>';
            tbl+='</td>';
            tbl+='</tr>';

       });

       $('#usuarios-table-body').html(tbl);
    }else{
        alert('la volviste a regar')
    }
}

function buscarTodos()
{
  //alert('buscar');
  var url = URL_API + 'usuarios/obtener';

  $.ajax({
          type:'get',
          url: url,
          data: '',
          contenType: 'application/json;charset=utf-8',
          traditional: true,
          success: tblUsuario,
          error: function(result){
              alert('La regaste');
          }
  });
}

$(document).ready(()=>{
  
    $('#btnBuscar').click(function(){
        buscarTodos
    });

    $('#btnNuevo').click(function(){
        window.location.href = 'edicion.html';
    });
 
    buscarTodos();
});