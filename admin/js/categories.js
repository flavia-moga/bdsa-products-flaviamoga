/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/categories/", {}, function (data, status) {
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
            + '<td class="categorie">'+value.categorie+'</td>'
			+ '<td class="subcategorie">'+value.subcategorie+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id+')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id+')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#categorie').val('');
    $('#subcategorie').val('');
    
    $('#myModalLabel').html('Add New Category');
  //  $('#add_new_record_modal').modal('show');
}

function viewRecord(id) {
    var url = "/categories/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#categorie').val(data.categorie);
        $('#subcategorie').val(data.subcategorie);

        $('#id').val(id);
        $('#myModalLabel').html('Edit Category');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/categories/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id+'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/categories/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.categorie').html(formData.categorie);
            $('#row_id_'+formData.id+'>td.subcategorie').html(formData.subcategorie);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/categories/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}