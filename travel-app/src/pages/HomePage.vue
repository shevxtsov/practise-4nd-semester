<template>
    <div class="page">
        <div class="container">
            <div class="page-header">
                <MButton color="primary" @click="handleAdd">Добавить путешествие</MButton>
            </div>

            <div v-if="travels" class="travel-list">
                <TravelCard v-for="travel of travels" :key="travel.id" :travel="travel" />
            </div>

            <div v-if="travels.length === 0" class="empty">Нет записей</div>

            <MModal v-model="modalState.add">
                <div class="modal-content">
                    <MInput v-model="form.title" placeholder="Название" />
                    <MInput v-model="form.text" placeholder="Описание" />
                    <MInput v-model="form.price" type="number" placeholder="Цена" />

                    <MMultiSelect
                        v-model="form.heritages"
                        :items="heritages"
                        placeholder="Места культурного наследия"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить</p>
                        <MButton color="success" size="small" @click="handleAddHeritage">+</MButton>
                    </div>

                    <MMultiSelect
                        v-model="form.places"
                        :items="places"
                        placeholder="Места для посещения"
                    />
                    <div class="modal-content__wrapper">
                        <p>Добавить</p>
                        <MButton color="success" size="small" @click="handleAddPlace">+</MButton>
                    </div>

                    <MButton color="primary" @click="submitAdd"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.addHeritage">
                <div class="modal-content">
                    <MInput v-model="formHeritage.name" placeholder="Название" />
                    <MInput v-model="formHeritage.image" placeholder="URL изображения" />
                    <MInput v-model="formHeritage.link" placeholder="Ссылка" />

                    <MButton color="primary" @click="submitAddHeritage"> Сохранить </MButton>
                </div>
            </MModal>

            <MModal v-model="modalState.addPlace">
                <div class="modal-content">
                    <MInput v-model="formPlace.name" placeholder="Название" />
                    <MInput v-model="formPlace.text" placeholder="Краткое описание" />
                    <MInput v-model="formPlace.image" placeholder="URL изображения" />

                    <MButton color="primary" @click="submitAddPlace"> Сохранить </MButton>
                </div>
            </MModal>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import MButton from '@/components/ui/MButton.vue'
import TravelCard from '@/components/travels/TravelCard.vue'
import MInput from '@/components/ui/MInput.vue'
import MModal from '@/components/ui/MModal.vue'
import MMultiSelect from '@/components/ui/MMultiSelect.vue'
import { useTravelsStore } from '../stores/travels'

const travelsStore = useTravelsStore()
const { travels } = storeToRefs(travelsStore)
const heritages = ref([])
const places = ref([])

const modalState = reactive({
    add: false,
    addHeritage: false,
    addPlace: false
})

const form = reactive({
    title: '',
    text: '',
    price: '',
    heritages: [],
    places: []
})

const formHeritage = reactive({
    name: '',
    image: '',
    link: ''
})

const formPlace = reactive({
    name: '',
    text: '',
    image: ''
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const submitAdd = () => {
    travelsStore.addTravel(form)
    toggleModal('add')
}

const handleAdd = () => {
    form.title = ''
    form.text = ''
    form.price = ''

    toggleModal('add')
}

const handleAddHeritage = () => {
    formHeritage.name = ''
    formHeritage.image = ''
    formHeritage.link = ''

    toggleModal('addHeritage')
}

const handleAddPlace = () => {
    formPlace.name = ''
    formPlace.text = ''
    formPlace.image = ''

    toggleModal('addPlace')
}

const submitAddHeritage = () => {
    const newHeritage = {
        id: form.heritages.length + 1,
        name: formHeritage.name,
        image: formHeritage.image,
        link: formHeritage.link
    }

    form.heritages = [...form.heritages, newHeritage]
    heritages.value = [...heritages.value, newHeritage]

    toggleModal('addHeritage')
}

const submitAddPlace = () => {
    const newPlace = {
        id: form.places.length + 1,
        name: formPlace.name,
        text: formPlace.text,
        image: formPlace.image
    }

    form.places = [...form.places, newPlace]
    places.value = [...places.value, newPlace]

    toggleModal('addPlace')
}
</script>

<style scoped lang="scss">
.page {
    background-color: $gray-light;
    min-height: 90vh;
}

.travel-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 20px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
}

.modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
