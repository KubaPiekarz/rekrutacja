<template>
    <div class="user-list-container">
        <div class="header">
            <h2>User list</h2>
            <button @click="addUser" class="add-user-button">+ Add User</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <User v-for="user in users" :key="user.id" :user="user" @edit-user="editUser"
                    @delete-user="deleteUserFunction" />
            </tbody>
        </table>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">&laquo;</button>
            <span v-for="page in totalPages" :key="page" @click="fetchUsers(page)"
                :class="{ active: page === currentPage }">{{ page }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">&raquo;</button>
        </div>
    </div>
    <div v-show="showPopup" class="popup">
        <UserEdit :userForEdit="userForEdit" :isNewUser="isNewUser" @closePopup="closePopup"  @updateUser="handleCreateUser"  />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getUsers } from '../api/getUsers.js';
import { deleteUser } from '../api/deleteUser.js';
import User from './User.vue';
import UserEdit from './UserEdit.vue';

const users = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const showPopup = ref(false)
const userForEdit = ref()
const isNewUser = ref(false)

const fetchUsers = async (page) => {
    try {
        const data = await getUsers(page);
        users.value = data.data;
        totalPages.value = data.total_pages;
        currentPage.value = page;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

fetchUsers(currentPage.value);

const closePopup = () =>{
    showPopup.value = false
    isNewUser.value = false
    userForEdit.value = {}
}

const handleCreateUser = (result) => {
    if(isNewUser.value) users.value.push(result)
    else{
        const index = users.value.findIndex((element) => element.id === userForEdit.value?.id);
        if (index !== -1) {
            users.value.splice(index, 1, result);
        }
    }
    closePopup()
};

const addUser = () => {
    showPopup.value = true
    isNewUser.value = true
};

const editUser = (user) => {
    showPopup.value = true
    userForEdit.value = { ...user }
};

const deleteUserFunction = async (userId) => {
    const index = users.value.findIndex((element) => element.id === userId);
    await deleteUser(userId).then((item)=>{
        users.value.splice(index, 1)
    });
};

const previousPage = () => {
    if (currentPage.value > 1) {
        fetchUsers(currentPage.value - 1);
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        fetchUsers(currentPage.value + 1);
    }
};
</script>

<style scoped>
.user-list-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.add-user-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
}

thead th {
    background-color: #f4f4f4;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.pagination span {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
}

.pagination span.active {
    background-color: #28a745;
    color: white;
}

.pagination button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
}

.pagination button:disabled {
    color: #ccc;
    cursor: not-allowed;
}

.popup {
    position: absolute;
    width: -webkit-fill-available;
    height: 100vh;
    top: 0;
    background: #F5F7F9;
}

.close {
    position: absolute;
}
</style>