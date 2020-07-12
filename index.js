// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCFoD86GsiKoxLHkNiC9gczdf4sso9ggUg",
    authDomain: "crud-firebase-512ef.firebaseapp.com",
    databaseURL: "https://crud-firebase-512ef.firebaseio.com",
    projectId: "crud-firebase-512ef",
    storageBucket: "crud-firebase-512ef.appspot.com",
    messagingSenderId: "343487543477",
    appId: "1:343487543477:web:51e9a687442c69a228a6fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var d = new Date();
var t = d.getTime();
var counter = t;

/*================Membuat Referensi Database =================*/
//Membuat ID untuk parameter data
console.log(counter);
counter += 1;
console.log(counter);
var id = counter;

// referensi ke database
var db = firebase.database();

//referensi untuk tambah data 
var adddataRef = db.ref("biodata/" + id);

//referensi untuk tampilkan data
var viewRef = db.ref("biodata");

/*================Menambah Data Ke Database=================*/
document.getElementById("form").addEventListener("submit", e => {
    var nama_value = document.getElementById("nama").value;
    var alamat_value = document.getElementById("alamat").value;
    var hobi_value = document.getElementById("hobi").value;
    e.preventDefault();
    createValue(nama_value, alamat_value, hobi_value);
    form.reset();
});

//memasukkan data surat ke database firebase sambil membuat field dan childnya//
function createValue(nama_value, alamat_value, hobi_value) {

    /*================submit data ke database =================*/
    adddataRef.set({
        id: id,
        nama: nama_value,
        alamat: alamat_value,
        hobi: hobi_value
    });

    //reload setelah submit data
    window.location.reload();
}

/*================Menampilkan data dari Database=================*/
//menampilkan data  
viewRef.on("value", dataBerhasil, dataGagal);
//membuat variabel untuk passing data ke table surat
var view_result = document.getElementById("cardSection");

function dataBerhasil(data) {
    //membuat variabel kosong sebagai tempat menyimpan hasil loopingan data
    var view_data = "";
    data.forEach(function (print) {
        view_data +=
            '<div class="card mb-3">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + print.val().nama + '</h5>' +
            '<p class="card-text">' + print.val().alamat + '</p>' +
            '<p class="card-text">' + print.val().hobi + '</p>' +
            '<button class="btn btn-sm btn-warning" onclick="updateValue(\'' + print.val().id + '\')">Edit</button> <button class="btn btn-sm btn-danger" onclick="deleteValue(\'' + print.val().id + "')\">Hapus</button></<button>" +
            "</div>" +
            "</div>";
    });
    //passing data dari variable view_data ke view_result
    view_result.innerHTML = view_data;
}
function dataGagal(err) {
    console.log(err);
}

function reset() {
    document.getElementById("firstSection").innerHTML = `
    <form class="border p-4 mb-4" id="form">
        <div class="form-group">
          <label>Nama</label>
          <input type="text" class="form-control" id="nama" placeholder="Masukkan Nama">
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <input type="text" class="form-control" id="alamat" placeholder="Masukkan Alamat">
        </div>
        <div class="form-group">
          <label>Hobi</label>
          <input type="text" class="form-control" id="hobi" placeholder="Masukkan Hobi">
        </div>

        <button type="submit" id="submit" class="btn btn-primary">Submit</button>
        <button style="display: none" id="update" class="btn btn-success">Update</button>
        <button style="display: none" id="cancel" class="btn btn-success">Cancel</button>
      </form>
    `;
    /*================Menambah Data Ke Database=================*/
    document.getElementById("form").addEventListener("submit", e => {
        var nama_value = document.getElementById("nama").value;
        var alamat_value = document.getElementById("alamat").value;
        var hobi_value = document.getElementById("hobi").value;
        e.preventDefault();
        createValue(nama_value, alamat_value, hobi_value);
        form.reset();
    });
}

/*================ MENGEDIT DATA =================*/
//menangkap parameter id yang dikirim ketika menekan tombol action edit
function updateValue(id) {
    document.getElementById('firstSection').innerHTML = `
    <form class="border p-4 mb-4" id="form2">
        <div class="form-group">
          <label>Nama</label>
          <input type="text" class="form-control" id="nama-edit" placeholder="Masukkan Nama">
        </div>
        <div class="form-group">
          <label>Alamat</label>
          <input type="text" class="form-control" id="alamat-edit" placeholder="Masukkan Alamat">
        </div>
        <div class="form-group">
          <label>Hobi</label>
          <input type="text" class="form-control" id="hobi-edit" placeholder="Masukkan Hobi">
        </div>

        <button style="display: none" id="submit" class="btn btn-primary">Submit</button>
        <button style="display: inline-block" id="update" class="btn btn-success">Update</button>
        <button style="display: inline-block" id="cancel" class="btn btn-danger">Cancel</button>
      </form>
    `;

    var query = db.ref('biodata/' + id);

    // suatu perintah untuk mengambil data spesifik dari database berdasarkan id
    query.once('value').then(isiData);

    //function untuk passing data ke form edit data surat
    function isiData(dataEdit) {
        var data = dataEdit.val();
        document.getElementById('nama-edit').value = data.nama;
        document.getElementById('alamat-edit').value = data.alamat;
        document.getElementById('hobi-edit').value = data.hobi;
    }

    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("cancel").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("update").addEventListener("click", (e) => {
        updateValue2(id, document.getElementById("nama-edit").value, document.getElementById("alamat-edit").value, document.getElementById("hobi-edit").value);
    });

    document.getElementById("nama-edit").value = nama_value;
    document.getElementById("alamat-edit").value = alamat_value;
    document.getElementById("hobi-edit").value = hobi_value;

}

function updateValue2(id, nama_value, alamat_value, hobi_value) {
    var valueUpdated = {
        id: id,
        nama: nama_value,
        alamat: alamat_value,
        hobi: hobi_value
    }

    //update data ke database
    viewRef.child(id).update(valueUpdated);
    reset();
}

function deleteValue(id) {
    var check_delete = confirm('Apakah anda ingin menghapus data ?');
    if (check_delete) {
        viewRef.child(id).remove();
    }
}

