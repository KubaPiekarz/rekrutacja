<template>
    <div class="user-form">
        <font-awesome-icon :icon="['fas', 'times']" @click="$emit('closePopup')" class="close" />
        <h2>Add user</h2>
        <div class="form-container">
            <div class="form-section">
                <label for="first-name">First Name</label>
                <input id="first-name" v-model="userForEdit.first_name" type="text" />

                <label for="last-name">Last Name</label>
                <input id="last-name" v-model="userForEdit.last_name" type="text" />

                <button class="update-btn" @click="emitUpdateUser">Update Details</button>
            </div>
            <div class="photo-section">
                <img :src="userForEdit.avatar || require('../../assets/default-avatar.jpg') " alt="User avatar" class="avatar" />
                <input id="avatar-url" v-model="userForEdit.avatar" type="text" placeholder="Enter image URL" class="urlInput" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'; 
import { addUser } from '../api/addUser.js'; 
import { editUser } from '../api/editUser.js'; 


const props = defineProps({
    userForEdit: {
        type: Object,
        default: () => ({
            first_name: '',
            last_name: '',
            avatar: ''
        })
    },
    isNewUser: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['updateUser', 'closePopup']);

const emitUpdateUser = async () => {
    const newUser = {
        first_name: props.userForEdit.first_name,
        last_name: props.userForEdit.last_name,
        avatar: props.userForEdit.avatar
    };

    try {
        let result
        if(props.isNewUser) result = await addUser(newUser); 
        else{
            result = await editUser(props.userForEdit.id, newUser);
        } 
        emit('updateUser', result); 
    } catch (error) {
        console.error('Error adding user:', error);
    }
};
</script>

<style scoped>
.user-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 150px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background: white;
    @media only screen and (max-width: 700px) {
        margin: auto;
    }
}

.close{
    position: absolute;
    right: 20px;
    cursor: pointer;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media only screen and (max-width: 700px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

.form-section {
    display: flex;
    flex-direction: column;
    width: 60%;
}

.form-section label {
    margin-bottom: 8px;
    font-size: 14px;
}

.form-section input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    font-size: 16px;
}

.urlInput{
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 50%;
    font-size: 16px;
    @media only screen and (max-width: 700px) {
        width: 100%;
    }
}

.update-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.photo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35%;
}

.avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #ddd;
    margin-bottom: 20px;
}

.file-input {
    margin-bottom: 10px;
}

.change-photo-btn {
    background-color: transparent;
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}
</style>
