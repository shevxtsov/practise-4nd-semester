<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="col of cols" :key="col.key">{{ col.name }}</th>
                <th>Действия</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="row of rows" :key="row.code">
                <td v-for="col of cols" :key="col.key" :class="col.key === 'image' ? 'width-min' : ''">
                    <div v-if="col.key === 'image'" class="image">
                        <img :src="row[col.key] || 'https://icon-library.com/images/anonymous-icon-png/anonymous-icon-png-5.jpg'" :alt="row[col.key]" />
                    </div>

                    <span v-else-if="col.key === 'role_list'">{{ getRolesName(row[col.key]) }}</span>

                    <span v-else> {{ row[col.key] }}</span>
                </td>
                <td class="width-min">
                    <div class="table__actions">
                        <slot name="actions" :row="row"></slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    cols: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] }
})

const getRolesName = (roles) => {
    return roles.map((role) => role.name).join(', ')
}

</script>

<style scoped lang="scss">
.table {
    width: 100%;

    thead {
        tr {
            background-color: #ebebeb;
            border-radius: 6px;

            th {
                padding: 6px 12px;
                text-align: left;
            }
        }
    }

    tbody {
        margin-top: 12px;

        tr {
            margin-top: 8px;
            background-color: #fff;
            box-shadow: 1px 1px 15px #ebebeb;
            border-radius: 6px;

            td {
                padding: 10px 12px;
                text-align: left;

                .image {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }

                &.width-min {
                    width: 5%;
                }
            }

            &:first-child {
                margin-top: 0;
            }
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: 16px;

        img {
            display: block;
            width: 24px;
            height: 24px;
        }

        &:deep(.btn) {
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>
