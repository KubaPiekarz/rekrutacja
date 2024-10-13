<template>
    <tr>
        <td class="user-info">
            <img :src="user.avatar || require('../../assets/default-avatar.jpg')" alt="" class="avatar">
            <p>{{ user.first_name }} {{ user.last_name }}</p>
        </td>
        <td class="actions">
            <font-awesome-icon :icon="['far', 'pen-to-square']" class="edit-icon"
                @click="$emit('edit-user', props.user);" />
            <font-awesome-icon :icon="['fas', 'trash']" class="delete-icon"
                @click="$emit('delete-user', props.user.id);" />
        </td>
    </tr>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user: Object
});

</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    gap: 50px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.actions svg {
    padding: 0 5px;
    cursor: pointer;
}
</style>