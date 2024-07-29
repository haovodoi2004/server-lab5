const form = document.getElementById('form-distributor');
const list = document.getElementById('list_distributor');
const nameDis = document.getElementById('name');
const idDis = document.getElementById('idDis');

var distributors = [];

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/get-list-distributor');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayDistributor(data.data);
        distributors = data.data;
    } catch (error) {
        console.error(error);
    }
};

const displayDistributor = (distributors) => {

    list.innerHTML = `
    <tr>
        <th>Tên</th>
        <th>Thao tác</th>
    </tr>
    ${distributors.map(distributor => `
        <tr>
            <td>${distributor.name}</td>
            <td>
            <button  class="edit-btn" data-id="${distributor._id}">Edit</button>
            <button class="delete-btn" data-id="${distributor._id}">Delete</button>
            </td>
        </tr>
    `).join('')}
    `;
};

const addDistributor = async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const newName = nameInput.value.trim();
    if (newName === '') {
        // Xử lý khi tên rỗng
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/add-distributor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        });
        if (!response.ok) {
            throw new Error('Failed to add distributor');
        }
        const data = await response.json();
        fetchData();
        nameInput.value = '';
        alert('Thên thành công')
    } catch (error) {
        console.error(error);
        // Xử lý lỗi ở đây, có thể hiển thị thông báo lỗi cho người dùng
    }
};

form.addEventListener('submit', event => {
    if (idDis.value == '') {
        addDistributor(event);
    } else {
        updateDistributor(event);
    }
});

const updateDistributor = async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const newName = nameInput.value.trim();
    if (newName === '') {
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/update-distributor-by-id/' + idDis.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        });
        if (!response.ok) {
            throw new Error('Failed to add distributor');
        }
        const data = await response.json();
        fetchData();
        idDis.value = '';
        nameDis.value = ''
        alert('Sửa thành công')
    } catch (error) {
        console.error(error);
        // Xử lý lỗi ở đây, có thể hiển thị thông báo lỗi cho người dùng
    }

}

const deleteDistributor = (event) => {
    const id = event.target.dataset.id
    let result = confirm('Bạn có muốn xóa hay không ?');
    if (result) {
        fetch('http://localhost:3000/api/destroy-distributor-by-id/' + id, {
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


const editDistributor = (event) => {
    const id = event.target.dataset.id;

    const temp = distributors.find(diss => diss._id == id);
    console.log(temp);
    nameDis.value = temp.name;
    idDis.value = temp._id

}

list.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
        deleteDistributor(event)
    }
    if (event.target.classList.contains('edit-btn')) {
        editDistributor(event)
    }
})



fetchData();
