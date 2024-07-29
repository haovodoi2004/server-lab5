const from = document.getElementById('form-fruit');
const list = document.getElementById('list-fruit');
const nameFruit = document.getElementById('name')
const quantityFruit = document.getElementById('quantity')
const priceFruit = document.getElementById('price')
const statusFruit = document.getElementById('status')
const imageFruit = document.getElementById('image')
const descriptionFruit = document.getElementById('description')
const id_distributor = document.getElementById('id_distributor')
const idFruit = document.getElementById('idFruit');

var fruits = [];
const fetchData = () => {
    fetch('http://localhost:3000/api/get-all-fruit')
        .then(res => res.json())
        .then(data => {
            fruits = data.data;
            displayFruit();
        })
        .catch(err => console.log(err))
}

const displayFruit = () => {
    list.innerHTML = `
        <tr>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Trạng thái</th>
            <th>mô tả</th>
            <th>id_distributor</th>
            <th>Thao tác</th>
        </tr>
        ${fruits.map(fruit =>
        `
            <tr>
                <td>${fruit.name}</td>
                <td>${fruit.quantity}</td>
                <td>${fruit.price}</td>
                <td class="fruit-image">
                    ${fruit.image.map(image => `<img src="${image}" alt="Ảnh của ${fruit.name}">`).join('')}
                </td>
                <td>${fruit.status}</td>
                <td>${fruit.description}</td>
                <td>${fruit.id_distributor}</td>
                <td>
                    <button class="edit-btn" data-id="${fruit._id}">Edit</button>
                    <button class="delete-btn" data-id="${fruit._id}">Delete</button>
                </td>
            </tr>
            `
    ).join('')}
    `;
}


fetchData();


const addFruit = async (event) => {
    event.preventDefault();

    let name = nameFruit.value;
    let price = priceFruit.value;
    let quantity = quantityFruit.value;
    let status = statusFruit.value;
    let description = descriptionFruit.value;
    let idDis = id_distributor.value;

    try {
        if (name == '' || price == '' || quantity == '' || status == '' || description == '' || idDis == '') {
            alert('Vui lòng điền đủ các trường')

        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('quantity', Number(quantity));
            formData.append('price', Number(price));
            formData.append('status', status);
            formData.append('description', description);
            formData.append('id_distributor', idDis);
            for (let i = 0; i < imageFruit.files.length; i++) {
                formData.append('image', imageFruit.files[i]);
            }



            const response = await fetch('http://localhost:3000/api/add-fruit-with-file-image', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 200) {
                alert('Thêm mới thành công');
                fetchData();
                idFruit.value = '';
                from.reset();
            } else {
                alert('Thêm mới thất bại error:' + res.status);
            }
        }


    }
    catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }

}

const deleteFruit = (event) => {
    const id = event.target.dataset.id;
    console.log(id);
    let result = confirm('Bạn có muốn xóa hay không ?');
    if (result) {
        fetch('http://localhost:3000/api/destroy-fruit-by-id/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            if (res.status == 200) {
                alert('Xóa thành công');
                fetchData();
            } else {
                alert('Lỗi!!' + res.status)
            }
        })
    } else {

    }

}
const editFruit = (event) => {
    const id = event.target.dataset.id;
    const temp = fruits.find(diss => diss._id == id);
    nameFruit.value = temp.name;
    quantityFruit.value = temp.quantity;
    priceFruit.value = temp.price;
    statusFruit.value = temp.status;
    descriptionFruit.value = temp.description;
    id_distributor.value = temp.id_distributor;
    idFruit.value = id;

    // Tạo một đối tượng DataTransfer để thêm các tệp vào
    const dataTransfer = new DataTransfer();

    // Thêm các tệp vào đối tượng DataTransfer
    temp.image.forEach(image => {
        const file = new File([image], image.split('/').pop());
        dataTransfer.items.add(file);
    });

    // Tạo một đối tượng FileList từ đối tượng DataTransfer
    const fileList = dataTransfer.files;

    // Gán giá trị của đối tượng FileList vào trường files của input
    imageFruit.files = fileList;
}

const updateFruit = async (event) => {
    event.preventDefault();
    console.log(idFruit.value);
    let name = nameFruit.value;
    let price = priceFruit.value;
    let quantity = quantityFruit.value;
    let status = statusFruit.value;
    let description = descriptionFruit.value;
    let idDis = id_distributor.value;

    try {
        if (name == '' || price == '' || quantity == '' || status == '' || description == '' || idDis == '') {
            alert('Vui lòng điền đủ các trường')

        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('quantity', Number(quantity));
            formData.append('price', Number(price));
            formData.append('status', status);
            formData.append('description', description);
            formData.append('id_distributor', idDis);
            for (let i = 0; i < imageFruit.files.length; i++) {
                formData.append('image', imageFruit.files[i]);
            }



            const response = await fetch('http://localhost:3000/api/update-fruit-by-id/' + idFruit.value, {
                method: 'PUT',
                body: formData
            });

            const result = await response.json();

            if (result.status === 200) {
                alert('sửa  thành công');
                idFruit.value = '';
                from.reset();
                fetchData();
            } else {
                alert('Sửa thất bại error:' + res.status);
                idFruit.value = '';
                from.reset();
            }
        }


    }
    catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi');
    }

}


from.addEventListener('submit', event => {
    if (idFruit.value == '') {
        addFruit(event);

    } else {
        updateFruit(event);
    }
})

list.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
        deleteFruit(event)
    }
    if (event.target.classList.contains('edit-btn')) {
        editFruit(event)
    }
})