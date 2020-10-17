/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/products/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id+'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="id_categ">'+ (value.category ? value.category.categorie : value.id_categ) +'</td>'
            + '<td class="nume">'+value.nume+'</td>'
			+ '<td class="pret_achiz">'+value.pret_achiz+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#id_categ').val('');
    $('#nume').val('');
    $('#description').val('');
    
    $('#myModalLabel').html('Add New Product');
}

function viewRecord(id) {
    var url = "/products/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#id_categ').val(data.id_categ);
        $('#nume').val(data.nume);
        $('#pret_achiz').val(data.pret_achiz);
        $('#adaos_com').val(data.adaos_com);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/products/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/products/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.category_id').html(formData.id_categ);
            $('#row_id_'+formData.id+'>td.name').html(formData.nume);
            $('#row_id_'+formData.id+'>td.description').html(formData.pret_achiz);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/products/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}