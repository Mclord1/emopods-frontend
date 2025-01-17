<template>
    <div class="avatar-md">
        <span
            :class="`avatar-title bg-${iconColor} text-white rounded-circle`">
            {{ avatarText }}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        avatarText : {
            type: String,
            default: 'ME'
        },
        iconColor: {
            type: String,
            default: 'success'
        }
    }
}
</script>
<style scoped>
.avatar-md {
    width: 30px;
    height: 30px;
}

.avatar-title {
    font-size: 12px !important;
}
</style>